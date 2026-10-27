/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CardItem, DeviceInfo, DifficultyLevel, GameState, GameStats, LeaderboardEntry, PlayerInfo } from './types';
import { DEVICE_LIST } from './data/devices';
import { DIFFICULTY_CONFIGS } from './data/difficulty';
import { SoundFX } from './utils/sound';
import { LeaderboardStorage, StatsStorage } from './utils/storage';
import { Header } from './components/Header';
import { ScoreBoard } from './components/ScoreBoard';
import { Card } from './components/Card';
import {
  StartModal,
  PauseModal,
  VictoryModal,
  GameOverModal,
  LeaderboardModal,
  HelpModal,
  DeviceCatalogModal,
} from './components/Modals';
import { KnowledgeModal } from './components/KnowledgeModal';
import { StudyModal } from './components/StudyModal';

const MISMATCH_HOLD_DURATION_MS = 700;
const POINTS_PER_MATCH = 100;
const PENALTY_PER_MISMATCH = 10;
const BONUS_PER_SECOND_LEFT = 5;

// Utility to create a shuffled deck based on selected difficulty (P04 Requirement 1)
function createShuffledDeck(difficulty: DifficultyLevel): CardItem[] {
  const deck: CardItem[] = [];

  let selectedDevices = [...DEVICE_LIST];

  if (difficulty === 'EASY') {
    // Select 6 random distinct devices out of 10
    for (let i = selectedDevices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [selectedDevices[i], selectedDevices[j]] = [selectedDevices[j], selectedDevices[i]];
    }
    selectedDevices = selectedDevices.slice(0, 6);
  }

  // Generate exactly 2 cards for each selected device
  selectedDevices.forEach((device) => {
    deck.push({
      id: `${device.key}-card-A`,
      pairId: device.key,
      device,
      isFlipped: false,
      isMatched: false,
      isWrong: false,
    });
    deck.push({
      id: `${device.key}-card-B`,
      pairId: device.key,
      device,
      isFlipped: false,
      isMatched: false,
      isWrong: false,
    });
  });

  // Fisher-Yates shuffle the deck
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>('READY');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('STANDARD');
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('lat_the_tin_hoc_player_v1');
        if (saved) return JSON.parse(saved);
      }
    } catch {}
    return { name: '', className: '' };
  });

  const [cards, setCards] = useState<CardItem[]>(() => createShuffledDeck('STANDARD'));
  const [flippedCards, setFlippedCards] = useState<CardItem[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [matchedPairsCount, setMatchedPairsCount] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  const [score, setScore] = useState(0);
  const [timeBonus, setTimeBonus] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DIFFICULTY_CONFIGS.STANDARD.timeSeconds);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [classroomMode, setClassroomMode] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem('lat_the_tin_hoc_presentation_mode') === 'true';
      }
    } catch {}
    return false;
  });
  const [stats, setStats] = useState<GameStats>(() => StatsStorage.getStats());
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>(() =>
    LeaderboardStorage.getEntries()
  );

  // Toggle Classroom Presentation Mode (P08 Requirement 6)
  const handleToggleClassroomMode = useCallback(() => {
    setClassroomMode((prev) => {
      const next = !prev;
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem('lat_the_tin_hoc_presentation_mode', String(next));
        }
      } catch {}
      return next;
    });
  }, []);

  // P06: Educational Knowledge & Study Mode States
  const [activeKnowledgeDevice, setActiveKnowledgeDevice] = useState<DeviceInfo | null>(null);
  const [isStudyOpen, setIsStudyOpen] = useState(false);
  const shownKnowledgeKeysRef = useRef<Set<string>>(new Set());
  const pendingWinAfterKnowledgeRef = useRef<boolean>(false);

  // Modals state
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isDevicesOpen, setIsDevicesOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  // References for timers, timeouts and pause tracking
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mismatchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const matchSuccessTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track if this game's final result was recorded to prevent duplicate records
  const hasRecordedEntryRef = useRef<boolean>(false);
  const isClickProcessingRef = useRef<boolean>(false);

  // Check if any overlay/modal is open
  const isAnyModalOpen =
    activeKnowledgeDevice !== null ||
    isStudyOpen ||
    isLeaderboardOpen ||
    isHelpOpen ||
    isDevicesOpen;

  // Tracking remaining mismatch delay across Pause/Resume
  const mismatchStartTimeRef = useRef<number | null>(null);
  const mismatchRemainingMsRef = useRef<number | null>(null);
  const pendingMismatchCardsRef = useRef<[CardItem, CardItem] | null>(null);

  const currentDiffConfig = DIFFICULTY_CONFIGS[difficulty];
  const totalPairs = currentDiffConfig.pairCount;

  // Persist player info whenever it changes
  const handleUpdatePlayerInfo = (newInfo: PlayerInfo) => {
    setPlayerInfo(newInfo);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('lat_the_tin_hoc_player_v1', JSON.stringify(newInfo));
      }
    } catch {}
  };

  // Clean all running timeouts
  const clearAllTimeouts = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (mismatchTimeoutRef.current) {
      clearTimeout(mismatchTimeoutRef.current);
      mismatchTimeoutRef.current = null;
    }
    if (matchSuccessTimeoutRef.current) {
      clearTimeout(matchSuccessTimeoutRef.current);
      matchSuccessTimeoutRef.current = null;
    }
    isClickProcessingRef.current = false;
    mismatchStartTimeRef.current = null;
    mismatchRemainingMsRef.current = null;
    pendingMismatchCardsRef.current = null;
  }, []);

  // Flip back mismatched cards logic
  const executeFlipBackMismatched = useCallback(
    (firstCard: CardItem, secondCard: CardItem) => {
      setCards((prevCards) =>
        prevCards.map((c) =>
          c.id === firstCard.id || c.id === secondCard.id
            ? { ...c, isFlipped: false, isWrong: false }
            : c
        )
      );
      setFlippedCards([]);
      setIsLocked(false);
      isClickProcessingRef.current = false;
      mismatchStartTimeRef.current = null;
      mismatchRemainingMsRef.current = null;
      pendingMismatchCardsRef.current = null;
      mismatchTimeoutRef.current = null;
    },
    []
  );

  // Start a fresh game with selected difficulty (P04 & P05 & P06)
  const handleStartGame = useCallback(
    (chosenDifficulty?: DifficultyLevel) => {
      clearAllTimeouts();
      const targetDiff = chosenDifficulty || difficulty;
      const targetConfig = DIFFICULTY_CONFIGS[targetDiff];

      hasRecordedEntryRef.current = false;
      pendingWinAfterKnowledgeRef.current = false;
      shownKnowledgeKeysRef.current = new Set();
      setActiveKnowledgeDevice(null);
      isClickProcessingRef.current = false;

      setDifficulty(targetDiff);
      const newDeck = createShuffledDeck(targetDiff);
      setCards(newDeck);
      setFlippedCards([]);
      setIsLocked(false);
      setMatchedPairsCount(0);
      setMoveCount(0);
      setScore(0);
      setTimeBonus(0);
      setTimeLeft(targetConfig.timeSeconds);
      setGameState('PLAYING');
    },
    [clearAllTimeouts, difficulty]
  );

  // Restart handler
  const handleRestart = () => {
    handleStartGame(difficulty);
  };

  // Back to Main Screen / READY state
  const handleGoHome = useCallback(() => {
    clearAllTimeouts();
    setActiveKnowledgeDevice(null);
    pendingWinAfterKnowledgeRef.current = false;
    setFlippedCards([]);
    setIsLocked(false);
    isClickProcessingRef.current = false;
    setGameState('READY');
  }, [clearAllTimeouts]);

  // Pause toggle
  const handleTogglePause = useCallback(() => {
    if (gameState === 'PLAYING') {
      // Transition to PAUSED
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // If a mismatch countdown was active, freeze its remaining time
      if (mismatchTimeoutRef.current && mismatchStartTimeRef.current) {
        clearTimeout(mismatchTimeoutRef.current);
        mismatchTimeoutRef.current = null;
        const elapsed = Date.now() - mismatchStartTimeRef.current;
        const remaining = Math.max(100, MISMATCH_HOLD_DURATION_MS - elapsed);
        mismatchRemainingMsRef.current = remaining;
      }

      setGameState('PAUSED');
    } else if (gameState === 'PAUSED') {
      // Transition to PLAYING
      setGameState('PLAYING');

      // Resume pending mismatch flip if present
      if (
        mismatchRemainingMsRef.current !== null &&
        pendingMismatchCardsRef.current
      ) {
        const [c1, c2] = pendingMismatchCardsRef.current;
        const remainingMs = mismatchRemainingMsRef.current;
        mismatchStartTimeRef.current = Date.now();
        mismatchTimeoutRef.current = setTimeout(() => {
          executeFlipBackMismatched(c1, c2);
        }, remainingMs);
      }
    }
  }, [gameState, executeFlipBackMismatched]);

  // Sound toggle
  const handleToggleSound = () => {
    const newSoundState = SoundFX.toggleMute();
    setSoundEnabled(newSoundState);
  };

  // P07: Escape key global handler for modals and pause
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeKnowledgeDevice !== null) {
          handleCloseKnowledgeModal();
        } else if (isStudyOpen) {
          setIsStudyOpen(false);
        } else if (isLeaderboardOpen) {
          setIsLeaderboardOpen(false);
        } else if (isHelpOpen) {
          setIsHelpOpen(false);
        } else if (isDevicesOpen) {
          setIsDevicesOpen(false);
        } else if (gameState === 'PLAYING' || gameState === 'PAUSED') {
          handleTogglePause();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [
    activeKnowledgeDevice,
    isStudyOpen,
    isLeaderboardOpen,
    isHelpOpen,
    isDevicesOpen,
    gameState,
    handleTogglePause,
  ]);
  // Main countdown game loop
  // P06 & P07: When ANY modal is open (activeKnowledgeDevice, isStudyOpen, isLeaderboardOpen, isHelpOpen, isDevicesOpen), the timer is paused!
  useEffect(() => {
    const isTimerActive = gameState === 'PLAYING' && !isAnyModalOpen;

    if (isTimerActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Out of time -> LOST
            clearAllTimeouts();
            setActiveKnowledgeDevice(null);
            setIsLocked(false);
            isClickProcessingRef.current = false;
            setGameState('LOST');
            SoundFX.playGameOver();

            // Record game result once
            if (!hasRecordedEntryRef.current) {
              hasRecordedEntryRef.current = true;
              const playerName = playerInfo.name.trim() || 'Người chơi';
              const playerClass = playerInfo.className?.trim() || undefined;

              setScore((finalScore) => {
                setMoveCount((currMoves) => {
                  setMatchedPairsCount((currPairs) => {
                    // Record in leaderboard
                    LeaderboardStorage.saveEntry({
                      playerName,
                      playerClass,
                      difficulty,
                      score: finalScore,
                      matchedPairs: currPairs,
                      totalPairs: currentDiffConfig.pairCount,
                      movesCount: currMoves,
                      timeUsedSeconds: currentDiffConfig.timeSeconds,
                      timeLeftSeconds: 0,
                      isWin: false,
                    });
                    setLeaderboardEntries(LeaderboardStorage.getEntries());

                    // Record stats
                    const updatedStats = StatsStorage.recordGame(
                      difficulty,
                      false,
                      currentDiffConfig.timeSeconds,
                      currMoves,
                      finalScore
                    );
                    setStats(updatedStats);

                    return currPairs;
                  });
                  return currMoves;
                });
                return finalScore;
              });
            }

            return 0;
          }

          if (prev <= 11) {
            // Ticking sound for the last 10 seconds
            SoundFX.playTick();
          }

          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameState, isAnyModalOpen, clearAllTimeouts, difficulty, currentDiffConfig.timeSeconds, currentDiffConfig.pairCount, playerInfo]);

  // Card click handler with real-time scoring and Knowledge Modal activation
  const handleCardClick = (clickedCard: CardItem) => {
    if (gameState !== 'PLAYING') return;
    if (isLocked || isAnyModalOpen || isClickProcessingRef.current) return;
    if (clickedCard.isMatched || clickedCard.isMatching || clickedCard.isFlipped) return;
    if (flippedCards.length >= 2) return;

    // Flip sound
    SoundFX.playFlip();

    // Flip this card
    const updatedCards = cards.map((c) =>
      c.id === clickedCard.id ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    const currentFlipped = [...flippedCards, clickedCard];
    setFlippedCards(currentFlipped);

    // If this is the second card flipped in this turn
    if (currentFlipped.length === 2) {
      isClickProcessingRef.current = true;
      const nextMoveCount = moveCount + 1;
      setMoveCount(nextMoveCount);
      const [firstCard, secondCard] = currentFlipped;

      if (firstCard.pairId === secondCard.pairId) {
        // MATCH FOUND! (+100 points)
        SoundFX.playMatch();
        setIsLocked(true);

        // Update score immediately (+100 points)
        setScore((prevScore) => prevScore + POINTS_PER_MATCH);

        // Step 1: Radiant cyan-white glow & shrink
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.pairId === firstCard.pairId ? { ...c, isMatching: true } : c
          )
        );

        // Step 2: Remove cards from board at original position into placeholder slots
        matchSuccessTimeoutRef.current = setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.pairId === firstCard.pairId
                ? { ...c, isMatched: true, isMatching: false, isFlipped: true }
                : c
            )
          );
          setFlippedCards([]);

          setMatchedPairsCount((prevCount) => {
            const newCount = prevCount + 1;
            const isWinningMatch = newCount === totalPairs;

            // P06: Display Knowledge Flashcard if not shown yet in this session
            const hasShownBefore = shownKnowledgeKeysRef.current.has(firstCard.device.key);
            if (!hasShownBefore) {
              shownKnowledgeKeysRef.current.add(firstCard.device.key);
              pendingWinAfterKnowledgeRef.current = isWinningMatch;
              setActiveKnowledgeDevice(firstCard.device);
            } else {
              // If already shown earlier or skipped
              if (isWinningMatch) {
                triggerVictorySequence(nextMoveCount);
              } else {
                setIsLocked(false);
                isClickProcessingRef.current = false;
              }
            }

            return newCount;
          });
        }, 420);
      } else {
        // MISMATCH! (-10 points, non-negative)
        SoundFX.playMismatch();
        setIsLocked(true);

        // Deduct 10 points immediately, score cannot fall below 0
        setScore((prevScore) => Math.max(0, prevScore - PENALTY_PER_MISMATCH));

        // Gentle shake / subtle border flash
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, isWrong: true }
              : c
          )
        );

        // Save mismatch details for Pause/Resume consistency
        pendingMismatchCardsRef.current = [firstCard, secondCard];
        mismatchStartTimeRef.current = Date.now();
        mismatchRemainingMsRef.current = null;

        // Hold open for 700ms to allow player observation, then flip back
        mismatchTimeoutRef.current = setTimeout(() => {
          executeFlipBackMismatched(firstCard, secondCard);
        }, MISMATCH_HOLD_DURATION_MS);
      }
    }
  };

  // Trigger Victory Sequence
  const triggerVictorySequence = useCallback(
    (currentMoveCount: number) => {
      clearAllTimeouts();
      setGameState('WON');
      SoundFX.playVictory();

      // Calculate time bonus (+5 points per second left)
      setTimeLeft((currTimeLeft) => {
        const bonus = currTimeLeft * BONUS_PER_SECOND_LEFT;
        setTimeBonus(bonus);

        setScore((currScore) => {
          const finalScore = currScore + bonus;

          // Record in Leaderboard and Stats once
          if (!hasRecordedEntryRef.current) {
            hasRecordedEntryRef.current = true;
            const playerName = playerInfo.name.trim() || 'Người chơi';
            const playerClass = playerInfo.className?.trim() || undefined;
            const timeUsed = currentDiffConfig.timeSeconds - currTimeLeft;

            LeaderboardStorage.saveEntry({
              playerName,
              playerClass,
              difficulty,
              score: finalScore,
              matchedPairs: totalPairs,
              totalPairs,
              movesCount: currentMoveCount,
              timeUsedSeconds: timeUsed,
              timeLeftSeconds: currTimeLeft,
              isWin: true,
            });
            setLeaderboardEntries(LeaderboardStorage.getEntries());

            const updatedStats = StatsStorage.recordGame(
              difficulty,
              true,
              timeUsed,
              currentMoveCount,
              finalScore
            );
            setStats(updatedStats);
          }

          return finalScore;
        });

        return currTimeLeft;
      });
    },
    [clearAllTimeouts, currentDiffConfig.timeSeconds, difficulty, playerInfo, totalPairs]
  );

  // Close Knowledge Flashcard (P06 Requirement 3)
  const handleCloseKnowledgeModal = () => {
    setActiveKnowledgeDevice(null);

    // If this match was the final winning pair, proceed to Victory!
    if (pendingWinAfterKnowledgeRef.current) {
      pendingWinAfterKnowledgeRef.current = false;
      triggerVictorySequence(moveCount);
    } else {
      // Game continues: unlock cards and timer resumes automatically via useEffect
      setIsLocked(false);
      isClickProcessingRef.current = false;
    }
  };

  // Clear leaderboard handler
  const handleClearLeaderboard = () => {
    LeaderboardStorage.clearAll();
    setLeaderboardEntries([]);
  };

  return (
    <div
      className={`min-h-screen ${
        classroomMode ? 'bg-[#070414]' : 'arcade-bg'
      } text-slate-100 flex flex-col justify-between selection:bg-fuchsia-500 selection:text-white font-['Plus_Jakarta_Sans'] relative overflow-x-hidden`}
    >
      {/* Background Decorative Ambient Particles & Diagonal Glow Rays (Hidden in Classroom Mode) */}
      {!classroomMode && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl" />
          <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl" />

          <div className="absolute top-[18%] left-[12%] w-2 h-2 rounded-full bg-cyan-400/30 particle-drift-1" />
          <div className="absolute top-[32%] right-[16%] w-2.5 h-2.5 rounded-full bg-fuchsia-400/25 particle-drift-2" />
          <div className="absolute bottom-[24%] left-[22%] w-1.5 h-1.5 rounded-full bg-purple-400/30 particle-drift-3" />
          <div className="absolute top-[68%] right-[28%] w-2 h-2 rounded-full bg-cyan-300/25 particle-drift-1" />
        </div>
      )}

      {/* Top Header */}
      <Header
        gameState={gameState}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        classroomMode={classroomMode}
        onToggleClassroomMode={handleToggleClassroomMode}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenStudy={() => setIsStudyOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onBackToReady={handleGoHome}
      />

      {/* Main Play Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 max-w-6xl mx-auto w-full relative z-10 compact-landscape-board">
        {/* HUD Scoreboard (Shows MM:SS, Score, Progress, Moves, Difficulty, Player, Pause/Resume, Sound, Restart) */}
        <ScoreBoard
          gameState={gameState}
          difficulty={difficulty}
          playerInfo={playerInfo}
          score={score}
          timeLeft={timeLeft}
          matchedPairsCount={matchedPairsCount}
          totalPairs={totalPairs}
          moveCount={moveCount}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onPauseToggle={handleTogglePause}
          onRestart={handleRestart}
        />

        {/* High-Contrast Central Card Table Frame (Expanded in Classroom Mode) */}
        <div
          className={`w-full ${
            classroomMode
              ? difficulty === 'EASY'
                ? 'max-w-4xl'
                : 'max-w-6xl'
              : difficulty === 'EASY'
              ? 'max-w-3xl'
              : 'max-w-5xl'
          } px-2 sm:px-4 py-1 sm:py-2 mx-auto`}
        >
          <div className="p-2 sm:p-3.5 rounded-2xl sm:rounded-3xl bg-[#0e0826]/75 border border-purple-500/25 backdrop-blur-sm shadow-2xl relative">
            {/* Dynamic Card Grid (EASY: 3x4 or 4x3; STANDARD/CHALLENGE: 4x5 or 5x4) */}
            <div
              className={`grid ${
                difficulty === 'EASY'
                  ? 'grid-cols-3 sm:grid-cols-4'
                  : 'grid-cols-4 sm:grid-cols-5'
              } gap-2 sm:gap-3 md:gap-3.5`}
            >
              {cards.map((card, idx) => (
                <Card
                  key={card.id}
                  card={card}
                  index={idx}
                  totalCards={cards.length}
                  difficulty={difficulty}
                  onClick={handleCardClick}
                  disabled={isLocked || gameState !== 'PLAYING' || isAnyModalOpen}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="w-full py-2 px-4 text-center text-slate-400 text-[11px] sm:text-xs border-t border-purple-500/10 bg-[#070514]/90 z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <span>Trò chơi giáo dục môn Tin học THCS & THPT · 10 thiết bị phần cứng</span>
          <span className="font-mono text-purple-400">
            {playerInfo.name ? `Người chơi: ${playerInfo.name} · ` : ''}Chế độ: {currentDiffConfig.name} ({currentDiffConfig.cardCount} Thẻ · {currentDiffConfig.timeSeconds}s)
          </span>
        </div>
      </footer>

      {/* ================= MODALS & OVERLAYS ================= */}

      {/* 1. Start Modal with Player Info, Difficulty Selection & Study Mode Button (P05 & P06) */}
      <StartModal
        isOpen={gameState === 'READY'}
        soundEnabled={soundEnabled}
        playerInfo={playerInfo}
        onChangePlayerInfo={handleUpdatePlayerInfo}
        selectedDifficulty={difficulty}
        onSelectDifficulty={(newDiff) => setDifficulty(newDiff)}
        stats={stats}
        onStart={() => handleStartGame(difficulty)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenDevices={() => setIsDevicesOpen(true)}
        onOpenStudy={() => setIsStudyOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onToggleSound={handleToggleSound}
      />

      {/* 2. Knowledge Flashcard Modal on Match (P06 Requirement 1, 2, 3 & 4) */}
      <KnowledgeModal
        device={activeKnowledgeDevice}
        onClose={handleCloseKnowledgeModal}
      />

      {/* 3. Study / Review Mode Modal (P06 Requirement 5) */}
      <StudyModal
        isOpen={isStudyOpen}
        onClose={() => setIsStudyOpen(false)}
      />

      {/* 4. Pause Overlay */}
      <PauseModal
        isOpen={gameState === 'PAUSED'}
        difficulty={difficulty}
        playerInfo={playerInfo}
        score={score}
        timeLeft={timeLeft}
        matchedPairsCount={matchedPairsCount}
        totalPairs={totalPairs}
        moveCount={moveCount}
        onResume={handleTogglePause}
        onRestart={handleRestart}
        onHome={handleGoHome}
      />

      {/* 5. Victory Modal with Detailed Post-Game Summary */}
      <VictoryModal
        isOpen={gameState === 'WON'}
        difficulty={difficulty}
        playerInfo={playerInfo}
        score={score}
        timeBonus={timeBonus}
        timeLeft={timeLeft}
        totalTime={currentDiffConfig.timeSeconds}
        totalPairs={totalPairs}
        moveCount={moveCount}
        onRestart={handleRestart}
        onHome={handleGoHome}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
      />

      {/* 6. Game Over Modal with Post-Game Summary */}
      <GameOverModal
        isOpen={gameState === 'LOST'}
        difficulty={difficulty}
        playerInfo={playerInfo}
        score={score}
        matchedPairsCount={matchedPairsCount}
        totalPairs={totalPairs}
        moveCount={moveCount}
        onRestart={handleRestart}
        onHome={handleGoHome}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
      />

      {/* 7. Leaderboard Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        entries={leaderboardEntries}
        onClose={() => setIsLeaderboardOpen(false)}
        onClear={handleClearLeaderboard}
      />

      {/* 8. Help Guide Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* 9. Device Catalog Modal */}
      <DeviceCatalogModal
        isOpen={isDevicesOpen}
        onClose={() => setIsDevicesOpen(false)}
      />
    </div>
  );
}

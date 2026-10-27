/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CardItem, GameState } from './types';
import { DEVICE_LIST } from './data/devices';
import { SoundFX } from './utils/sound';
import { Header } from './components/Header';
import { ScoreBoard } from './components/ScoreBoard';
import { Card } from './components/Card';
import {
  StartModal,
  VictoryModal,
  GameOverModal,
  HelpModal,
  DeviceCatalogModal,
} from './components/Modals';

const TOTAL_PAIRS = 10;
const INITIAL_TIME_SECONDS = 60;

// Utility to create a shuffled deck of 20 cards (10 pairs x 2)
function createShuffledDeck(): CardItem[] {
  const deck: CardItem[] = [];

  DEVICE_LIST.forEach((device) => {
    // Exactly 2 cards per device type
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

  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>('READY');
  const [cards, setCards] = useState<CardItem[]>(() => createShuffledDeck());
  const [flippedCards, setFlippedCards] = useState<CardItem[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [matchedPairsCount, setMatchedPairsCount] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_SECONDS);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Modals state
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isDevicesOpen, setIsDevicesOpen] = useState(false);

  // References for timers and timeouts to guarantee clean cancellation
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mismatchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const matchSuccessTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
  }, []);

  // Start new game
  const handleStartGame = useCallback(() => {
    clearAllTimeouts();
    const newDeck = createShuffledDeck();
    setCards(newDeck);
    setFlippedCards([]);
    setIsLocked(false);
    setMatchedPairsCount(0);
    setMoveCount(0);
    setTimeLeft(INITIAL_TIME_SECONDS);
    setGameState('PLAYING');
  }, [clearAllTimeouts]);

  // Restart handler
  const handleRestart = () => {
    handleStartGame();
  };

  // Sound toggle
  const handleToggleSound = () => {
    const newSoundState = SoundFX.toggleMute();
    setSoundEnabled(newSoundState);
  };

  // Main countdown game loop
  useEffect(() => {
    if (gameState === 'PLAYING') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Out of time
            clearAllTimeouts();
            setGameState('LOST');
            SoundFX.playGameOver();
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
  }, [gameState, clearAllTimeouts]);

  // Card click handler
  const handleCardClick = (clickedCard: CardItem) => {
    // Pre-conditions check
    if (gameState !== 'PLAYING') return;
    if (isLocked) return;
    if (clickedCard.isMatched || clickedCard.isFlipped) return;

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
      setMoveCount((prev) => prev + 1);
      const [firstCard, secondCard] = currentFlipped;

      if (firstCard.pairId === secondCard.pairId) {
        // MATCH FOUND!
        SoundFX.playMatch();
        setIsLocked(true);

        // Step 1: Trigger radiant cyan-white glowing aura and shrink effect
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.pairId === firstCard.pairId
              ? { ...c, isMatching: true }
              : c
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
          setIsLocked(false);

          setMatchedPairsCount((prevCount) => {
            const newCount = prevCount + 1;
            // Check victory condition
            if (newCount === TOTAL_PAIRS) {
              clearAllTimeouts();
              setGameState('WON');
              SoundFX.playVictory();
            }
            return newCount;
          });
        }, 420);
      } else {
        // MISMATCH!
        SoundFX.playMismatch();
        setIsLocked(true);

        // Gentle shake / soft border tint
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, isWrong: true }
              : c
          )
        );

        // Hold open for 700ms to allow player observation, then flip back
        mismatchTimeoutRef.current = setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.id === firstCard.id || c.id === secondCard.id
                ? { ...c, isFlipped: false, isWrong: false }
                : c
            )
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 700);
      }
    }
  };

  return (
    <div className="min-h-screen arcade-bg text-slate-100 flex flex-col justify-between selection:bg-fuchsia-500 selection:text-white font-['Plus_Jakarta_Sans'] relative overflow-x-hidden">
      {/* Background Decorative Ambient Particles & Diagonal Glow Rays */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Diagonal Soft Light Beams */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl" />

        {/* Floating subtle luminous dust particles (lightweight CSS compositor transforms) */}
        <div className="absolute top-[18%] left-[12%] w-2 h-2 rounded-full bg-cyan-400/30 particle-drift-1" />
        <div className="absolute top-[32%] right-[16%] w-2.5 h-2.5 rounded-full bg-fuchsia-400/25 particle-drift-2" />
        <div className="absolute bottom-[24%] left-[22%] w-1.5 h-1.5 rounded-full bg-purple-400/30 particle-drift-3" />
        <div className="absolute top-[68%] right-[28%] w-2 h-2 rounded-full bg-cyan-300/25 particle-drift-1" />
      </div>

      {/* Top Header */}
      <Header
        gameState={gameState}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenDevices={() => setIsDevicesOpen(true)}
        onBackToReady={() => {
          clearAllTimeouts();
          setGameState('READY');
        }}
      />

      {/* Main Play Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 max-w-6xl mx-auto w-full relative z-10">
        {/* HUD Scoreboard */}
        <ScoreBoard
          timeLeft={timeLeft}
          matchedPairsCount={matchedPairsCount}
          totalPairs={TOTAL_PAIRS}
          moveCount={moveCount}
          onRestart={handleRestart}
        />

        {/* High-Contrast Central Card Table Frame */}
        <div className="w-full max-w-5xl px-2 sm:px-4 py-2">
          <div className="p-2 sm:p-3 rounded-2xl sm:rounded-3xl bg-[#0e0826]/60 border border-purple-500/20 backdrop-blur-sm shadow-2xl">
            {/* 20 Cards Grid (4 rows x 5 cols on desktop, responsive for tablets & mobile) */}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3 md:gap-3.5">
              {cards.map((card) => (
                <Card
                  key={card.id}
                  card={card}
                  onClick={handleCardClick}
                  disabled={isLocked || gameState !== 'PLAYING'}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="w-full py-2.5 px-4 text-center text-slate-400 text-[11px] sm:text-xs border-t border-purple-500/10 bg-[#070514]/90">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <span>Trò chơi giáo dục môn Tin học THCS & THPT · 10 thiết bị phần cứng</span>
          <span className="font-mono text-purple-400">Chuẩn 20 Thẻ · 10 Cặp · Giới Hạn 60s</span>
        </div>
      </footer>

      {/* Modals */}
      <StartModal
        isOpen={gameState === 'READY'}
        onStart={handleStartGame}
        onOpenDevices={() => setIsDevicesOpen(true)}
      />

      <VictoryModal
        isOpen={gameState === 'WON'}
        timeLeft={timeLeft}
        moveCount={moveCount}
        onRestart={handleRestart}
      />

      <GameOverModal
        isOpen={gameState === 'LOST'}
        matchedPairsCount={matchedPairsCount}
        moveCount={moveCount}
        onRestart={handleRestart}
      />

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      <DeviceCatalogModal
        isOpen={isDevicesOpen}
        onClose={() => setIsDevicesOpen(false)}
      />
    </div>
  );
}

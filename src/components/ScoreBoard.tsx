/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Timer, RotateCcw, CheckCircle2, Award, Pause, Play, Volume2, VolumeX, Sparkles, User } from 'lucide-react';
import { DifficultyLevel, GameState, PlayerInfo } from '../types';
import { DIFFICULTY_CONFIGS } from '../data/difficulty';

interface ScoreBoardProps {
  gameState: GameState;
  difficulty: DifficultyLevel;
  playerInfo: PlayerInfo;
  score: number;
  timeLeft: number; // in seconds
  matchedPairsCount: number;
  totalPairs: number;
  moveCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onPauseToggle: () => void;
  onRestart: () => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  gameState,
  difficulty,
  playerInfo,
  score,
  timeLeft,
  matchedPairsCount,
  totalPairs,
  moveCount,
  soundEnabled,
  onToggleSound,
  onPauseToggle,
  onRestart,
}) => {
  // Format MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isLowTime = timeLeft <= 10 && gameState === 'PLAYING';
  const progressPercent = Math.round((matchedPairsCount / totalPairs) * 100);
  const diffConfig = DIFFICULTY_CONFIGS[difficulty];

  const displayName = playerInfo.name.trim() || 'Người chơi';

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-1.5 sm:py-2.5 mb-1 sm:mb-2">
      <div className="bg-[#120b30]/90 border border-purple-500/30 rounded-2xl p-2.5 sm:p-3.5 backdrop-blur-md shadow-xl flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
        {/* Zone 1: Player Tag & Countdown Timer */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center border transition-all duration-300 ${
              isLowTime
                ? 'bg-rose-950/80 border-rose-500/80 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.35)] animate-pulse'
                : 'bg-cyan-950/70 border-cyan-500/40 text-cyan-400'
            }`}
          >
            <Timer className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] sm:text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">
                Thời gian
              </span>
              <span
                className={`text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${diffConfig.badgeColor}`}
              >
                {diffConfig.name}
              </span>
            </div>
            <div
              className={`text-xl sm:text-2xl md:text-3xl font-black font-mono tracking-wider tabular-nums ${
                isLowTime ? 'text-rose-400' : 'text-cyan-300'
              }`}
            >
              {formattedTime}
            </div>
          </div>
        </div>

        {/* Zone 2: Live Score (P05 Requirement 2) */}
        <div className="flex items-center gap-2 bg-purple-950/60 border border-purple-500/30 rounded-xl px-3 py-1.5">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
              Điểm số
            </div>
            <div className="text-lg sm:text-2xl font-black font-mono text-amber-300 tabular-nums drop-shadow-[0_0_8px_rgba(252,211,77,0.4)]">
              {score}
            </div>
          </div>
        </div>

        {/* Zone 3: Progress Pairs Bar */}
        <div className="flex-1 min-w-[160px] sm:min-w-[190px] flex flex-col justify-center">
          <div className="flex items-center justify-between mb-1 text-xs sm:text-sm">
            <span className="flex items-center gap-1 text-slate-300 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Cặp:</span>
              <strong className="text-emerald-400 font-mono text-xs sm:text-sm font-bold">
                {matchedPairsCount}/{totalPairs}
              </strong>
            </span>
            {/* Player Info Badge (Section 1) */}
            <div className="flex items-center gap-1 text-[11px] font-medium text-purple-300 truncate max-w-[130px]">
              <User className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="truncate">{displayName}</span>
              {playerInfo.className && (
                <span className="text-[10px] text-cyan-400 font-mono shrink-0">({playerInfo.className})</span>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-purple-500/20 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-emerald-400 transition-all duration-500 ease-out shadow-[0_0_8px_rgba(217,70,239,0.4)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Zone 4: Moves Count */}
        <div className="flex items-center gap-1 sm:gap-2 text-right">
          <div>
            <div className="text-[10px] sm:text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider flex items-center justify-end gap-1">
              <Award className="w-3.5 h-3.5 text-fuchsia-400" />
              <span>Lượt:</span>
            </div>
            <div className="text-base sm:text-xl font-bold font-mono text-fuchsia-300 tabular-nums">
              {moveCount}
            </div>
          </div>
        </div>

        {/* Zone 5: Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Pause / Resume Button */}
          {(gameState === 'PLAYING' || gameState === 'PAUSED') && (
            <button
              onClick={onPauseToggle}
              title={gameState === 'PAUSED' ? 'Tiếp tục trò chơi' : 'Tạm dừng trò chơi'}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-95 border ${
                gameState === 'PAUSED'
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-md shadow-emerald-500/30'
                  : 'bg-amber-600/80 hover:bg-amber-500 text-white border-amber-400/40 shadow-md shadow-amber-600/20'
              }`}
            >
              {gameState === 'PAUSED' ? (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden xs:inline">Tiếp tục</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden xs:inline">Tạm dừng</span>
                </>
              )}
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Âm thanh: ĐANG BẬT' : 'Âm thanh: ĐÃ TẮT'}
            className={`p-1.5 sm:p-2 rounded-xl border text-xs font-medium transition-all ${
              soundEnabled
                ? 'bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                : 'bg-slate-800/90 hover:bg-slate-700 text-slate-400 border-slate-700'
            }`}
            aria-label={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Restart Button */}
          <button
            onClick={onRestart}
            title="Chơi lại ván mới"
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-purple-600/80 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-purple-600/30 transition-all active:scale-95 border border-purple-400/40"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Chơi lại</span>
          </button>
        </div>
      </div>
    </div>
  );
};

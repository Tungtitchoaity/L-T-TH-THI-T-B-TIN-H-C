/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Timer, RotateCcw, CheckCircle2, Award } from 'lucide-react';

interface ScoreBoardProps {
  timeLeft: number; // in seconds
  matchedPairsCount: number;
  totalPairs: number;
  moveCount: number;
  onRestart: () => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  timeLeft,
  matchedPairsCount,
  totalPairs,
  moveCount,
  onRestart,
}) => {
  // Format MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isLowTime = timeLeft <= 10;
  const progressPercent = Math.round((matchedPairsCount / totalPairs) * 100);

  return (
    <div className="w-full max-w-5xl mx-auto px-3 py-2 sm:py-3 mb-2 sm:mb-4">
      <div className="bg-[#130d33]/80 border border-purple-500/30 rounded-2xl p-3 sm:p-4 backdrop-blur-md shadow-xl flex flex-wrap items-center justify-between gap-3 sm:gap-6">
        {/* Countdown Timer */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${
              isLowTime
                ? 'bg-rose-950/80 border-rose-500 text-rose-400 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                : 'bg-cyan-950/60 border-cyan-500/40 text-cyan-400'
            }`}
          >
            <Timer className={`w-5 h-5 sm:w-6 sm:h-6 ${isLowTime ? 'animate-bounce' : ''}`} />
          </div>
          <div>
            <div className="text-[10px] sm:text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">
              Thời gian
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

        {/* Progress: Matched Pairs */}
        <div className="flex-1 min-w-[200px] flex flex-col justify-center">
          <div className="flex items-center justify-between mb-1.5 text-xs sm:text-sm">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Đã tìm được:</span>
              <strong className="text-emerald-400 font-mono text-sm sm:text-base">
                {matchedPairsCount}/{totalPairs} cặp
              </strong>
            </span>
            <span className="text-[11px] font-mono text-purple-300/80">
              {progressPercent}%
            </span>
          </div>

          {/* Glowing Progress Track */}
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-purple-500/20 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-emerald-400 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(217,70,239,0.5)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Moves Count & Restart */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-right">
            <div className="text-[10px] sm:text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider flex items-center justify-end gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Số lượt lật
            </div>
            <div className="text-lg sm:text-2xl font-bold font-mono text-amber-300 tabular-nums">
              {moveCount}
            </div>
          </div>

          <button
            onClick={onRestart}
            title="Chơi lại ván mới"
            className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-purple-600/80 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-purple-600/30 transition-all active:scale-95 border border-purple-400/40"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden xs:inline">Chơi lại</span>
          </button>
        </div>
      </div>
    </div>
  );
};

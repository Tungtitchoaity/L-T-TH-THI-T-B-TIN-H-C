/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Volume2, VolumeX, HelpCircle, ArrowLeft, Trophy, GraduationCap, Tv } from 'lucide-react';
import { GameState } from '../types';

interface HeaderProps {
  gameState: GameState;
  soundEnabled: boolean;
  onToggleSound: () => void;
  classroomMode: boolean;
  onToggleClassroomMode: () => void;
  onOpenHelp: () => void;
  onOpenStudy: () => void;
  onOpenLeaderboard: () => void;
  onBackToReady: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  gameState,
  soundEnabled,
  onToggleSound,
  classroomMode,
  onToggleClassroomMode,
  onOpenHelp,
  onOpenStudy,
  onOpenLeaderboard,
  onBackToReady,
}) => {
  return (
    <header className="w-full bg-[#0d0926]/90 backdrop-blur-md border-b border-purple-500/20 px-3 sm:px-6 py-2 sm:py-2.5 z-30 sticky top-0 shadow-lg shadow-purple-950/30">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Back Button & Subtext */}
        <div className="flex items-center gap-2">
          {(gameState === 'PLAYING' || gameState === 'PAUSED') && (
            <button
              onClick={onBackToReady}
              title="Quay lại màn hình giới thiệu"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900/80 text-purple-200 border border-purple-500/30 text-xs sm:text-sm font-medium transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span className="hidden xs:inline">Quay lại</span>
            </button>
          )}

          <div className="hidden md:flex flex-col">
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-semibold uppercase">
              TIN HỌC THCS & THPT
            </span>
            <span className="text-xs text-purple-300/80">Khám Phá Phần Cứng Máy Tính</span>
          </div>
        </div>

        {/* Center: Title “LẬT THẺ THIẾT BỊ TIN HỌC” */}
        <div className="flex items-center gap-2 text-center">
          <div className="hidden sm:block w-2.5 h-2.5 rotate-45 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          <h1 className="text-base sm:text-xl md:text-2xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500 uppercase font-['Outfit'] drop-shadow-[0_2px_10px_rgba(236,72,153,0.3)]">
            LẬT THẺ THIẾT BỊ TIN HỌC
          </h1>
          <div className="hidden sm:block w-2.5 h-2.5 rotate-45 bg-fuchsia-400 shadow-[0_0_8px_#e879f9]" />
        </div>

        {/* Right: Sound, Presentation Mode, Leaderboard, Study, Help */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            className="p-1.5 sm:p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors text-xs flex items-center justify-center focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Classroom Presentation Mode Toggle (P08 Requirement 6) */}
          <button
            onClick={onToggleClassroomMode}
            title={
              classroomMode
                ? 'Chế độ máy chiếu lớp học: ĐANG BẬT (Thẻ lớn, tương phản cao)'
                : 'Bật chế độ máy chiếu lớp học (Phóng to thẻ, giảm hiệu ứng nền)'
            }
            className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg border transition-all text-xs font-semibold ${
              classroomMode
                ? 'bg-cyan-950/90 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.4)]'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            <Tv className="w-4 h-4 text-cyan-400" />
            <span className="hidden xl:inline">
              {classroomMode ? 'Máy chiếu: BẬT' : 'Máy chiếu'}
            </span>
          </button>

          {/* Leaderboard Button */}
          <button
            onClick={onOpenLeaderboard}
            title="Xem bảng xếp hạng"
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 text-amber-200 hover:text-white border border-amber-500/40 transition-colors text-xs font-semibold"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Xếp hạng</span>
          </button>

          {/* Ôn tập thiết bị (P06 Requirement 5) */}
          <button
            onClick={onOpenStudy}
            title="Chế độ ôn tập 10 thiết bị"
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg bg-purple-950/70 hover:bg-purple-900 text-cyan-300 hover:text-white border border-purple-500/40 transition-colors text-xs font-semibold"
          >
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">Ôn tập</span>
          </button>

          {/* Help Modal */}
          <button
            onClick={onOpenHelp}
            title="Hướng dẫn luật chơi & lớp học"
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-900/60 text-slate-200 hover:text-white border border-slate-700 hover:border-cyan-500/40 transition-colors text-xs font-medium"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span className="hidden lg:inline">Hướng dẫn</span>
          </button>
        </div>
      </div>
    </header>
  );
};

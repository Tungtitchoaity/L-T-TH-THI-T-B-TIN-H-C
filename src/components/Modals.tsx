/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Play,
  RotateCcw,
  X,
  Trophy,
  AlertTriangle,
  Sparkles,
  Clock,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Home,
  Pause,
  Award,
  Volume2,
  VolumeX,
  Zap,
  Flame,
  ShieldCheck,
  User,
  GraduationCap,
  Trash2,
  Filter,
} from 'lucide-react';
import { DEVICE_LIST } from '../data/devices';
import { DeviceIconComponent } from './DeviceIcons';
import { DifficultyLevel, GameStats, LeaderboardEntry, PlayerInfo } from '../types';
import { DIFFICULTY_CONFIGS } from '../data/difficulty';

/* ========================================================
   1. START MODAL (MÀN HÌNH BẮT ĐẦU VỚI NHẬP TÊN & LỚP)
   ======================================================== */
interface StartModalProps {
  isOpen: boolean;
  soundEnabled: boolean;
  playerInfo: PlayerInfo;
  onChangePlayerInfo: (info: PlayerInfo) => void;
  selectedDifficulty: DifficultyLevel;
  onSelectDifficulty: (diff: DifficultyLevel) => void;
  stats: GameStats;
  onStart: () => void;
  onOpenHelp: () => void;
  onOpenDevices: () => void;
  onOpenStudy: () => void;
  onOpenLeaderboard: () => void;
  onToggleSound: () => void;
}

export const StartModal: React.FC<StartModalProps> = ({
  isOpen,
  soundEnabled,
  playerInfo,
  onChangePlayerInfo,
  selectedDifficulty,
  onSelectDifficulty,
  stats,
  onStart,
  onOpenHelp,
  onOpenDevices,
  onOpenStudy,
  onOpenLeaderboard,
  onToggleSound,
}) => {
  if (!isOpen) return null;

  const currentDiffStats = stats.byDifficulty[selectedDifficulty];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#1b123d] via-[#120a2a] to-[#0c061c] border-2 border-purple-500/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_0_60px_rgba(168,85,247,0.35)] text-center text-slate-100 max-h-[94vh] overflow-y-auto">
        {/* Top Sound & Leaderboard Controls */}
        <div className="flex items-center justify-between mb-3 z-20">
          <button
            onClick={onOpenLeaderboard}
            className="px-2.5 py-1.5 rounded-xl bg-amber-950/70 hover:bg-amber-900 border border-amber-500/40 text-amber-300 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Bảng xếp hạng</span>
          </button>

          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Âm thanh: ĐANG BẬT' : 'Âm thanh: ĐÃ TẮT'}
            className={`px-2.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold ${
              soundEnabled
                ? 'bg-purple-950/90 border-cyan-400/50 text-cyan-300 shadow-sm shadow-cyan-500/20'
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Âm thanh: BẬT</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span>Âm thanh: TẮT</span>
              </>
            )}
          </button>
        </div>

        {/* Subtitle Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-900/60 border border-purple-400/30 text-cyan-300 text-xs font-mono font-semibold mb-1.5">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Thử thách trí nhớ công nghệ Tin học</span>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500 font-['Outfit'] mb-1 drop-shadow-[0_2px_12px_rgba(236,72,153,0.35)]">
          LẬT THẺ THIẾT BỊ TIN HỌC
        </h1>

        {/* =========================================
            1. THÔNG TIN NGƯỜI CHƠI (P05 Requirement 1)
           ========================================= */}
        <div className="bg-[#0e0826]/90 border border-purple-500/30 rounded-xl p-3 mb-3 text-left">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>Thông tin người chơi:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-mono text-slate-300 mb-1">
                Tên hoặc biệt danh:
              </label>
              <input
                type="text"
                maxLength={25}
                placeholder="Người chơi"
                value={playerInfo.name}
                onChange={(e) =>
                  onChangePlayerInfo({ ...playerInfo, name: e.target.value })
                }
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900/90 border border-purple-500/40 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-300 mb-1 flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-fuchsia-400" />
                <span>Lớp (không bắt buộc):</span>
              </label>
              <input
                type="text"
                maxLength={15}
                placeholder="Ví dụ: 10A1, 8B..."
                value={playerInfo.className || ''}
                onChange={(e) =>
                  onChangePlayerInfo({ ...playerInfo, className: e.target.value })
                }
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900/90 border border-purple-500/40 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              />
            </div>
          </div>
        </div>

        {/* =========================================
            2. CHỌN ĐỘ KHÓ
           ========================================= */}
        <div className="mb-3 text-left">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              CHỌN CẤP ĐỘ CHƠI:
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {DIFFICULTY_CONFIGS[selectedDifficulty].description}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* DỄ */}
            <button
              type="button"
              onClick={() => onSelectDifficulty('EASY')}
              className={`p-2 rounded-xl border text-left transition-all ${
                selectedDifficulty === 'EASY'
                  ? 'bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-400/50 shadow-md shadow-emerald-950/60 scale-[1.02]'
                  : 'bg-slate-900/60 border-slate-700/80 hover:border-emerald-500/40 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs font-black font-['Outfit'] text-emerald-300">DỄ</span>
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
              </div>
              <div className="text-[10px] font-bold text-white">12 Thẻ (6 cặp)</div>
              <div className="text-[9px] text-emerald-400/90 font-mono">90s · 3×4</div>
            </button>

            {/* TIÊU CHUẨN */}
            <button
              type="button"
              onClick={() => onSelectDifficulty('STANDARD')}
              className={`p-2 rounded-xl border text-left transition-all ${
                selectedDifficulty === 'STANDARD'
                  ? 'bg-cyan-950/80 border-cyan-400 ring-2 ring-cyan-400/50 shadow-md shadow-cyan-950/60 scale-[1.02]'
                  : 'bg-slate-900/60 border-slate-700/80 hover:border-cyan-500/40 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs font-black font-['Outfit'] text-cyan-300">TIÊU CHUẨN</span>
                <Sparkles className="w-3 h-3 text-cyan-400" />
              </div>
              <div className="text-[10px] font-bold text-white">20 Thẻ (10 cặp)</div>
              <div className="text-[9px] text-cyan-400/90 font-mono">60s · 4×5</div>
            </button>

            {/* THỬ THÁCH */}
            <button
              type="button"
              onClick={() => onSelectDifficulty('CHALLENGE')}
              className={`p-2 rounded-xl border text-left transition-all ${
                selectedDifficulty === 'CHALLENGE'
                  ? 'bg-rose-950/80 border-rose-400 ring-2 ring-rose-400/50 shadow-md shadow-rose-950/60 scale-[1.02]'
                  : 'bg-slate-900/60 border-slate-700/80 hover:border-rose-500/40 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs font-black font-['Outfit'] text-rose-300">THỬ THÁCH</span>
                <Flame className="w-3 h-3 text-rose-400" />
              </div>
              <div className="text-[10px] font-bold text-white">20 Thẻ (10 cặp)</div>
              <div className="text-[9px] text-rose-400/90 font-mono">40s · Tốc độ</div>
            </button>
          </div>
        </div>

        {/* Scoring summary notice */}
        <div className="bg-slate-900/70 border border-slate-700/70 rounded-xl p-2 mb-3 text-left text-[11px] text-slate-300 grid grid-cols-2 gap-1.5">
          <div>
            <span className="text-emerald-400 font-bold">✓ Ghép đúng:</span> +100 điểm
          </div>
          <div>
            <span className="text-rose-400 font-bold">✗ Ghép sai:</span> -10 điểm (không âm)
          </div>
          <div>
            <span className="text-amber-300 font-bold">⚡ Thắng:</span> +5 điểm / mỗi giây còn
          </div>
          <div>
            <span className="text-cyan-400 font-bold">🏆 Xếp hạng:</span> Điểm cao & Nhanh nhất
          </div>
        </div>

        {/* Buttons: BẮT ĐẦU & ÔN TẬP THIẾT BỊ & HƯỚNG DẪN */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-7 sm:px-9 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-fuchsia-600 to-pink-500 hover:from-cyan-400 hover:via-fuchsia-500 hover:to-pink-400 text-white font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-[0_0_20px_rgba(217,70,239,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>BẮT ĐẦU CHƠI ({DIFFICULTY_CONFIGS[selectedDifficulty].name})</span>
          </button>

          <button
            onClick={onOpenStudy}
            className="w-full sm:w-auto px-4 py-3 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-cyan-300 hover:text-white border border-purple-500/40 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>ÔN TẬP THIẾT BỊ</span>
          </button>

          <button
            onClick={onOpenHelp}
            className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-purple-200 border border-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span>HƯỚNG DẪN</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ========================================================
   2. LEADERBOARD MODAL (BẢNG XẾP HẠNG - REQUIREMENT 4 & 5)
   ======================================================== */
interface LeaderboardModalProps {
  isOpen: boolean;
  entries: LeaderboardEntry[];
  onClose: () => void;
  onClear: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  entries,
  onClose,
  onClear,
}) => {
  const [filterDiff, setFilterDiff] = useState<'ALL' | DifficultyLevel>('ALL');

  if (!isOpen) return null;

  const filteredEntries = filterDiff === 'ALL'
    ? entries
    : entries.filter((e) => e.difficulty === filterDiff);

  const handleClearWithConfirm = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử bảng xếp hạng không? Thao tác này không thể hoàn tác.')) {
      onClear();
    }
  };

  const getRankBadge = (index: number) => {
    if (index === 0) {
      return (
        <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shadow-[0_0_10px_#f59e0b]">
          🥇
        </span>
      );
    }
    if (index === 1) {
      return (
        <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-950 flex items-center justify-center font-black text-xs shadow-[0_0_8px_#cbd5e1]">
          🥈
        </span>
      );
    }
    if (index === 2) {
      return (
        <span className="w-6 h-6 rounded-full bg-amber-700 text-white flex items-center justify-center font-black text-xs shadow-[0_0_8px_#b45309]">
          🥉
        </span>
      );
    }
    return <span className="font-mono text-slate-400 text-xs font-bold pl-1.5">{index + 1}</span>;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#180f33] via-[#110926] to-[#090517] border-2 border-amber-400/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_0_50px_rgba(245,158,11,0.25)] text-slate-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black uppercase text-amber-300 font-['Outfit']">
                BẢNG XẾP HẠNG THÀNH TÍCH
              </h3>
              <p className="text-[10px] text-slate-400">Lưu trữ cục bộ trên thiết bị (Top 100 kết quả)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-purple-900/40 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between gap-2 my-3">
          <div className="flex items-center gap-1 p-1 bg-slate-900/80 rounded-lg border border-purple-500/20 text-xs">
            <button
              onClick={() => setFilterDiff('ALL')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                filterDiff === 'ALL'
                  ? 'bg-purple-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilterDiff('EASY')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                filterDiff === 'EASY'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Dễ (12 thẻ)
            </button>
            <button
              onClick={() => setFilterDiff('STANDARD')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                filterDiff === 'STANDARD'
                  ? 'bg-cyan-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tiêu chuẩn
            </button>
            <button
              onClick={() => setFilterDiff('CHALLENGE')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                filterDiff === 'CHALLENGE'
                  ? 'bg-rose-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Thử thách
            </button>
          </div>

          {entries.length > 0 && (
            <button
              onClick={handleClearWithConfirm}
              className="flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300 hover:underline px-2 py-1 rounded bg-rose-950/40 border border-rose-500/30"
              title="Xóa toàn bộ lịch sử điểm"
            >
              <Trash2 className="w-3 h-3" />
              <span className="hidden sm:inline">Xóa lịch sử</span>
            </button>
          )}
        </div>

        {/* Leaderboard Table */}
        <div className="flex-1 overflow-y-auto pr-1">
          {filteredEntries.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <Trophy className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-semibold">Chưa có kết quả nào được ghi nhận</p>
              <p className="text-xs text-slate-600 mt-1">
                Hãy hoàn thành ván chơi để ghi tên mình lên bảng vàng!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-purple-500/20 text-slate-400 font-mono uppercase text-[10px]">
                    <th className="py-2 px-2 text-center w-10">Hạng</th>
                    <th className="py-2 px-2">Người chơi</th>
                    <th className="py-2 px-2 hidden sm:table-cell">Lớp</th>
                    <th className="py-2 px-2">Cấp độ</th>
                    <th className="py-2 px-2 text-right">Điểm</th>
                    <th className="py-2 px-2 text-right">Thời gian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredEntries.map((item, idx) => {
                    const isTop3 = idx < 3;
                    return (
                      <tr
                        key={item.id}
                        className={`hover:bg-purple-950/30 transition-colors ${
                          isTop3 ? 'bg-amber-950/15' : ''
                        }`}
                      >
                        <td className="py-2.5 px-2 text-center">{getRankBadge(idx)}</td>
                        <td className="py-2.5 px-2 font-bold text-white">
                          <div className="flex items-center gap-1.5">
                            <span className="truncate max-w-[120px] sm:max-w-[160px]">
                              {item.playerName}
                            </span>
                            {item.isWin && (
                              <span className="text-[9px] px-1 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400 shrink-0">
                                Thắng
                              </span>
                            )}
                          </div>
                          {/* Mobile class display */}
                          {item.playerClass && (
                            <span className="text-[10px] text-cyan-400 font-mono sm:hidden block">
                              Lớp: {item.playerClass}
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-2 font-mono text-cyan-300 hidden sm:table-cell">
                          {item.playerClass || '—'}
                        </td>
                        <td className="py-2.5 px-2">
                          <span
                            className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                              DIFFICULTY_CONFIGS[item.difficulty]?.badgeColor ||
                              'text-slate-400'
                            }`}
                          >
                            {DIFFICULTY_CONFIGS[item.difficulty]?.name || item.difficulty}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-right font-black font-mono text-amber-300 text-sm">
                          {item.score}
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono text-slate-300 text-xs">
                          {item.timeUsedSeconds}s
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 mt-auto border-t border-purple-500/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
          >
            ĐÓNG
          </button>
        </div>
      </div>
    </div>
  );
};

/* ========================================================
   3. PAUSE MODAL (MÀN HÌNH TẠM DỪNG)
   ======================================================== */
interface PauseModalProps {
  isOpen: boolean;
  difficulty: DifficultyLevel;
  playerInfo: PlayerInfo;
  score: number;
  timeLeft: number;
  matchedPairsCount: number;
  totalPairs: number;
  moveCount: number;
  onResume: () => void;
  onRestart: () => void;
  onHome: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  isOpen,
  difficulty,
  playerInfo,
  score,
  timeLeft,
  matchedPairsCount,
  totalPairs,
  moveCount,
  onResume,
  onRestart,
  onHome,
}) => {
  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const diffConfig = DIFFICULTY_CONFIGS[difficulty];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#1c133a] via-[#120a28] to-[#0a0518] border-2 border-amber-400/50 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-[0_0_50px_rgba(245,158,11,0.25)] text-center text-slate-100">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mb-3 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
          <Pause className="w-7 h-7 fill-current" />
        </div>

        <h2 className="text-xl sm:text-2xl font-black uppercase text-amber-300 font-['Outfit'] mb-1">
          TRÒ CHƠI ĐANG TẠM DỪNG
        </h2>
        <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-bold mb-3 border border-purple-500/30 bg-purple-950/60 text-purple-200">
          {playerInfo.name || 'Người chơi'} · {diffConfig.name} ({diffConfig.cardCount} thẻ)
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mb-4">
          Đồng hồ và tương tác thẻ đã tạm khóa. Bạn có thể tiếp tục bất cứ lúc nào!
        </p>

        {/* Current State Summary */}
        <div className="bg-[#0b071e]/90 border border-slate-700 rounded-xl p-3 mb-5 grid grid-cols-4 gap-1 text-center">
          <div>
            <span className="text-[9px] text-slate-400 block font-mono">Điểm</span>
            <strong className="text-amber-300 font-mono text-sm">{score}</strong>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 block font-mono">Thời gian</span>
            <strong className="text-cyan-300 font-mono text-sm">{formattedTime}</strong>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 block font-mono">Cặp</span>
            <strong className="text-emerald-400 font-mono text-sm">
              {matchedPairsCount}/{totalPairs}
            </strong>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 block font-mono">Lượt lật</span>
            <strong className="text-fuchsia-300 font-mono text-sm">{moveCount}</strong>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={onResume}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-base uppercase tracking-wider shadow-[0_0_20px_rgba(52,211,153,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>TIẾP TỤC</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onRestart}
              className="py-2.5 px-3 rounded-xl bg-purple-900/70 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm border border-purple-500/30 flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>CHƠI LẠI</span>
            </button>
            <button
              onClick={onHome}
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>MÀN HÌNH CHÍNH</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================
   4. VICTORY MODAL (MÀN HÌNH CHIẾN THẮNG & TỔNG KẾT - P05 Requirement 3)
   ======================================================== */
interface VictoryModalProps {
  isOpen: boolean;
  difficulty: DifficultyLevel;
  playerInfo: PlayerInfo;
  score: number;
  timeBonus: number;
  timeLeft: number;
  totalTime: number;
  totalPairs: number;
  moveCount: number;
  onRestart: () => void;
  onHome: () => void;
  onOpenLeaderboard: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  difficulty,
  playerInfo,
  score,
  timeBonus,
  timeLeft,
  totalTime,
  totalPairs,
  moveCount,
  onRestart,
  onHome,
  onOpenLeaderboard,
}) => {
  useEffect(() => {
    if (isOpen) {
      const end = Date.now() + 2.5 * 1000;
      const colors = ['#facc15', '#22d3ee', '#e879f9', '#34d399', '#f59e0b'];

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const timeUsed = totalTime - timeLeft;
  const stars = timeLeft >= totalTime * 0.4 ? 3 : timeLeft >= totalTime * 0.15 ? 2 : 1;
  const diffConfig = DIFFICULTY_CONFIGS[difficulty];
  const displayName = playerInfo.name.trim() || 'Người chơi';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#1d1645] via-[#140e33] to-[#0a071c] border-2 border-emerald-400/60 rounded-3xl p-5 sm:p-7 shadow-[0_0_60px_rgba(52,211,153,0.35)] text-center text-slate-100 max-h-[94vh] overflow-y-auto">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(52,211,153,0.4)]">
          <Trophy className="w-8 h-8 text-emerald-400 animate-bounce" />
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-1.5 mb-1 text-2xl text-amber-400">
          {'★'.repeat(stars)}
          {'☆'.repeat(3 - stars)}
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-fuchsia-400 font-['Outfit'] mb-0.5">
          CHÚC MỪNG! BẠN ĐÃ CHIẾN THẮNG!
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-slate-300 mb-3">
          Người chơi: <strong className="text-cyan-400">{displayName}</strong>
          {playerInfo.className && <span> · Lớp: <strong className="text-fuchsia-400">{playerInfo.className}</strong></span>}
          <span> · Cấp độ: <strong className="text-emerald-400">{diffConfig.name}</strong></span>
        </p>

        {/* Final Score Big Callout */}
        <div className="bg-gradient-to-r from-amber-500/20 via-purple-900/40 to-cyan-500/20 border border-amber-400/50 rounded-2xl p-3 mb-4">
          <span className="text-[11px] font-mono text-amber-300 uppercase font-bold tracking-wider block">
            TỔNG ĐIỂM ĐẠT ĐƯỢC
          </span>
          <div className="text-3xl sm:text-4xl font-black font-mono text-amber-300 tracking-wider drop-shadow-[0_0_15px_rgba(252,211,77,0.5)] my-0.5">
            {score}
          </div>
          <div className="text-[10px] text-slate-300 font-mono">
            Ghép đúng + Thưởng thời gian (+{timeBonus}đ từ {timeLeft}s còn lại)
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-5 text-center">
          <div className="bg-[#0b081c]/90 border border-slate-700/80 rounded-xl p-2 flex flex-col items-center">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mb-0.5" />
            <span className="text-[9px] text-slate-400 font-mono">Cặp ghép</span>
            <span className="text-xs sm:text-sm font-black text-emerald-400 font-mono">{totalPairs}/{totalPairs}</span>
          </div>

          <div className="bg-[#0b081c]/90 border border-slate-700/80 rounded-xl p-2 flex flex-col items-center">
            <Clock className="w-3.5 h-3.5 text-cyan-400 mb-0.5" />
            <span className="text-[9px] text-slate-400 font-mono">Dùng</span>
            <span className="text-xs sm:text-sm font-black text-cyan-300 font-mono">{timeUsed}s</span>
          </div>

          <div className="bg-[#0b081c]/90 border border-slate-700/80 rounded-xl p-2 flex flex-col items-center">
            <Clock className="w-3.5 h-3.5 text-emerald-400 mb-0.5" />
            <span className="text-[9px] text-slate-400 font-mono">Còn lại</span>
            <span className="text-xs sm:text-sm font-black text-emerald-300 font-mono">{timeLeft}s</span>
          </div>

          <div className="bg-[#0b081c]/90 border border-slate-700/80 rounded-xl p-2 flex flex-col items-center">
            <RotateCcw className="w-3.5 h-3.5 text-fuchsia-400 mb-0.5" />
            <span className="text-[9px] text-slate-400 font-mono">Lượt lật</span>
            <span className="text-xs sm:text-sm font-black text-fuchsia-300 font-mono">{moveCount}</span>
          </div>
        </div>

        {/* Buttons (Requirement 3: Chơi lại, Về màn hình chính, Xem bảng xếp hạng) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <button
            onClick={onRestart}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(52,211,153,0.4)] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            <span>CHƠI LẠI</span>
          </button>

          <button
            onClick={onOpenLeaderboard}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 text-amber-300 font-bold text-xs sm:text-sm border border-amber-500/40 flex items-center justify-center gap-1.5 transition-all"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>XEM BẢNG XẾP HẠNG</span>
          </button>

          <button
            onClick={onHome}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 flex items-center justify-center gap-1.5 transition-all"
          >
            <Home className="w-4 h-4 text-slate-300" />
            <span>VỀ MÀN HÌNH CHÍNH</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ========================================================
   5. GAME OVER MODAL (MÀN HÌNH HẾT GIỜ & TỔNG KẾT - P05 Requirement 3)
   ======================================================== */
interface GameOverModalProps {
  isOpen: boolean;
  difficulty: DifficultyLevel;
  playerInfo: PlayerInfo;
  score: number;
  matchedPairsCount: number;
  totalPairs: number;
  moveCount: number;
  onRestart: () => void;
  onHome: () => void;
  onOpenLeaderboard: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  difficulty,
  playerInfo,
  score,
  matchedPairsCount,
  totalPairs,
  moveCount,
  onRestart,
  onHome,
  onOpenLeaderboard,
}) => {
  if (!isOpen) return null;
  const diffConfig = DIFFICULTY_CONFIGS[difficulty];
  const displayName = playerInfo.name.trim() || 'Người chơi';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#241322] via-[#180a1e] to-[#0d0514] border-2 border-rose-500/60 rounded-3xl p-5 sm:p-7 shadow-[0_0_60px_rgba(244,63,94,0.3)] text-center text-slate-100 max-h-[94vh] overflow-y-auto">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(244,63,94,0.4)]">
          <AlertTriangle className="w-8 h-8 text-rose-400 animate-pulse" />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black uppercase text-rose-400 font-['Outfit'] mb-1">
          HẾT GIỜ!
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-slate-300 mb-3">
          Người chơi: <strong className="text-cyan-400">{displayName}</strong>
          {playerInfo.className && <span> · Lớp: <strong className="text-fuchsia-400">{playerInfo.className}</strong></span>}
          <span> · Cấp độ: <strong className="text-rose-400">{diffConfig.name}</strong></span>
        </p>

        {/* Final Score Callout */}
        <div className="bg-gradient-to-r from-rose-950/40 via-purple-950/40 to-amber-950/40 border border-rose-500/40 rounded-2xl p-3 mb-4">
          <span className="text-[11px] font-mono text-slate-400 uppercase font-bold tracking-wider block">
            ĐIỂM ĐẠT ĐƯỢC
          </span>
          <div className="text-3xl sm:text-4xl font-black font-mono text-amber-300 tracking-wider my-0.5">
            {score}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            Kết quả: Chưa hoàn thành ({matchedPairsCount}/{totalPairs} cặp)
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <div className="bg-[#0b081c]/80 border border-slate-700/80 rounded-xl p-2.5 flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-mono">Cặp đã ghép</span>
            <span className="text-base font-black text-rose-400 font-mono">{matchedPairsCount}/{totalPairs}</span>
          </div>

          <div className="bg-[#0b081c]/80 border border-slate-700/80 rounded-xl p-2.5 flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-mono">Tổng lượt lật</span>
            <span className="text-base font-black text-amber-300 font-mono">{moveCount} lượt</span>
          </div>
        </div>

        {/* Buttons (Requirement 3: Chơi lại, Về màn hình chính, Xem bảng xếp hạng) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <button
            onClick={onRestart}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(244,63,94,0.4)] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-white" />
            <span>THỬ LẠI</span>
          </button>

          <button
            onClick={onOpenLeaderboard}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 text-amber-300 font-bold text-xs sm:text-sm border border-amber-500/40 flex items-center justify-center gap-1.5 transition-all"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>XEM BẢNG XẾP HẠNG</span>
          </button>

          <button
            onClick={onHome}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 flex items-center justify-center gap-1.5 transition-all"
          >
            <Home className="w-4 h-4 text-slate-300" />
            <span>VỀ MÀN HÌNH CHÍNH</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ========================================================
   6. HELP MODAL (HƯỚNG DẪN)
   ======================================================== */
interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#150d30] border border-purple-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl text-slate-100 max-h-[88vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-purple-900/40 transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg sm:text-xl font-bold text-cyan-300 mb-3 flex items-center gap-2 font-['Outfit']">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          <span>HƯỚNG DẪN & HỆ THỐNG ĐIỂM</span>
        </h3>

        <div className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="p-2.5 bg-purple-950/40 border border-purple-500/20 rounded-xl">
            <strong className="text-amber-400 block mb-1">1. Hệ thống tính điểm:</strong>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong className="text-emerald-400">Mỗi cặp đúng:</strong> +100 điểm.</li>
              <li><strong className="text-rose-400">Mỗi lần ghép sai:</strong> -10 điểm (điểm không bao giờ âm).</li>
              <li><strong className="text-cyan-400">Thưởng thời gian khi thắng:</strong> +5 điểm cho mỗi giây còn lại trên đồng hồ!</li>
            </ul>
          </div>

          <div className="p-2.5 bg-purple-950/40 border border-purple-500/20 rounded-xl">
            <strong className="text-cyan-400 block mb-1">2. Các cấp độ chơi:</strong>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong className="text-emerald-400">DỄ:</strong> 12 thẻ (6 cặp), thời gian 90 giây.</li>
              <li><strong className="text-cyan-400">TIÊU CHUẨN:</strong> 20 thẻ (10 cặp), thời gian 60 giây.</li>
              <li><strong className="text-rose-400">THỬ THÁCH:</strong> 20 thẻ (10 cặp), thời gian 40 giây.</li>
            </ul>
          </div>

          <div className="p-2.5 bg-purple-950/40 border border-purple-500/20 rounded-xl">
            <strong className="text-fuchsia-400 block mb-1">3. Thao tác lật thẻ:</strong>
            Nhấp thẻ thứ nhất, sau đó nhấp thẻ thứ hai. Thao tác lật thẻ thứ 3 sẽ bị khóa khi đang so sánh.
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-colors"
        >
          ĐÃ HIỂU, ĐÓNG HƯỚNG DẪN
        </button>
      </div>
    </div>
  );
};

/* ========================================================
   7. DEVICE CATALOG MODAL (DANH MỤC 10 THIẾT BỊ)
   ======================================================== */
interface DeviceCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeviceCatalogModal: React.FC<DeviceCatalogModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#140b2f] border border-cyan-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl text-slate-100 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-cyan-300 font-['Outfit']">
              DANH MỤC 10 THIẾT BỊ TIN HỌC
            </h3>
            <p className="text-xs text-purple-300/80">Kiến thức phần cứng môn Tin học THCS & THPT</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-purple-900/40 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto pr-1 my-3 space-y-2">
          {DEVICE_LIST.map((dev, idx) => (
            <div
              key={dev.key}
              className="flex items-start gap-3 p-2.5 bg-slate-900/70 border border-slate-700/60 rounded-xl hover:border-purple-500/40 transition-colors"
            >
              <div className="w-11 h-11 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 border border-slate-600">
                <DeviceIconComponent deviceKey={dev.key} className="w-8 h-8" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-white uppercase font-['Outfit']">
                    {idx + 1}. {dev.name}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/70 text-cyan-300 border border-purple-500/30 shrink-0">
                    {dev.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-snug">{dev.roleDescription}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-sm transition-colors mt-auto"
        >
          QUAY LẠI TRÒ CHƠI
        </button>
      </div>
    </div>
  );
};

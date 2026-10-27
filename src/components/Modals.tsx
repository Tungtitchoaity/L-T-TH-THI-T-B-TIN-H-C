/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, X, Trophy, AlertTriangle, Sparkles, Clock, CheckCircle2, BookOpen } from 'lucide-react';
import { DEVICE_LIST } from '../data/devices';
import { DeviceIconComponent } from './DeviceIcons';

interface StartModalProps {
  isOpen: boolean;
  onStart: () => void;
  onOpenDevices: () => void;
}

export const StartModal: React.FC<StartModalProps> = ({ isOpen, onStart, onOpenDevices }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#1c123d] via-[#130b2c] to-[#0d071e] border-2 border-purple-500/50 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[0_0_50px_rgba(168,85,247,0.3)] text-center text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Glowing badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-400/30 text-cyan-300 text-xs font-mono font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>GIÁO DỤC TIN HỌC THCS & THPT</span>
        </div>

        {/* Main Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500 font-['Outfit'] mb-2">
          KHÁM PHÁ THIẾT BỊ TIN HỌC
        </h2>
        <p className="text-sm sm:text-base text-purple-200/90 mb-5 max-w-md mx-auto">
          Lật hai thẻ mỗi lượt, ghi nhớ vị trí và tìm đủ <strong className="text-cyan-400">10 cặp</strong> trong <strong className="text-pink-400">60 giây</strong>!
        </p>

        {/* Mini Preview of 10 devices */}
        <div className="bg-[#0b081c]/70 border border-purple-500/20 rounded-xl p-3 sm:p-4 mb-6 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">
              Bộ 10 Thiết Bị Cần Ghi Nhớ (20 Thẻ):
            </span>
            <button
              onClick={onOpenDevices}
              className="text-xs text-purple-300 hover:text-white underline flex items-center gap-1"
            >
              <BookOpen className="w-3 h-3" /> Chi tiết
            </button>
          </div>
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {DEVICE_LIST.map((dev) => (
              <div
                key={dev.key}
                className="flex flex-col items-center bg-slate-900/80 border border-slate-700/60 rounded-lg p-1.5 text-center"
              >
                <DeviceIconComponent deviceKey={dev.key} className="w-7 h-7 sm:w-8 sm:h-8 mb-1" />
                <span className="text-[9px] font-semibold text-slate-300 leading-tight truncate w-full">
                  {dev.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick rules banner */}
        <div className="grid grid-cols-3 gap-2 mb-6 text-xs text-slate-300">
          <div className="bg-slate-900/60 border border-purple-500/20 rounded-lg p-2 flex flex-col items-center">
            <span className="text-cyan-400 font-bold text-sm">20 Thẻ</span>
            <span className="text-[11px] text-slate-400">4 Hàng × 5 Cột</span>
          </div>
          <div className="bg-slate-900/60 border border-purple-500/20 rounded-lg p-2 flex flex-col items-center">
            <span className="text-pink-400 font-bold text-sm">60 Giây</span>
            <span className="text-[11px] text-slate-400">Đếm ngược</span>
          </div>
          <div className="bg-slate-900/60 border border-purple-500/20 rounded-lg p-2 flex flex-col items-center">
            <span className="text-emerald-400 font-bold text-sm">10 Cặp</span>
            <span className="text-[11px] text-slate-400">Cùng loại</span>
          </div>
        </div>

        {/* CTA Button: BẮT ĐẦU */}
        <button
          onClick={onStart}
          className="w-full sm:w-auto px-8 sm:px-12 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-600 to-pink-500 hover:from-cyan-400 hover:via-fuchsia-500 hover:to-pink-400 text-white font-extrabold text-base sm:text-lg uppercase tracking-wider shadow-[0_0_25px_rgba(217,70,239,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>BẮT ĐẦU CHƠI</span>
        </button>
      </div>
    </div>
  );
};

interface VictoryModalProps {
  isOpen: boolean;
  timeLeft: number;
  moveCount: number;
  onRestart: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  timeLeft,
  moveCount,
  onRestart,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Trigger festive multi-burst confetti
      const end = Date.now() + 2.5 * 1000;
      const colors = ['#22d3ee', '#e879f9', '#f43f5e', '#34d399', '#facc15'];

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

  const timeUsed = 60 - timeLeft;
  // Calculate rating stars based on speed
  const stars = timeLeft >= 25 ? 3 : timeLeft >= 10 ? 2 : 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#1d1645] via-[#140e33] to-[#0a071c] border-2 border-emerald-400/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(52,211,153,0.3)] text-center text-slate-100">
        {/* Trophy icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(52,211,153,0.4)]">
          <Trophy className="w-9 h-9 sm:w-11 sm:h-11 text-emerald-400 animate-bounce" />
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-2 mb-2 text-2xl text-amber-400">
          {'★'.repeat(stars)}
          {'☆'.repeat(3 - stars)}
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-fuchsia-400 font-['Outfit'] mb-2">
          XUẤT SẮC!
        </h2>
        <p className="text-base sm:text-xl font-black text-cyan-300 mb-6 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">
          BẠN ĐÃ GHÉP ĐỦ 10 CẶP!
        </p>

        {/* Detailed Stats Cards */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-6">
          <div className="bg-[#0b081c]/90 border border-slate-700/80 rounded-xl p-3 flex flex-col items-center shadow-inner">
            <Clock className="w-4 h-4 text-cyan-400 mb-1" />
            <span className="text-[10px] sm:text-xs text-slate-400 font-mono">Thời gian hoàn thành</span>
            <span className="text-base sm:text-lg font-black text-cyan-300 font-mono">{timeUsed}s</span>
          </div>

          <div className="bg-[#0b081c]/90 border border-slate-700/80 rounded-xl p-3 flex flex-col items-center shadow-inner">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mb-1" />
            <span className="text-[10px] sm:text-xs text-slate-400 font-mono">Cặp đã ghép</span>
            <span className="text-base sm:text-lg font-black text-emerald-400 font-mono">10/10</span>
          </div>

          <div className="bg-[#0b081c]/90 border border-slate-700/80 rounded-xl p-3 flex flex-col items-center shadow-inner">
            <RotateCcw className="w-4 h-4 text-fuchsia-400 mb-1" />
            <span className="text-[10px] sm:text-xs text-slate-400 font-mono">Số lượt lật</span>
            <span className="text-base sm:text-lg font-black text-fuchsia-300 font-mono">{moveCount}</span>
          </div>
        </div>

        <p className="text-xs text-purple-200/90 mb-6 font-medium">
          Trí nhớ thị giác và kiến thức thiết bị phần cứng của bạn rất xuất sắc!
        </p>

        {/* Highlighted Replay Button */}
        <button
          onClick={onRestart}
          className="w-full sm:w-auto px-10 sm:px-14 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-base sm:text-lg uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.6)] ring-2 ring-emerald-300/80 active:scale-95 transition-all flex items-center justify-center gap-2.5 mx-auto cursor-pointer animate-pulse"
        >
          <RotateCcw className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          <span>CHƠI LẠI NGAY</span>
        </button>
      </div>
    </div>
  );
};

interface GameOverModalProps {
  isOpen: boolean;
  matchedPairsCount: number;
  moveCount: number;
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  matchedPairsCount,
  moveCount,
  onRestart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#241322] via-[#180a1e] to-[#0d0514] border-2 border-rose-500/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(244,63,94,0.3)] text-center text-slate-100">
        {/* Warning Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(244,63,94,0.4)]">
          <AlertTriangle className="w-9 h-9 sm:w-11 sm:h-11 text-rose-400 animate-pulse" />
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 font-['Outfit'] mb-2">
          HẾT GIỜ! HÃY THỬ LẠI!
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mb-6">
          Thời gian 60 giây đã kết thúc. Bạn đã tìm được{' '}
          <strong className="text-amber-300 font-mono text-lg">{matchedPairsCount}/10</strong> cặp thiết bị.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#0b081c]/80 border border-slate-700/80 rounded-xl p-3 flex flex-col items-center">
            <span className="text-xs text-slate-400 font-mono">Cặp đã ghép</span>
            <span className="text-lg font-black text-rose-400 font-mono">{matchedPairsCount}/10 cặp</span>
          </div>

          <div className="bg-[#0b081c]/80 border border-slate-700/80 rounded-xl p-3 flex flex-col items-center">
            <span className="text-xs text-slate-400 font-mono">Số lượt đã lật</span>
            <span className="text-lg font-black text-amber-300 font-mono">{moveCount} lượt</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-6">
          Mẹo: Quan sát kỹ các góc và nhóm thiết bị theo chức năng để ghi nhớ vị trí nhanh hơn!
        </p>

        {/* Replay Button */}
        <button
          onClick={onRestart}
          className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-black text-base uppercase tracking-wider shadow-[0_0_20px_rgba(244,63,94,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
        >
          <RotateCcw className="w-5 h-5 text-white" />
          <span>CHƠI LẠI</span>
        </button>
      </div>
    </div>
  );
};

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#150d30] border border-purple-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl text-slate-100 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-purple-900/40 transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg sm:text-xl font-bold text-cyan-300 mb-3 flex items-center gap-2 font-['Outfit']">
          <span>📖 HƯỚNG DẪN LUẬT CHƠI</span>
        </h3>

        <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="p-3 bg-purple-950/40 border border-purple-500/20 rounded-xl">
            <strong className="text-cyan-400 block mb-1">1. Mục tiêu:</strong>
            Tìm đủ <span className="text-white font-semibold">10 cặp thiết bị tin học</span> (tổng cộng 20 thẻ) trước khi đồng hồ đếm ngược 60 giây chạm mốc 00:00.
          </div>

          <div className="p-3 bg-purple-950/40 border border-purple-500/20 rounded-xl">
            <strong className="text-fuchsia-400 block mb-1">2. Thao tác lật thẻ:</strong>
            Nhấp hoặc chạm vào một thẻ úp để lật thẻ thứ nhất, sau đó nhấp vào thẻ thứ hai.
          </div>

          <div className="p-3 bg-purple-950/40 border border-purple-500/20 rounded-xl">
            <strong className="text-emerald-400 block mb-1">3. Ghép đúng:</strong>
            Nếu hai thẻ cùng loại thiết bị, cặp thẻ sẽ phát sáng viền xanh lá và biến mất tại vị trí ban đầu (các thẻ khác giữ nguyên vị trí, không xê dịch).
          </div>

          <div className="p-3 bg-purple-950/40 border border-purple-500/20 rounded-xl">
            <strong className="text-rose-400 block mb-1">4. Ghép sai:</strong>
            Hai thẻ sẽ mở trong khoảng 700ms để bạn quan sát ghi nhớ, sau đó tự động úp lại. Trong lúc đó hệ thống tạm khóa thao tác lật thẻ khác.
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-colors"
        >
          ĐÃ HIỂU, ĐÓNG HƯỚNG DẪN
        </button>
      </div>
    </div>
  );
};

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

        <div className="overflow-y-auto pr-1 my-3 space-y-2.5">
          {DEVICE_LIST.map((dev, idx) => (
            <div
              key={dev.key}
              className="flex items-start gap-3 p-3 bg-slate-900/70 border border-slate-700/60 rounded-xl hover:border-purple-500/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 border border-slate-600">
                <DeviceIconComponent deviceKey={dev.key} className="w-9 h-9" />
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

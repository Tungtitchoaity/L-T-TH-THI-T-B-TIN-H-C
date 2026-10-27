/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { DeviceInfo } from '../types';
import { DeviceIconComponent } from './DeviceIcons';

interface KnowledgeModalProps {
  device: DeviceInfo | null;
  onClose: () => void;
}

export const KnowledgeModal: React.FC<KnowledgeModalProps> = ({ device, onClose }) => {
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  if (!device) return null;

  const handleSelectOption = (index: number) => {
    if (hasAnswered) return;
    setSelectedOptionIdx(index);
    setHasAnswered(true);
  };

  const isSelectedCorrect =
    selectedOptionIdx !== null && device.quiz.options[selectedOptionIdx]?.isCorrect;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#1c123d] via-[#120a2c] to-[#0c061d] border-2 border-cyan-400/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_0_50px_rgba(34,211,238,0.25)] text-slate-100 max-h-[92vh] overflow-y-auto">
        {/* Top Header Badge & Close Button */}
        <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-purple-500/20">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-[11px] font-mono font-bold">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>KIẾN THỨC THIẾT BỊ TIN HỌC</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-purple-900/40 transition-colors"
            title="Đóng bảng kiến thức"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Device Identity (Name, English Name, Category & Large Vector Graphic) */}
        <div className="flex items-center gap-3 sm:gap-4 p-3 bg-purple-950/40 border border-purple-500/30 rounded-2xl mb-3.5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-900/90 border border-cyan-400/40 flex items-center justify-center p-1.5 shrink-0 shadow-md">
            <DeviceIconComponent deviceKey={device.key} className="w-full h-full object-contain" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/80 text-cyan-300 border border-purple-500/30">
                {device.category}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black uppercase text-white font-['Outfit'] truncate">
              {device.name}
            </h3>
            <p className="text-xs text-fuchsia-300 font-mono font-medium">
              English: <span className="text-white">{device.englishName}</span>
            </p>
          </div>
        </div>

        {/* Main Function Description (Section 1 & 2) */}
        <div className="bg-[#0b071e]/90 border border-purple-500/20 rounded-xl p-3 mb-3.5 text-left">
          <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider block mb-1">
            📌 Chức năng chính:
          </span>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            {device.roleDescription}
          </p>
        </div>

        {/* =========================================
            CÂU HỎI CỦNG CỐ TRẮC NGHIỆM (Section 4)
           ========================================= */}
        <div className="bg-[#0e0826]/90 border border-cyan-500/30 rounded-xl p-3 sm:p-3.5 mb-4 text-left">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Câu hỏi củng cố:</span>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-white mb-2.5">
            {device.quiz.question}
          </p>

          {/* 3 Interactive Choices */}
          <div className="space-y-1.5">
            {device.quiz.options.map((opt, idx) => {
              const isSelected = selectedOptionIdx === idx;
              let optionStyle =
                'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:border-cyan-400/50 hover:text-white';

              if (hasAnswered) {
                if (opt.isCorrect) {
                  optionStyle =
                    'bg-emerald-950/80 border-emerald-400 text-emerald-200 ring-1 ring-emerald-400/50';
                } else if (isSelected && !opt.isCorrect) {
                  optionStyle =
                    'bg-rose-950/80 border-rose-400 text-rose-200 ring-1 ring-rose-400/50';
                } else {
                  optionStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-2 sm:p-2.5 rounded-lg border text-xs font-medium transition-all flex items-center justify-between ${optionStyle}`}
                >
                  <span>{opt.text}</span>
                  {hasAnswered && opt.isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                  )}
                  {hasAnswered && isSelected && !opt.isCorrect && (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Feedback / Explanation */}
          {hasAnswered && (
            <div
              className={`mt-2.5 p-2 rounded-lg border text-xs ${
                isSelectedCorrect
                  ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/50 border-rose-500/40 text-rose-200'
              }`}
            >
              <span className="font-bold block mb-0.5">
                {isSelectedCorrect ? '✓ Chính xác! Rất xuất sắc!' : '✗ Chưa đúng!'}
              </span>
              <p className="text-[11px] opacity-90 leading-snug">{device.quiz.explanation}</p>
            </div>
          )}
        </div>

        {/* Action Button: Đã hiểu – Tiếp tục */}
        <button
          onClick={onClose}
          className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-fuchsia-600 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-purple-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>ĐÃ HIỂU – TIẾP TỤC TRÒ CHƠI</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

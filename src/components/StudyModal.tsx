/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, BookOpen, CheckCircle2, AlertCircle, ArrowLeft, Sparkles, GraduationCap } from 'lucide-react';
import { DEVICE_LIST } from '../data/devices';
import { DeviceIconComponent } from './DeviceIcons';
import { DeviceKey } from '../types';

interface StudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudyModal: React.FC<StudyModalProps> = ({ isOpen, onClose }) => {
  const [selectedKey, setSelectedKey] = useState<DeviceKey>(DEVICE_LIST[0].key);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});

  if (!isOpen) return null;

  const currentDevice =
    DEVICE_LIST.find((d) => d.key === selectedKey) || DEVICE_LIST[0];

  const handleSelectQuizOption = (optIdx: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [currentDevice.key]: optIdx,
    }));
  };

  const currentAnswerIdx = quizAnswers[currentDevice.key];
  const hasAnswered = currentAnswerIdx !== undefined && currentAnswerIdx !== null;
  const isCorrect =
    hasAnswered && currentDevice.quiz.options[currentAnswerIdx]?.isCorrect;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#180f33] via-[#100824] to-[#080415] border-2 border-purple-500/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_0_60px_rgba(168,85,247,0.3)] text-slate-100 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-500/20 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-900/60 border border-purple-400/40 flex items-center justify-center text-cyan-300">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-400 font-['Outfit']">
                CHẾ ĐỘ ÔN TẬP THIẾT BỊ TIN HỌC
              </h2>
              <p className="text-[11px] text-slate-400">Kiến thức chuẩn môn Tin học THCS & THPT (10 thiết bị phần cứng)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-purple-900/40 transition-colors"
            title="Đóng chế độ ôn tập"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout: Left sidebar (10 devices list) + Right details panel */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-3 my-3">
          {/* Left Device Navigation List */}
          <div className="md:col-span-4 overflow-y-auto space-y-1.5 pr-1 max-h-[160px] md:max-h-full">
            {DEVICE_LIST.map((dev, idx) => {
              const isSelected = dev.key === selectedKey;
              return (
                <button
                  key={dev.key}
                  type="button"
                  onClick={() => setSelectedKey(dev.key)}
                  className={`w-full text-left p-2 rounded-xl border transition-all flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-purple-900/80 border-cyan-400/80 ring-1 ring-cyan-400/50 shadow-md shadow-purple-950/60 text-white'
                      : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:bg-purple-950/40 hover:border-purple-500/40'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800/90 border border-slate-700 flex items-center justify-center shrink-0">
                    <DeviceIconComponent deviceKey={dev.key} className="w-6 h-6 object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-['Outfit'] truncate">
                        {idx + 1}. {dev.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-purple-300/80 font-mono block truncate">
                      {dev.englishName}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Selected Device Detailed View */}
          <div className="md:col-span-8 overflow-y-auto bg-[#0d0720]/80 border border-purple-500/25 rounded-2xl p-3 sm:p-4 flex flex-col justify-between">
            <div>
              {/* Header Card */}
              <div className="flex items-center gap-3 p-3 bg-purple-950/40 border border-purple-500/30 rounded-xl mb-3">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-900 border border-cyan-400/50 flex items-center justify-center p-1.5 shrink-0 shadow-lg">
                  <DeviceIconComponent deviceKey={currentDevice.key} className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/90 text-cyan-300 border border-purple-500/40 inline-block mb-1">
                    {currentDevice.category}
                  </span>
                  <h3 className="text-base sm:text-xl font-black uppercase text-white font-['Outfit'] truncate">
                    {currentDevice.name}
                  </h3>
                  <p className="text-xs text-fuchsia-300 font-mono font-medium">
                    Tên tiếng Anh: <span className="text-white font-bold">{currentDevice.englishName}</span>
                  </p>
                </div>
              </div>

              {/* Functionality */}
              <div className="bg-slate-900/80 border border-purple-500/20 rounded-xl p-3 mb-3 text-left">
                <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold tracking-wider block mb-1">
                  📌 Chức năng chính:
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {currentDevice.roleDescription}
                </p>
              </div>

              {/* Reinforcement Quiz */}
              <div className="bg-[#0e0826]/90 border border-cyan-500/30 rounded-xl p-3 text-left">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 uppercase tracking-wider mb-2">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Câu hỏi củng cố tự luyện:</span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-white mb-2">
                  {currentDevice.quiz.question}
                </p>

                <div className="space-y-1.5">
                  {currentDevice.quiz.options.map((opt, idx) => {
                    const isSelected = currentAnswerIdx === idx;
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
                        onClick={() => handleSelectQuizOption(idx)}
                        className={`w-full text-left p-2 rounded-lg border text-xs font-medium transition-all flex items-center justify-between ${optionStyle}`}
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

                {hasAnswered && (
                  <div
                    className={`mt-2 p-2 rounded-lg border text-xs ${
                      isCorrect
                        ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
                        : 'bg-rose-950/50 border-rose-500/40 text-rose-200'
                    }`}
                  >
                    <span className="font-bold block mb-0.5">
                      {isCorrect ? '✓ Chính xác!' : '✗ Chưa đúng!'}
                    </span>
                    <p className="text-[11px] opacity-90">{currentDevice.quiz.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-purple-500/20 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            Khám phá đủ 10 thiết bị để ghi nhớ tốt nhất khi chơi game
          </span>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors ml-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>QUAY LẠI TRÒ CHƠI</span>
          </button>
        </div>
      </div>
    </div>
  );
};

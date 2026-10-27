/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CardItem } from '../types';
import { DeviceIconComponent } from './DeviceIcons';

interface CardProps {
  card: CardItem;
  onClick: (card: CardItem) => void;
  disabled: boolean;
}

export const Card: React.FC<CardProps> = ({ card, onClick, disabled }) => {
  const isClickable = !card.isFlipped && !card.isMatched && !card.isMatching && !disabled;

  const handleClick = () => {
    if (isClickable) {
      onClick(card);
    }
  };

  // If already matched, render a fixed placeholder slot preserving the exact grid layout
  if (card.isMatched) {
    return (
      <div
        className="w-full aspect-[3/4] rounded-xl sm:rounded-2xl border border-dashed border-cyan-400/20 bg-slate-900/20 flex items-center justify-center p-2 opacity-25 select-none transition-all duration-300 pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-cyan-400/30 flex items-center justify-center text-cyan-300/40 text-xs sm:text-sm font-mono font-bold">
          ✓
        </div>
      </div>
    );
  }

  // Determine dynamic font size for device names to guarantee no clipping or wrapping
  const getDeviceNameStyle = (name: string) => {
    if (name.length > 14) {
      // Long names like "MÁY TÍNH XÁCH TAY", "CHUỘT MÁY TÍNH"
      return 'text-[9px] xs:text-[10px] sm:text-[11px] md:text-xs tracking-tight';
    }
    if (name.length > 9) {
      // Medium names like "THÙNG MÁY TÍNH", "BỘ PHÁT WI-FI"
      return 'text-[10px] xs:text-[11px] sm:text-xs md:text-sm tracking-normal';
    }
    // Short names like "MÀN HÌNH", "BÀN PHÍM", "MÁY IN", "Ổ CỨNG", "USB", "CHIP CPU"
    return 'text-[11px] xs:text-xs sm:text-sm md:text-base tracking-wide';
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={isClickable ? 0 : -1}
      aria-label={card.isFlipped ? card.device.name : 'Thẻ úp - Khám phá thiết bị tin học'}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && isClickable) {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`relative w-full aspect-[3/4] cursor-pointer select-none perspective-1000 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b071e] rounded-xl sm:rounded-2xl transition-all duration-200 ${
        isClickable
          ? 'hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95'
          : ''
      } ${card.isMatching ? 'pointer-events-none' : ''}`}
    >
      {/* 3D Flipping Card Container */}
      <div
        className={`w-full h-full relative transform-style-3d transition-transform duration-300 ease-out ${
          card.isFlipped ? 'rotate-y-180' : ''
        } ${card.isWrong ? 'animate-subtle-shake' : ''} ${
          card.isMatching ? 'animate-match-glow' : ''
        }`}
      >
        {/* =========================================
            CARD BACK (Face Down - Tech Neon Arcade)
           ========================================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl sm:rounded-2xl overflow-hidden border border-purple-400/40 bg-gradient-to-br from-[#221342] via-[#170e30] to-[#0c071b] shadow-md shadow-purple-950/60 flex flex-col items-center justify-between p-2 sm:p-2.5 group-hover:border-purple-300/60 transition-colors">
          {/* Subtle Circuit Grid Texture */}
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, #c084fc 1px, transparent 1px), linear-gradient(to right, #9333ea20 1px, transparent 1px), linear-gradient(to bottom, #9333ea20 1px, transparent 1px)`,
              backgroundSize: '16px 16px, 8px 8px, 8px 8px',
            }}
          />

          {/* Top Tech Micro Header */}
          <div className="w-full flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-purple-300/80 z-10 px-0.5">
            <span className="text-cyan-400 font-bold tracking-wider">IT</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_6px_#e879f9]" />
            </div>
            <span className="text-fuchsia-400 font-bold tracking-wider">60S</span>
          </div>

          {/* Center Stylized Cyber Chip Emblem */}
          <div className="relative my-auto flex flex-col items-center justify-center z-10">
            {/* Outer Hexagon / Shield Frame with Glow */}
            <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-2xl border border-purple-400/40 flex items-center justify-center bg-gradient-to-br from-purple-900/60 via-[#1e113a] to-[#0c081e] shadow-[0_0_15px_rgba(168,85,247,0.35)] group-hover:shadow-[0_0_22px_rgba(56,189,248,0.5)] transition-shadow">
              {/* Custom Cyber Microprocessor Emblem SVG */}
              <svg viewBox="0 0 44 44" className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9" fill="none">
                {/* Circuit Traces */}
                <line x1="22" y1="2" x2="22" y2="10" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="22" y1="34" x2="22" y2="42" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="2" y1="22" x2="10" y2="22" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="34" y1="22" x2="42" y2="22" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />

                {/* Diagonal Traces */}
                <line x1="8" y1="8" x2="13" y2="13" stroke="#e879f9" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="36" y1="8" x2="31" y2="13" stroke="#e879f9" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="8" y1="36" x2="13" y2="31" stroke="#e879f9" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="36" y1="36" x2="31" y2="31" stroke="#e879f9" strokeWidth="1.5" strokeLinecap="round" />

                {/* Central Silicon Die */}
                <rect x="12" y="12" width="20" height="20" rx="4" fill="#3b0764" stroke="#c084fc" strokeWidth="1.8" />
                <rect x="17" y="17" width="10" height="10" rx="2" fill="#22d3ee" />
                <circle cx="22" cy="22" r="2" fill="#ffffff" />
              </svg>
            </div>

            {/* Micro Badge Title */}
            <span className="mt-1 sm:mt-1.5 text-[8px] xs:text-[9px] sm:text-[10px] tracking-widest font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-pink-400 font-['Outfit']">
              TIN HỌC
            </span>
          </div>

          {/* Bottom Circuit Status Bar */}
          <div className="w-full flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-purple-300/60 z-10 px-0.5">
            <span>MEM</span>
            <div className="h-[1px] flex-1 mx-1.5 bg-gradient-to-r from-cyan-400/40 via-fuchsia-400/40 to-transparent" />
            <span className="text-cyan-400/90 font-bold">2026</span>
          </div>
        </div>

        {/* =========================================
            CARD FRONT (Face Up - Crisp High-Contrast)
           ========================================= */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl sm:rounded-2xl overflow-hidden border-2 bg-gradient-to-b from-[#f8fafc] via-[#ffffff] to-[#f1f5f9] shadow-lg flex flex-col items-center justify-between p-2 sm:p-2.5 transition-all duration-300 ${
            card.isMatching
              ? 'border-white ring-4 ring-cyan-300 shadow-[0_0_30px_#22d3ee]'
              : card.isWrong
              ? 'border-rose-400 ring-2 ring-rose-400/60 shadow-[0_0_15px_rgba(244,63,94,0.4)]'
              : 'border-cyan-400/80 shadow-cyan-500/20'
          }`}
        >
          {/* Subtle Grid Backdrop on Front Face */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #0369a1 1px, transparent 1px), linear-gradient(to bottom, #0369a1 1px, transparent 1px)`,
              backgroundSize: '12px 12px',
            }}
          />

          {/* Top Header Strip: Category Pill and Matched Dot */}
          <div className="w-full flex items-center justify-between z-10 px-0.5">
            <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-sky-800 uppercase truncate">
              {card.device.category.split(' ')[0]}
            </span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]" />
            </div>
          </div>

          {/* Main Visual: Unified Vector Illustration (~65% card space) */}
          <div className="my-auto w-full flex-1 max-h-[68%] flex items-center justify-center p-1 relative z-10">
            <div className="w-full h-full max-w-[95%] max-h-[95%] flex items-center justify-center drop-shadow-md">
              <DeviceIconComponent
                deviceKey={card.device.key}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Bottom Device Title: Vietnamese, Centered, High-Contrast */}
          <div className="w-full text-center z-10 bg-slate-900/95 py-1 px-1 sm:px-1.5 rounded-lg border border-slate-700/80 shadow-sm shrink-0">
            <p
              className={`${getDeviceNameStyle(
                card.device.name
              )} font-black text-white leading-tight uppercase font-['Outfit'] truncate`}
              title={card.device.name}
            >
              {card.device.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

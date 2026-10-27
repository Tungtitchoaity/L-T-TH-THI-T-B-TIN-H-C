/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DeviceKey } from '../types';

interface IconProps {
  className?: string;
}

export const MonitorIcon: React.FC<IconProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 110 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Screen Outer Frame */}
    <rect x="8" y="10" width="94" height="60" rx="6" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2.5" />
    {/* Screen Inner Display */}
    <rect x="13" y="15" width="84" height="50" rx="3" fill="url(#monDisplayGrad)" />
    
    {/* Screen Content: Tech dashboard with graphs & code lines */}
    <rect x="20" y="22" width="30" height="4.5" rx="2" fill="#38bdf8" />
    <rect x="20" y="30" width="44" height="3.5" rx="1.5" fill="#c084fc" />
    <rect x="20" y="37" width="34" height="3.5" rx="1.5" fill="#f472b6" />
    
    {/* Vibrant glowing chart curve */}
    <path
      d="M52 54 L62 44 L72 50 L84 36"
      stroke="#4ade80"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="84" cy="36" r="3.5" fill="#4ade80" stroke="#bbf7d0" strokeWidth="1" />
    
    {/* Power LED Indicator */}
    <circle cx="55" cy="66" r="1.5" fill="#38bdf8" />
    
    {/* Stand Column */}
    <path d="M48 70 L46 86 H64 L62 70 Z" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.8" />
    
    {/* Stand Base */}
    <rect x="30" y="86" width="50" height="7" rx="3.5" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
    
    <defs>
      <linearGradient id="monDisplayGrad" x1="13" y1="15" x2="97" y2="65" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0a0f1d" />
        <stop offset="0.6" stopColor="#111827" />
        <stop offset="1" stopColor="#1e1b4b" />
      </linearGradient>
    </defs>
  </svg>
);

export const MouseIcon: React.FC<IconProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 110 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Mouse Body (Ergonomic contoured profile) */}
    <path
      d="M55 8 C34 8 25 25 25 50 C25 75 36 92 55 92 C74 92 85 75 85 50 C85 25 76 8 55 8 Z"
      fill="url(#mouseBodyGrad)"
      stroke="#ec4899"
      strokeWidth="2.8"
    />
    
    {/* Center Division Seam */}
    <path d="M55 8 V45" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round" />
    {/* Horizontal Button Border */}
    <path d="M28 45 C38 48 72 48 82 45" stroke="#f472b6" strokeWidth="1.8" strokeOpacity="0.8" />
    
    {/* Click Wheel Slot & Wheel */}
    <rect x="50" y="19" width="10" height="20" rx="5" fill="#881337" stroke="#f43f5e" strokeWidth="1.8" />
    <rect x="53" y="23" width="4" height="12" rx="2" fill="#38bdf8" />
    
    {/* Side Ergonomic Rubber Grips */}
    <path d="M29 55 C33 63 33 72 31 80" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M81 55 C77 63 77 72 79 80" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
    
    {/* Glowing Gaming Logo / Core */}
    <circle cx="55" cy="68" r="8" fill="#a855f7" opacity="0.85" />
    <polygon points="55,62 61,68 55,74 49,68" fill="#ffffff" />
    
    <defs>
      <linearGradient id="mouseBodyGrad" x1="25" y1="8" x2="85" y2="92" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1e1136" />
        <stop offset="0.5" stopColor="#170d2c" />
        <stop offset="1" stopColor="#0b0819" />
      </linearGradient>
    </defs>
  </svg>
);

export const KeyboardIcon: React.FC<IconProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 110 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Keyboard Main Body Chassis */}
    <rect x="6" y="20" width="98" height="60" rx="8" fill="url(#kbChassisGrad)" stroke="#a855f7" strokeWidth="2.8" />
    
    {/* Row 1 Keys */}
    <rect x="13" y="28" width="10" height="8" rx="2" fill="#3b0764" stroke="#c084fc" strokeWidth="1.2" />
    <rect x="27" y="28" width="10" height="8" rx="2" fill="#3b0764" stroke="#c084fc" strokeWidth="1.2" />
    <rect x="41" y="28" width="10" height="8" rx="2" fill="#3b0764" stroke="#c084fc" strokeWidth="1.2" />
    <rect x="55" y="28" width="10" height="8" rx="2" fill="#3b0764" stroke="#c084fc" strokeWidth="1.2" />
    <rect x="69" y="28" width="10" height="8" rx="2" fill="#3b0764" stroke="#c084fc" strokeWidth="1.2" />
    <rect x="83" y="28" width="14" height="8" rx="2" fill="#f43f5e" stroke="#fda4af" strokeWidth="1.2" />
    
    {/* Row 2 Keys */}
    <rect x="13" y="40" width="13" height="8" rx="2" fill="#3b0764" stroke="#c084fc" strokeWidth="1.2" />
    <rect x="30" y="40" width="10" height="8" rx="2" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.2" />
    <rect x="44" y="40" width="10" height="8" rx="2" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.2" />
    <rect x="58" y="40" width="10" height="8" rx="2" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.2" />
    <rect x="72" y="40" width="10" height="8" rx="2" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.2" />
    <rect x="86" y="40" width="11" height="8" rx="2" fill="#3b0764" stroke="#c084fc" strokeWidth="1.2" />
    
    {/* Row 3 Keys */}
    <rect x="13" y="52" width="15" height="8" rx="2" fill="#3b0764" stroke="#c084fc" strokeWidth="1.2" />
    <rect x="32" y="52" width="10" height="8" rx="2" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.2" />
    <rect x="46" y="52" width="10" height="8" rx="2" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.2" />
    <rect x="60" y="52" width="10" height="8" rx="2" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.2" />
    <rect x="74" y="52" width="23" height="8" rx="2" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.2" />
    
    {/* Row 4 Spacebar & Modifiers */}
    <rect x="13" y="64" width="13" height="8" rx="2" fill="#3b0764" stroke="#c084fc" strokeWidth="1.2" />
    <rect x="30" y="64" width="45" height="8" rx="2" fill="#4338ca" stroke="#a5b4fc" strokeWidth="1.2" />
    <rect x="79" y="64" width="9" height="8" rx="2" fill="#3b0764" stroke="#c084fc" strokeWidth="1.2" />
    <rect x="91" y="64" width="6" height="8" rx="2" fill="#3b0764" stroke="#c084fc" strokeWidth="1.2" />
    
    <defs>
      <linearGradient id="kbChassisGrad" x1="6" y1="20" x2="104" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1a0c2e" />
        <stop offset="1" stopColor="#0c0717" />
      </linearGradient>
    </defs>
  </svg>
);

export const PrinterIcon: React.FC<IconProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 110 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Input Paper Tray (Top Sheet) */}
    <rect x="32" y="8" width="46" height="28" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.8" />
    <line x1="40" y1="16" x2="70" y2="16" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="40" y1="22" x2="62" y2="22" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />
    
    {/* Printer Body */}
    <rect x="12" y="32" width="86" height="38" rx="7" fill="url(#printerChassisGrad)" stroke="#06b6d4" strokeWidth="2.8" />
    
    {/* Paper Output Slot */}
    <rect x="22" y="54" width="66" height="9" rx="2.5" fill="#082f49" stroke="#0284c7" strokeWidth="1.5" />
    
    {/* Ejected Printed Sheet sliding out */}
    <rect x="26" y="58" width="58" height="34" rx="3" fill="#ffffff" stroke="#38bdf8" strokeWidth="1.8" />
    
    {/* Content on Printed Sheet */}
    <rect x="33" y="65" width="28" height="3.5" rx="1.2" fill="#0284c7" />
    <rect x="33" y="72" width="44" height="3" rx="1" fill="#ec4899" />
    <rect x="33" y="78" width="34" height="3" rx="1" fill="#a855f7" />
    {/* Mini colorful bars on sheet */}
    <rect x="33" y="84" width="12" height="3.5" rx="1" fill="#22c55e" />
    <rect x="48" y="84" width="16" height="3.5" rx="1" fill="#f59e0b" />
    
    {/* Control Panel Buttons & Status Lights */}
    <circle cx="85" cy="42" r="3.2" fill="#22c55e" />
    <circle cx="76" cy="42" r="3.2" fill="#38bdf8" />
    <rect x="22" y="39" width="18" height="7" rx="2" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.2" />
    
    <defs>
      <linearGradient id="printerChassisGrad" x1="12" y1="32" x2="98" y2="70" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1e293b" />
        <stop offset="1" stopColor="#0a121e" />
      </linearGradient>
    </defs>
  </svg>
);

export const LaptopIcon: React.FC<IconProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 110 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Screen Upper Lid */}
    <rect x="21" y="10" width="68" height="48" rx="5" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2.8" />
    {/* Screen Display Glass */}
    <rect x="26" y="15" width="58" height="38" rx="2.5" fill="url(#laptopScreenG)" />
    
    {/* Webcam Dot */}
    <circle cx="55" cy="12.5" r="1.4" fill="#c4b5fd" />
    
    {/* Screen IDE Window Content */}
    <rect x="31" y="21" width="22" height="4" rx="1.5" fill="#a855f7" />
    <rect x="31" y="28" width="36" height="3.5" rx="1.5" fill="#38bdf8" />
    <rect x="31" y="35" width="26" height="3.5" rx="1.5" fill="#ec4899" />
    <rect x="31" y="42" width="44" height="3.5" rx="1.5" fill="#4ade80" />
    
    {/* Keyboard Deck Plate (Perspective bottom) */}
    <path d="M10 68 L21 58 H89 L100 68 L104 84 H6 L10 68 Z" fill="url(#laptopDeckG)" stroke="#8b5cf6" strokeWidth="2.2" />
    {/* Keyboard Keys Bed */}
    <rect x="24" y="62" width="62" height="9" rx="2" fill="#312e81" stroke="#a78bfa" strokeWidth="1.2" />
    {/* Trackpad */}
    <rect x="45" y="73" width="20" height="7" rx="1.5" fill="#1e1b4b" stroke="#c4b5fd" strokeWidth="1.2" />
    {/* Opening Thumb Notch */}
    <rect x="48" y="82" width="14" height="2" rx="1" fill="#a78bfa" />
    
    <defs>
      <linearGradient id="laptopScreenG" x1="26" y1="15" x2="84" y2="53" gradientUnits="userSpaceOnUse">
        <stop stopColor="#080816" />
        <stop offset="1" stopColor="#190e2d" />
      </linearGradient>
      <linearGradient id="laptopDeckG" x1="6" y1="58" x2="104" y2="84" gradientUnits="userSpaceOnUse">
        <stop stopColor="#334155" />
        <stop offset="1" stopColor="#0f172a" />
      </linearGradient>
    </defs>
  </svg>
);

export const PcCaseIcon: React.FC<IconProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 110 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Tower Case Outer Frame */}
    <rect x="28" y="7" width="54" height="84" rx="7" fill="url(#pcCaseG)" stroke="#06b6d4" strokeWidth="2.8" />
    
    {/* Case Supporting Feet */}
    <rect x="31" y="91" width="12" height="4.5" rx="2" fill="#0891b2" />
    <rect x="67" y="91" width="12" height="4.5" rx="2" fill="#0891b2" />
    
    {/* Front Top Control Header */}
    <rect x="33" y="11" width="44" height="13" rx="3" fill="#082f49" />
    {/* Power Button */}
    <circle cx="40" cy="17.5" r="3.2" fill="#22d3ee" />
    <circle cx="40" cy="17.5" r="1.6" fill="#ffffff" />
    {/* Front USB Ports */}
    <rect x="48" y="15.5" width="7" height="4" rx="1" fill="#38bdf8" />
    <rect x="58" y="15.5" width="7" height="4" rx="1" fill="#38bdf8" />
    <circle cx="70" cy="17.5" r="2" fill="#f43f5e" />
    
    {/* Tempered Glass Window View */}
    <rect x="33" y="27" width="44" height="46" rx="3" fill="#020617" stroke="#22d3ee" strokeWidth="1.6" strokeDasharray="4 2" />
    
    {/* RGB Liquid Cooler Fan */}
    <circle cx="55" cy="41" r="10.5" stroke="#ec4899" strokeWidth="2.2" fill="#380725" opacity="0.9" />
    <circle cx="55" cy="41" r="3.5" fill="#ec4899" />
    
    {/* Dedicated Graphics Card (GPU) with RGB strip */}
    <rect x="37" y="56" width="36" height="11" rx="2" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1.6" />
    <line x1="41" y1="61.5" x2="69" y2="61.5" stroke="#38bdf8" strokeWidth="1.8" />
    
    {/* Bottom PSU Shroud & Air Intake Grille */}
    <rect x="33" y="75" width="44" height="12" rx="2" fill="#0f172a" />
    <line x1="38" y1="81" x2="72" y2="81" stroke="#06b6d4" strokeWidth="1.8" strokeDasharray="2 3" />
    
    <defs>
      <linearGradient id="pcCaseG" x1="28" y1="7" x2="82" y2="91" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1e293b" />
        <stop offset="1" stopColor="#080e1a" />
      </linearGradient>
    </defs>
  </svg>
);

export const HardDriveIcon: React.FC<IconProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 110 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Drive Outer Metallic Casing */}
    <rect x="20" y="9" width="70" height="82" rx="7" fill="url(#hddCasingG)" stroke="#3b82f6" strokeWidth="2.8" />
    
    {/* Top Label Banner */}
    <rect x="26" y="15" width="58" height="24" rx="3.5" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.8" />
    <text x="55" y="28" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
      SSD / HDD
    </text>
    <rect x="32" y="32" width="46" height="2.2" rx="1" fill="#38bdf8" />
    
    {/* Round Magnetic Platter Window */}
    <circle cx="55" cy="62" r="19" fill="#0f172a" stroke="#60a5fa" strokeWidth="2.2" />
    <circle cx="55" cy="62" r="11" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.6" />
    <circle cx="55" cy="62" r="4.2" fill="#93c5fd" />
    
    {/* Read/Write Actuator Arm */}
    <path d="M40 47 L53 60 L49 63 Z" fill="#f43f5e" />
    <circle cx="40" cy="47" r="3.5" fill="#f87171" stroke="#ffffff" strokeWidth="1" />
    
    {/* SATA Connector Gold Pins at Bottom */}
    <rect x="30" y="87" width="24" height="4.5" fill="#f59e0b" rx="1" />
    <rect x="58" y="87" width="18" height="4.5" fill="#f59e0b" rx="1" />
    
    <defs>
      <linearGradient id="hddCasingG" x1="20" y1="9" x2="90" y2="91" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1e293b" />
        <stop offset="1" stopColor="#0c1322" />
      </linearGradient>
    </defs>
  </svg>
);

export const UsbIcon: React.FC<IconProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 110 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* USB Flash Drive Main Casing */}
    <rect x="34" y="35" width="42" height="54" rx="9" fill="url(#usbBodyG)" stroke="#10b981" strokeWidth="2.8" />
    
    {/* USB Type-A Metallic Plug */}
    <rect x="39" y="9" width="32" height="26" rx="2.5" fill="#94a3b8" stroke="#34d399" strokeWidth="2.2" />
    {/* Dual Square Holes */}
    <rect x="44" y="16" width="8" height="7" rx="1.2" fill="#1e293b" />
    <rect x="58" y="16" width="8" height="7" rx="1.2" fill="#1e293b" />
    {/* Gold Pins Inside */}
    <line x1="48" y1="18" x2="48" y2="22" stroke="#f59e0b" strokeWidth="1.2" />
    <line x1="62" y1="18" x2="62" y2="22" stroke="#f59e0b" strokeWidth="1.2" />
    
    {/* Grip Ridge Lines */}
    <line x1="42" y1="50" x2="68" y2="50" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="42" y1="57" x2="68" y2="57" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" />
    
    {/* LED Indicator Light */}
    <circle cx="55" cy="71" r="4" fill="#34d399" />
    <circle cx="55" cy="71" r="1.8" fill="#ffffff" />
    
    {/* Lanyard Hole at Bottom */}
    <rect x="47" y="80" width="16" height="5" rx="2.5" fill="#064e3b" stroke="#34d399" strokeWidth="1.2" />
    
    <defs>
      <linearGradient id="usbBodyG" x1="34" y1="35" x2="76" y2="89" gradientUnits="userSpaceOnUse">
        <stop stopColor="#065f46" />
        <stop offset="1" stopColor="#022c22" />
      </linearGradient>
    </defs>
  </svg>
);

export const WifiRouterIcon: React.FC<IconProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 110 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Antennas */}
    {/* Left Antenna */}
    <line x1="28" y1="50" x2="16" y2="15" stroke="#38bdf8" strokeWidth="3.8" strokeLinecap="round" />
    <circle cx="16" cy="15" r="3.2" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.8" />
    {/* Right Antenna */}
    <line x1="82" y1="50" x2="94" y2="15" stroke="#38bdf8" strokeWidth="3.8" strokeLinecap="round" />
    <circle cx="94" cy="15" r="3.2" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.8" />
    {/* Center Antenna */}
    <line x1="55" y1="50" x2="55" y2="12" stroke="#38bdf8" strokeWidth="3.2" strokeLinecap="round" />
    <circle cx="55" cy="12" r="3" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.8" />
    
    {/* Broadcast Radio Waves */}
    <path d="M42 25 A18 18 0 0 1 68 25" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.95" />
    <path d="M47 31 A11 11 0 0 1 63 31" stroke="#22d3ee" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.85" />
    <path d="M51 37 A5 5 0 0 1 59 37" stroke="#67e8f9" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.95" />
    
    {/* Router Body */}
    <path
      d="M16 56 C16 49 23 45 35 45 H75 C87 45 94 49 94 56 L89 80 C89 85 82 87 74 87 H36 C28 87 21 85 21 80 Z"
      fill="url(#routerChassisG)"
      stroke="#0284c7"
      strokeWidth="2.8"
    />
    
    {/* Status Indicators Front Bar */}
    <rect x="28" y="66" width="54" height="9" rx="3.5" fill="#082f49" stroke="#0ea5e9" strokeWidth="1.2" />
    <circle cx="36" cy="70.5" r="2.2" fill="#22c55e" />
    <circle cx="45" cy="70.5" r="2.2" fill="#22c55e" />
    <circle cx="55" cy="70.5" r="2.2" fill="#38bdf8" />
    <circle cx="65" cy="70.5" r="2.2" fill="#38bdf8" />
    <circle cx="74" cy="70.5" r="2.2" fill="#22c55e" />
    
    <defs>
      <linearGradient id="routerChassisG" x1="16" y1="45" x2="94" y2="87" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1e293b" />
        <stop offset="1" stopColor="#0c1322" />
      </linearGradient>
    </defs>
  </svg>
);

export const CpuChipIcon: React.FC<IconProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 110 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Perimeter Gold Contact Pins */}
    {/* Top Pins */}
    <rect x="31" y="7" width="5.5" height="10" fill="#f59e0b" rx="1.2" />
    <rect x="43" y="7" width="5.5" height="10" fill="#f59e0b" rx="1.2" />
    <rect x="55" y="7" width="5.5" height="10" fill="#f59e0b" rx="1.2" />
    <rect x="66" y="7" width="5.5" height="10" fill="#f59e0b" rx="1.2" />
    <rect x="78" y="7" width="5.5" height="10" fill="#f59e0b" rx="1.2" />
    {/* Bottom Pins */}
    <rect x="31" y="83" width="5.5" height="10" fill="#f59e0b" rx="1.2" />
    <rect x="43" y="83" width="5.5" height="10" fill="#f59e0b" rx="1.2" />
    <rect x="55" y="83" width="5.5" height="10" fill="#f59e0b" rx="1.2" />
    <rect x="66" y="83" width="5.5" height="10" fill="#f59e0b" rx="1.2" />
    <rect x="78" y="83" width="5.5" height="10" fill="#f59e0b" rx="1.2" />
    {/* Left Pins */}
    <rect x="13" y="25" width="10" height="5.5" fill="#f59e0b" rx="1.2" />
    <rect x="13" y="37" width="10" height="5.5" fill="#f59e0b" rx="1.2" />
    <rect x="13" y="49" width="10" height="5.5" fill="#f59e0b" rx="1.2" />
    <rect x="13" y="60" width="10" height="5.5" fill="#f59e0b" rx="1.2" />
    <rect x="13" y="72" width="10" height="5.5" fill="#f59e0b" rx="1.2" />
    {/* Right Pins */}
    <rect x="87" y="25" width="10" height="5.5" fill="#f59e0b" rx="1.2" />
    <rect x="87" y="37" width="10" height="5.5" fill="#f59e0b" rx="1.2" />
    <rect x="87" y="49" width="10" height="5.5" fill="#f59e0b" rx="1.2" />
    <rect x="87" y="60" width="10" height="5.5" fill="#f59e0b" rx="1.2" />
    <rect x="87" y="72" width="10" height="5.5" fill="#f59e0b" rx="1.2" />
    
    {/* Substrate Dark Green/Cyber Board */}
    <rect x="21" y="15" width="68" height="70" rx="7" fill="#042f2e" stroke="#10b981" strokeWidth="2.8" />
    
    {/* Pin 1 Gold Index Triangle */}
    <polygon points="25,19 32,19 25,26" fill="#f59e0b" />
    
    {/* Integrated Heat Spreader (IHS) Metallic Center */}
    <rect x="32" y="26" width="46" height="48" rx="4.5" fill="url(#cpuHeatSpreaderG)" stroke="#cbd5e1" strokeWidth="2.2" />
    
    {/* Laser Engraved Markings */}
    <text x="55" y="46" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="900" fontFamily="sans-serif">
      CPU
    </text>
    <text x="55" y="58" textAnchor="middle" fill="#334155" fontSize="7" fontWeight="bold" fontFamily="monospace">
      8-CORE
    </text>
    <rect x="40" y="63" width="30" height="2.5" fill="#059669" rx="1" />
    
    <defs>
      <linearGradient id="cpuHeatSpreaderG" x1="32" y1="26" x2="78" y2="74" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f8fafc" />
        <stop offset="0.5" stopColor="#cbd5e1" />
        <stop offset="1" stopColor="#94a3b8" />
      </linearGradient>
    </defs>
  </svg>
);

export const DeviceIconComponent: React.FC<{ deviceKey: DeviceKey; className?: string }> = ({
  deviceKey,
  className,
}) => {
  switch (deviceKey) {
    case 'monitor':
      return <MonitorIcon className={className} />;
    case 'mouse':
      return <MouseIcon className={className} />;
    case 'keyboard':
      return <KeyboardIcon className={className} />;
    case 'printer':
      return <PrinterIcon className={className} />;
    case 'laptop':
      return <LaptopIcon className={className} />;
    case 'pc_case':
      return <PcCaseIcon className={className} />;
    case 'hard_drive':
      return <HardDriveIcon className={className} />;
    case 'usb':
      return <UsbIcon className={className} />;
    case 'wifi_router':
      return <WifiRouterIcon className={className} />;
    case 'cpu_chip':
      return <CpuChipIcon className={className} />;
    default:
      return null;
  }
};

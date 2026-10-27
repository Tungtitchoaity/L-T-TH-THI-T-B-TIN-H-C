/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DifficultyConfig, DifficultyLevel } from '../types';

export const DIFFICULTY_CONFIGS: Record<DifficultyLevel, DifficultyConfig> = {
  EASY: {
    key: 'EASY',
    name: 'DỄ',
    cardCount: 12,
    pairCount: 6,
    timeSeconds: 90,
    gridColsClass: 'grid-cols-3 sm:grid-cols-4 max-w-3xl',
    description: '12 thẻ · 6 cặp ngẫu nhiên · 90 giây',
    badgeColor: 'border-emerald-500/50 bg-emerald-950/60 text-emerald-300',
  },
  STANDARD: {
    key: 'STANDARD',
    name: 'TIÊU CHUẨN',
    cardCount: 20,
    pairCount: 10,
    timeSeconds: 60,
    gridColsClass: 'grid-cols-4 sm:grid-cols-5 max-w-5xl',
    description: '20 thẻ · Đủ 10 cặp thiết bị · 60 giây',
    badgeColor: 'border-cyan-500/50 bg-cyan-950/60 text-cyan-300',
  },
  CHALLENGE: {
    key: 'CHALLENGE',
    name: 'THỬ THÁCH',
    cardCount: 20,
    pairCount: 10,
    timeSeconds: 40,
    gridColsClass: 'grid-cols-4 sm:grid-cols-5 max-w-5xl',
    description: '20 thẻ · Đủ 10 cặp thiết bị · 40 giây tốc độ cao',
    badgeColor: 'border-rose-500/50 bg-rose-950/60 text-rose-300',
  },
};

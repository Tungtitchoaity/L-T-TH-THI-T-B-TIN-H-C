/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DeviceKey =
  | 'monitor'
  | 'mouse'
  | 'keyboard'
  | 'printer'
  | 'laptop'
  | 'pc_case'
  | 'hard_drive'
  | 'usb'
  | 'wifi_router'
  | 'cpu_chip';

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
  explanation: string;
}

export interface DeviceInfo {
  key: DeviceKey;
  name: string;
  englishName: string;
  shortDesc: string;
  category: 'Thiết bị vào (Input)' | 'Thiết bị ra (Output)' | 'Bộ xử lý (Processing)' | 'Bộ nhớ & Lưu trữ (Storage)' | 'Thiết bị mạng (Network)';
  roleDescription: string;
  quiz: QuizQuestion;
}

export interface CardItem {
  id: string; // Unique card instance id, e.g. "monitor-card-A", "monitor-card-B"
  pairId: DeviceKey; // Identifier to check matching
  device: DeviceInfo;
  isFlipped: boolean;
  isMatched: boolean;
  isMatching?: boolean; // Short radiant flash & shrink phase before vanishing
  isWrong: boolean;
}

export type GameState = 'READY' | 'PLAYING' | 'PAUSED' | 'WON' | 'LOST';

export type DifficultyLevel = 'EASY' | 'STANDARD' | 'CHALLENGE';

export interface DifficultyConfig {
  key: DifficultyLevel;
  name: string;
  cardCount: number;
  pairCount: number;
  timeSeconds: number;
  gridColsClass: string;
  description: string;
  badgeColor: string;
}

export interface PlayerInfo {
  name: string;
  className?: string;
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  playerClass?: string;
  difficulty: DifficultyLevel;
  score: number;
  matchedPairs: number;
  totalPairs: number;
  movesCount: number;
  timeUsedSeconds: number;
  timeLeftSeconds: number;
  isWin: boolean;
  createdAt: string; // ISO string
}

export interface DifficultyStats {
  gamesPlayed: number;
  gamesWon: number;
  bestTimeSeconds: number | null;
  leastMoves: number | null;
  highScore: number | null;
}

export interface GameStats {
  byDifficulty: Record<DifficultyLevel, DifficultyStats>;
  totalPlayed: number;
  totalWon: number;
}

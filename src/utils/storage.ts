/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DifficultyLevel, DifficultyStats, GameStats, LeaderboardEntry } from '../types';

const STATS_KEY = 'lat_the_tin_hoc_stats_v3';
const LEADERBOARD_KEY = 'lat_the_tin_hoc_leaderboard_v1';
const MAX_LEADERBOARD_ENTRIES = 100;

const createDefaultDiffStats = (): DifficultyStats => ({
  gamesPlayed: 0,
  gamesWon: 0,
  bestTimeSeconds: null,
  leastMoves: null,
  highScore: null,
});

const defaultStats: GameStats = {
  byDifficulty: {
    EASY: createDefaultDiffStats(),
    STANDARD: createDefaultDiffStats(),
    CHALLENGE: createDefaultDiffStats(),
  },
  totalPlayed: 0,
  totalWon: 0,
};

export const StatsStorage = {
  getStats: (): GameStats => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return defaultStats;
      }
      const data = window.localStorage.getItem(STATS_KEY);
      if (!data) return defaultStats;
      const parsed = JSON.parse(data);

      const byDiff: Record<DifficultyLevel, DifficultyStats> = {
        EASY: parsed.byDifficulty?.EASY || createDefaultDiffStats(),
        STANDARD: parsed.byDifficulty?.STANDARD || createDefaultDiffStats(),
        CHALLENGE: parsed.byDifficulty?.CHALLENGE || createDefaultDiffStats(),
      };

      const totalPlayed =
        (byDiff.EASY.gamesPlayed || 0) +
        (byDiff.STANDARD.gamesPlayed || 0) +
        (byDiff.CHALLENGE.gamesPlayed || 0);

      const totalWon =
        (byDiff.EASY.gamesWon || 0) +
        (byDiff.STANDARD.gamesWon || 0) +
        (byDiff.CHALLENGE.gamesWon || 0);

      return {
        byDifficulty: byDiff,
        totalPlayed,
        totalWon,
      };
    } catch {
      return defaultStats;
    }
  },

  recordGame: (
    difficulty: DifficultyLevel,
    won: boolean,
    timeUsedSeconds: number,
    moves: number,
    score: number
  ): GameStats => {
    try {
      const current = StatsStorage.getStats();
      const currentDiff = current.byDifficulty[difficulty] || createDefaultDiffStats();

      const diffPlayed = currentDiff.gamesPlayed + 1;
      const diffWon = won ? currentDiff.gamesWon + 1 : currentDiff.gamesWon;

      let bestTime = currentDiff.bestTimeSeconds;
      let leastMoves = currentDiff.leastMoves;
      let highScore = currentDiff.highScore;

      if (won) {
        if (bestTime === null || timeUsedSeconds < bestTime) {
          bestTime = timeUsedSeconds;
        }
        if (leastMoves === null || moves < leastMoves) {
          leastMoves = moves;
        }
      }

      if (highScore === null || score > highScore) {
        highScore = score;
      }

      const updatedDiff: DifficultyStats = {
        gamesPlayed: diffPlayed,
        gamesWon: diffWon,
        bestTimeSeconds: bestTime,
        leastMoves,
        highScore,
      };

      const updated: GameStats = {
        byDifficulty: {
          ...current.byDifficulty,
          [difficulty]: updatedDiff,
        },
        totalPlayed: current.totalPlayed + 1,
        totalWon: won ? current.totalWon + 1 : current.totalWon,
      };

      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STATS_KEY, JSON.stringify(updated));
      }

      return updated;
    } catch {
      return defaultStats;
    }
  },

  clearStats: (): GameStats => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(STATS_KEY);
      }
    } catch {
      // ignore
    }
    return defaultStats;
  },
};

/* ========================================================
   LEADERBOARD STORAGE (P05 Requirement 4 & 5)
   ======================================================== */
export const LeaderboardStorage = {
  getEntries: (): LeaderboardEntry[] => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return [];
      }
      const raw = window.localStorage.getItem(LEADERBOARD_KEY);
      if (!raw) return [];
      const parsed: LeaderboardEntry[] = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];

      // Sort by:
      // 1. Score descending
      // 2. If equal score: timeUsed ascending (faster is better)
      // 3. If equal time: earlier createdAt first
      return parsed.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        if (a.timeUsedSeconds !== b.timeUsedSeconds) {
          return a.timeUsedSeconds - b.timeUsedSeconds;
        }
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
    } catch {
      return [];
    }
  },

  saveEntry: (
    entryData: Omit<LeaderboardEntry, 'id' | 'createdAt'>
  ): LeaderboardEntry => {
    const newEntry: LeaderboardEntry = {
      ...entryData,
      id: `score-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = LeaderboardStorage.getEntries();
      const updated = [newEntry, ...existing];

      // Limit to 100 most recent/top records
      const limited = updated.slice(0, MAX_LEADERBOARD_ENTRIES);

      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(limited));
      }
    } catch {
      // Storage unavailable fallback
    }

    return newEntry;
  },

  clearAll: (): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(LEADERBOARD_KEY);
      }
    } catch {
      // ignore
    }
  },
};

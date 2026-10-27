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

export interface DeviceInfo {
  key: DeviceKey;
  name: string;
  shortDesc: string;
  category: 'Thiết bị vào (Input)' | 'Thiết bị ra (Output)' | 'Bộ xử lý (Processing)' | 'Bộ nhớ & Lưu trữ (Storage)' | 'Thiết bị mạng (Network)';
  roleDescription: string;
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

export type GameState = 'READY' | 'PLAYING' | 'WON' | 'LOST';

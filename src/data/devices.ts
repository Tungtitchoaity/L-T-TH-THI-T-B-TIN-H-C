/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DeviceInfo, DeviceKey } from '../types';

export const COMPUTER_DEVICES: Record<DeviceKey, DeviceInfo> = {
  monitor: {
    key: 'monitor',
    name: 'MÀN HÌNH',
    shortDesc: 'Màn hình máy tính phẳng, có chân đế',
    category: 'Thiết bị ra (Output)',
    roleDescription: 'Hiển thị dữ liệu hình ảnh, video và giao diện làm việc của máy tính cho người dùng quan sát.',
  },
  mouse: {
    key: 'mouse',
    name: 'CHUỘT MÁY TÍNH',
    shortDesc: 'Chuột máy tính có nút bấm và con lăn',
    category: 'Thiết bị vào (Input)',
    roleDescription: 'Thiết bị trỏ điều khiển con trỏ trên màn hình, thực hiện thao tác chọn, kéo thả và cuộn trang.',
  },
  keyboard: {
    key: 'keyboard',
    name: 'BÀN PHÍM',
    shortDesc: 'Bàn phím máy tính có nhiều phím',
    category: 'Thiết bị vào (Input)',
    roleDescription: 'Nhập ký tự văn bản, số, ký hiệu và các lệnh điều khiển vào hệ thống máy tính.',
  },
  printer: {
    key: 'printer',
    name: 'MÁY IN',
    shortDesc: 'Máy in đang xuất một tờ giấy',
    category: 'Thiết bị ra (Output)',
    roleDescription: 'Chuyển dữ liệu tài liệu, hình ảnh số thành bản in thực tế trên các chất liệu giấy.',
  },
  laptop: {
    key: 'laptop',
    name: 'MÁY TÍNH XÁCH TAY',
    shortDesc: 'Laptop mở nắp, nhìn rõ màn hình và bàn phím',
    category: 'Bộ xử lý (Processing)',
    roleDescription: 'Hệ thống máy tính di động tích hợp toàn bộ màn hình, bàn phím, pin và phần cứng bên trong.',
  },
  pc_case: {
    key: 'pc_case',
    name: 'THÙNG MÁY TÍNH',
    shortDesc: 'Case máy tính để bàn dạng khối đứng',
    category: 'Bộ xử lý (Processing)',
    roleDescription: 'Khung bảo vệ và lắp đặt các linh kiện quan trọng như bo mạch chủ, nguồn, ổ cứng và tản nhiệt.',
  },
  hard_drive: {
    key: 'hard_drive',
    name: 'Ổ CỨNG',
    shortDesc: 'Thiết bị lưu trữ dữ liệu HDD / SSD',
    category: 'Bộ nhớ & Lưu trữ (Storage)',
    roleDescription: 'Lưu trữ dài hạn hệ điều hành, phần mềm ứng dụng và toàn bộ dữ liệu người dùng không bị mất khi tắt máy.',
  },
  usb: {
    key: 'usb',
    name: 'USB',
    shortDesc: 'USB flash drive nhỏ gọn tiện lợi',
    category: 'Bộ nhớ & Lưu trữ (Storage)',
    roleDescription: 'Bộ nhớ ngoài cắm cổng USB, kích thước nhỏ gọn dùng để sao lưu và di chuyển dữ liệu giữa các máy tính.',
  },
  wifi_router: {
    key: 'wifi_router',
    name: 'BỘ PHÁT WI-FI',
    shortDesc: 'Router có ăng-ten và phát sóng vô tuyến',
    category: 'Thiết bị mạng (Network)',
    roleDescription: 'Định tuyến gói tin và phát tín hiệu mạng không dây cho các thiết bị kết nối vào Internet.',
  },
  cpu_chip: {
    key: 'cpu_chip',
    name: 'CHIP CPU',
    shortDesc: 'Vi xử lý vuông có chân tiếp xúc xung quanh',
    category: 'Bộ xử lý (Processing)',
    roleDescription: 'Bộ não của máy tính (Central Processing Unit), thực hiện các phép tính logic và điều phối mọi hoạt động phần cứng.',
  },
};

export const DEVICE_LIST: DeviceInfo[] = Object.values(COMPUTER_DEVICES);

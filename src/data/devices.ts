/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DeviceInfo, DeviceKey } from '../types';

export const COMPUTER_DEVICES: Record<DeviceKey, DeviceInfo> = {
  monitor: {
    key: 'monitor',
    name: 'MÀN HÌNH',
    englishName: 'Monitor',
    shortDesc: 'Màn hình máy tính phẳng, có chân đế',
    category: 'Thiết bị ra (Output)',
    roleDescription: 'Hiển thị văn bản, hình ảnh và thông tin từ máy tính cho người dùng quan sát.',
    quiz: {
      question: 'Thiết bị nào giúp chúng ta nhìn thấy thông tin được máy tính hiển thị?',
      options: [
        { text: 'Màn hình (Monitor)', isCorrect: true },
        { text: 'Bàn phím (Keyboard)', isCorrect: false },
        { text: 'Máy in (Printer)', isCorrect: false },
      ],
      explanation: 'Màn hình (Monitor) là thiết bị xuất chính, hiển thị trực quan dữ liệu và giao diện đồ họa.',
    },
  },
  mouse: {
    key: 'mouse',
    name: 'CHUỘT MÁY TÍNH',
    englishName: 'Mouse',
    shortDesc: 'Chuột máy tính có nút bấm và con lăn',
    category: 'Thiết bị vào (Input)',
    roleDescription: 'Giúp di chuyển con trỏ, chọn và thao tác với các đối tượng trên màn hình.',
    quiz: {
      question: 'Thiết bị nào thường dùng để nhấp chọn biểu tượng?',
      options: [
        { text: 'Chuột (Mouse)', isCorrect: true },
        { text: 'Bàn phím (Keyboard)', isCorrect: false },
        { text: 'Ổ lưu trữ (HDD/SSD)', isCorrect: false },
      ],
      explanation: 'Chuột (Mouse) là thiết bị trỏ cho phép di chuyển con trỏ và nhấp chọn các đối tượng trên màn hình.',
    },
  },
  keyboard: {
    key: 'keyboard',
    name: 'BÀN PHÍM',
    englishName: 'Keyboard',
    shortDesc: 'Bàn phím máy tính có nhiều phím',
    category: 'Thiết bị vào (Input)',
    roleDescription: 'Dùng để nhập chữ, số và các lệnh bằng phím vào máy tính.',
    quiz: {
      question: 'Thiết bị nào thường dùng để nhập văn bản?',
      options: [
        { text: 'Bàn phím (Keyboard)', isCorrect: true },
        { text: 'Chuột (Mouse)', isCorrect: false },
        { text: 'Bộ định tuyến Wi-Fi (Router)', isCorrect: false },
      ],
      explanation: 'Bàn phím (Keyboard) chứa các phím ký tự, số và phím chức năng dùng để soạn thảo văn bản.',
    },
  },
  printer: {
    key: 'printer',
    name: 'MÁY IN',
    englishName: 'Printer',
    shortDesc: 'Máy in đang xuất một tờ giấy',
    category: 'Thiết bị ra (Output)',
    roleDescription: 'In văn bản và hình ảnh lên giấy hoặc vật liệu phù hợp từ dữ liệu số.',
    quiz: {
      question: 'Thiết bị nào giúp in bài làm ra giấy?',
      options: [
        { text: 'Máy in (Printer)', isCorrect: true },
        { text: 'Màn hình (Monitor)', isCorrect: false },
        { text: 'Bộ xử lý (CPU)', isCorrect: false },
      ],
      explanation: 'Máy in (Printer) là thiết bị xuất vật lý chuyển dữ liệu kỹ thuật số thành bản in trên giấy.',
    },
  },
  laptop: {
    key: 'laptop',
    name: 'MÁY TÍNH XÁCH TAY',
    englishName: 'Laptop',
    shortDesc: 'Laptop mở nắp, nhìn rõ màn hình và bàn phím',
    category: 'Bộ xử lý (Processing)',
    roleDescription: 'Máy tính cá nhân tích hợp màn hình, bàn phím và các bộ phận chính trong một thiết bị di động.',
    quiz: {
      question: 'Thiết bị nào thuận tiện để mang theo khi làm việc ở nhiều nơi?',
      options: [
        { text: 'Máy tính xách tay (Laptop)', isCorrect: true },
        { text: 'Thùng máy tính để bàn (PC Case)', isCorrect: false },
        { text: 'Máy in (Printer)', isCorrect: false },
      ],
      explanation: 'Máy tính xách tay (Laptop) có pin tích hợp và thiết kế gập gọn nhẹ, thuận tiện di chuyển linh hoạt.',
    },
  },
  pc_case: {
    key: 'pc_case',
    name: 'THÙNG MÁY TÍNH',
    englishName: 'PC Case',
    shortDesc: 'Case máy tính để bàn dạng khối đứng',
    category: 'Bộ xử lý (Processing)',
    roleDescription: 'Vỏ chứa và bảo vệ nhiều linh kiện của máy tính để bàn như bo mạch chủ, nguồn và quạt tản nhiệt.',
    quiz: {
      question: 'Bộ phận nào thường chứa bo mạch chủ và nhiều linh kiện bên trong máy tính để bàn?',
      options: [
        { text: 'Thùng máy tính (PC Case)', isCorrect: true },
        { text: 'Chuột máy tính (Mouse)', isCorrect: false },
        { text: 'USB flash drive', isCorrect: false },
      ],
      explanation: 'Thùng máy tính (PC Case) là khung vỏ cơ học bảo vệ các linh kiện phần cứng bên trong khỏi bụi bẩn và va đập.',
    },
  },
  hard_drive: {
    key: 'hard_drive',
    name: 'Ổ CỨNG HDD/SSD',
    englishName: 'HDD/SSD Storage',
    shortDesc: 'Thiết bị lưu trữ dữ liệu HDD / SSD',
    category: 'Bộ nhớ & Lưu trữ (Storage)',
    roleDescription: 'Lưu trữ hệ điều hành, phần mềm và dữ liệu. HDD và SSD là các công nghệ lưu trữ khác nhau.',
    quiz: {
      question: 'Thiết bị nào dùng để lưu giữ tệp khi tắt máy?',
      options: [
        { text: 'Ổ lưu trữ (HDD/SSD)', isCorrect: true },
        { text: 'Bộ xử lý (CPU)', isCorrect: false },
        { text: 'Màn hình (Monitor)', isCorrect: false },
      ],
      explanation: 'Ổ lưu trữ (HDD/SSD) là bộ nhớ ngoài không bay hơi, giữ nguyên vẹn dữ liệu kể cả khi mất nguồn điện.',
    },
  },
  usb: {
    key: 'usb',
    name: 'USB FLASH DRIVE',
    englishName: 'USB Flash Drive',
    shortDesc: 'USB flash drive nhỏ gọn tiện lợi',
    category: 'Bộ nhớ & Lưu trữ (Storage)',
    roleDescription: 'Thiết bị lưu trữ di động nhỏ gọn dùng để lưu và chuyển tệp giữa các máy tính qua cổng cắm USB.',
    quiz: {
      question: 'Thiết bị nhỏ gọn nào thường được dùng để chuyển tệp giữa các máy tính?',
      options: [
        { text: 'USB flash drive', isCorrect: true },
        { text: 'Thùng máy tính (PC Case)', isCorrect: false },
        { text: 'Bàn phím (Keyboard)', isCorrect: false },
      ],
      explanation: 'USB flash drive có kích thước bỏ túi, cắm trực tiếp vào cổng USB để trao đổi tài liệu nhanh chóng.',
    },
  },
  wifi_router: {
    key: 'wifi_router',
    name: 'BỘ ĐỊNH TUYẾN WI-FI',
    englishName: 'Wi-Fi Router',
    shortDesc: 'Router có ăng-ten và phát sóng vô tuyến',
    category: 'Thiết bị mạng (Network)',
    roleDescription: 'Định tuyến lưu lượng mạng; nhiều mẫu cung cấp kết nối Wi-Fi cho các thiết bị.',
    quiz: {
      question: 'Thiết bị nào thường giúp các thiết bị trong nhà kết nối mạng không dây?',
      options: [
        { text: 'Bộ định tuyến Wi-Fi (Router)', isCorrect: true },
        { text: 'Máy in (Printer)', isCorrect: false },
        { text: 'Ổ lưu trữ (HDD/SSD)', isCorrect: false },
      ],
      explanation: 'Bộ định tuyến Wi-Fi (Router) điều phối luồng dữ liệu mạng và phát sóng vô tuyến cho các thiết bị kết nối Internet.',
    },
  },
  cpu_chip: {
    key: 'cpu_chip',
    name: 'BỘ XỬ LÝ CPU',
    englishName: 'CPU Processor',
    shortDesc: 'Vi xử lý vuông có chân tiếp xúc xung quanh',
    category: 'Bộ xử lý (Processing)',
    roleDescription: 'Thực thi lệnh và xử lý dữ liệu theo chương trình trong hệ thống máy tính.',
    quiz: {
      question: 'Bộ phận nào thực thi các lệnh của chương trình trong máy tính?',
      options: [
        { text: 'Bộ xử lý (CPU)', isCorrect: true },
        { text: 'Thùng máy tính (PC Case)', isCorrect: false },
        { text: 'Chuột máy tính (Mouse)', isCorrect: false },
      ],
      explanation: 'Bộ xử lý (CPU) là linh kiện cốt lõi đảm nhiệm tính toán số học, logic và điều khiển thực thi các lệnh của phần mềm.',
    },
  },
};

export const DEVICE_LIST: DeviceInfo[] = Object.values(COMPUTER_DEVICES);

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 숫자 포맷팅
export function formatNumber(num: number, decimals: number = 2): string {
  return num.toLocaleString('ko-KR', { 
    minimumFractionDigits: decimals, 
    maximumFractionDigits: decimals 
  });
}

// 퍼센트 포맷팅
export function formatPercent(num: number): string {
  return `${num.toFixed(1)}%`;
}

// 온도 포맷팅
export function formatTemperature(num: number): string {
  return `${num.toFixed(1)}°C`;
}

// 압력 포맷팅
export function formatPressure(num: number): string {
  return `${num.toFixed(2)} MPa`;
}

// 전력 포맷팅
export function formatPower(num: number): string {
  return `${num.toFixed(0)} MW`;
}

// 상태에 따른 색상 반환
export function getStatusColor(status: 'normal' | 'warning' | 'danger' | 'offline'): string {
  const colors = {
    normal: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
    offline: 'text-gray-400'
  };
  return colors[status];
}

// 상태에 따른 배경색 반환
export function getStatusBgColor(status: 'normal' | 'warning' | 'danger' | 'offline'): string {
  const colors = {
    normal: 'bg-success/10',
    warning: 'bg-warning/10',
    danger: 'bg-danger/10',
    offline: 'bg-gray-100'
  };
  return colors[status];
}

// 랜덤 변동값 생성 (실시간 시뮬레이션용)
export function generateVariation(baseValue: number, variationPercent: number = 1): number {
  const variation = baseValue * (variationPercent / 100);
  return baseValue + (Math.random() - 0.5) * 2 * variation;
}

// 시간 포맷팅
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('ko-KR', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
}

// 날짜 포맷팅
export function formatDate(date: Date): string {
  return date.toLocaleDateString('ko-KR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// 상대 시간 포맷팅
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  return `${days}일 전`;
}

'use client';

import { useState, useEffect } from 'react';
import { cn, formatNumber, formatTemperature, formatPressure } from '@/lib/utils';
import { Sensor, ModuleId } from '@/lib/types';

interface SensorCardProps {
  sensor: Sensor;
}

export function SensorCard({ sensor }: SensorCardProps) {
  const statusColors = {
    normal: 'border-success/30 bg-success/5',
    warning: 'border-warning/30 bg-warning/5',
    danger: 'border-danger/30 bg-danger/5 animate-pulse',
    offline: 'border-gray-200 bg-gray-50',
  };

  const statusDotColors = {
    normal: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    offline: 'bg-gray-400',
  };

  const getFormattedValue = () => {
    if (sensor.status === 'offline') return '-';
    switch (sensor.type) {
      case 'temperature':
        return formatTemperature(sensor.value);
      case 'pressure':
        return formatPressure(sensor.value);
      default:
        return `${formatNumber(sensor.value)} ${sensor.unit}`;
    }
  };

  const percentage = ((sensor.value - sensor.minValue) / (sensor.maxValue - sensor.minValue)) * 100;
  const normalMinPct = ((sensor.normalMin - sensor.minValue) / (sensor.maxValue - sensor.minValue)) * 100;
  const normalMaxPct = ((sensor.normalMax - sensor.minValue) / (sensor.maxValue - sensor.minValue)) * 100;

  return (
    <div className={cn(
      "p-4 rounded-lg border-2 transition-all",
      statusColors[sensor.status]
    )}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", statusDotColors[sensor.status])} />
          <span className="text-xs font-mono text-gray-500">{sensor.id}</span>
        </div>
        <span className="text-xs text-gray-400">{sensor.moduleId.replace('module', 'M')}</span>
      </div>

      <p className="text-sm font-medium text-gray-700 mb-1 truncate" title={sensor.nameKr}>
        {sensor.nameKr}
      </p>

      <p className="text-xl font-bold text-gray-900 mb-2">
        {getFormattedValue()}
      </p>

      {/* Mini gauge */}
      <div className="h-1.5 bg-gray-200 rounded-full relative overflow-hidden">
        {/* Normal range indicator */}
        <div 
          className="absolute h-full bg-success/30"
          style={{ 
            left: `${normalMinPct}%`, 
            width: `${normalMaxPct - normalMinPct}%` 
          }}
        />
        {/* Current value indicator */}
        <div 
          className={cn(
            "absolute h-full w-1.5 rounded-full -translate-x-1/2 transition-all",
            sensor.status === 'normal' ? 'bg-success' : 
            sensor.status === 'warning' ? 'bg-warning' : 
            sensor.status === 'danger' ? 'bg-danger' : 'bg-gray-400'
          )}
          style={{ left: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{sensor.minValue}</span>
        <span>{sensor.maxValue}</span>
      </div>
    </div>
  );
}

interface SensorGridProps {
  sensors: Sensor[];
  selectedModule: ModuleId | 'all';
  selectedType: Sensor['type'] | 'all';
}

export function SensorGrid({ sensors, selectedModule, selectedType }: SensorGridProps) {
  const filteredSensors = sensors.filter(s => {
    if (selectedModule !== 'all' && s.moduleId !== selectedModule) return false;
    if (selectedType !== 'all' && s.type !== selectedType) return false;
    return true;
  });

  // 상태별 그룹핑 - 위험/경고 우선 표시
  const sortedSensors = [...filteredSensors].sort((a, b) => {
    const priority = { danger: 0, warning: 1, normal: 2, offline: 3 };
    return priority[a.status] - priority[b.status];
  });

  return (
    <div className="grid grid-cols-6 gap-3">
      {sortedSensors.slice(0, 24).map((sensor) => (
        <SensorCard key={sensor.id} sensor={sensor} />
      ))}
    </div>
  );
}

interface SensorStatsProps {
  sensors: Sensor[];
}

export function SensorStats({ sensors }: SensorStatsProps) {
  const stats = {
    total: sensors.length,
    normal: sensors.filter(s => s.status === 'normal').length,
    warning: sensors.filter(s => s.status === 'warning').length,
    danger: sensors.filter(s => s.status === 'danger').length,
    offline: sensors.filter(s => s.status === 'offline').length,
  };

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-success" />
        <span className="text-sm text-gray-600">정상: <strong>{stats.normal}</strong></span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-warning" />
        <span className="text-sm text-gray-600">경고: <strong>{stats.warning}</strong></span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-danger" />
        <span className="text-sm text-gray-600">위험: <strong>{stats.danger}</strong></span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-gray-400" />
        <span className="text-sm text-gray-600">오프라인: <strong>{stats.offline}</strong></span>
      </div>
    </div>
  );
}

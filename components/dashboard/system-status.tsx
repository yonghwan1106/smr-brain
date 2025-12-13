'use client';

import { cn } from '@/lib/utils';
import { Module } from '@/lib/types';
import { Activity, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

interface ModuleCardProps {
  module: Module;
}

export function ModuleCard({ module }: ModuleCardProps) {
  const statusColors = {
    running: 'bg-success',
    maintenance: 'bg-warning',
    standby: 'bg-gray-400',
    offline: 'bg-danger',
  };

  const statusLabels = {
    running: '가동 중',
    maintenance: '정비 중',
    standby: '대기',
    offline: '정지',
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 card-hover">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">{module.name}</h3>
        <span className={cn(
          "px-2.5 py-1 rounded-full text-xs font-medium text-white",
          statusColors[module.status]
        )}>
          {statusLabels[module.status]}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">출력</span>
          <span className="text-xl font-bold text-gray-900">
            {module.power} <span className="text-sm font-normal text-gray-500">/ {module.maxPower} MW</span>
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full transition-all",
              module.status === 'running' ? 'bg-success' : 'bg-gray-300'
            )}
            style={{ width: `${(module.power / module.maxPower) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-xs text-gray-500">효율</p>
            <p className="text-sm font-semibold text-gray-900">{module.efficiency}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">가동시간</p>
            <p className="text-sm font-semibold text-gray-900">{(module.uptime / 24).toFixed(0)}일</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SystemOverviewProps {
  totalPower: number;
  maxPower: number;
  modulesOnline: number;
  totalModules: number;
  activeAlerts: number;
  efficiency: number;
}

export function SystemOverview({ 
  totalPower, 
  maxPower, 
  modulesOnline, 
  totalModules, 
  activeAlerts,
  efficiency 
}: SystemOverviewProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      <div className="bg-white rounded-xl p-4 lg:p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">총 발전출력</p>
            <p className="text-2xl font-bold text-gray-900">{totalPower} MW</p>
            <p className="text-xs text-gray-400">최대 {maxPower} MW</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-sm text-gray-500">가동 모듈</p>
            <p className="text-2xl font-bold text-gray-900">{modulesOnline} / {totalModules}</p>
            <p className="text-xs text-gray-400">Module 4 정비 중</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-warning" />
          </div>
          <div>
            <p className="text-sm text-gray-500">활성 알림</p>
            <p className="text-2xl font-bold text-gray-900">{activeAlerts}건</p>
            <p className="text-xs text-gray-400">경고 2건</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-monitor/10 flex items-center justify-center">
            <Activity className="w-6 h-6 text-monitor" />
          </div>
          <div>
            <p className="text-sm text-gray-500">평균 효율</p>
            <p className="text-2xl font-bold text-gray-900">{efficiency}%</p>
            <p className="text-xs text-gray-400">목표 대비 +1.4%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

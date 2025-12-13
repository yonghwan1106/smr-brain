'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { RULChart, RULCard, RULTrendChart } from '@/components/predict/rul-chart';
import { MaintenanceCalendar, CalendarView } from '@/components/predict/maintenance-calendar';
import { rulPredictions, maintenanceSchedules } from '@/lib/mock-data';
import { ModuleId } from '@/lib/types';

const moduleOptions = [
  { value: 'all', label: '전체 모듈' },
  { value: 'module1', label: 'Module 1' },
  { value: 'module2', label: 'Module 2' },
  { value: 'module3', label: 'Module 3' },
  { value: 'module4', label: 'Module 4' },
];

export default function PredictPage() {
  const [selectedModule, setSelectedModule] = useState<ModuleId | 'all'>('all');

  const filteredPredictions = selectedModule === 'all' 
    ? rulPredictions 
    : rulPredictions.filter(p => p.moduleId === selectedModule);

  const filteredSchedules = selectedModule === 'all'
    ? maintenanceSchedules
    : maintenanceSchedules.filter(s => s.moduleId === selectedModule);

  // 통계 계산
  const stats = {
    totalEquipment: filteredPredictions.length,
    urgentCount: filteredPredictions.filter(p => p.currentRUL <= 60).length,
    avgConfidence: Math.round(filteredPredictions.reduce((sum, p) => sum + p.confidence, 0) / filteredPredictions.length),
    scheduledMaintenance: filteredSchedules.filter(s => s.status === 'scheduled').length,
  };

  return (
    <div className="min-h-screen">
      <Header 
        title="Predict Agent" 
        subtitle="Digital Twin + ML 기반 AI 예측정비"
      />

      <div className="p-6 space-y-6">
        {/* 필터 및 통계 */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value as ModuleId | 'all')}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-predict/20"
            >
              {moduleOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{stats.totalEquipment}</p>
                <p className="text-xs text-gray-500">모니터링 기기</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-danger">{stats.urgentCount}</p>
                <p className="text-xs text-gray-500">긴급 정비 필요</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-predict">{stats.avgConfidence}%</p>
                <p className="text-xs text-gray-500">평균 신뢰도</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-monitor">{stats.scheduledMaintenance}</p>
                <p className="text-xs text-gray-500">예정된 정비</p>
              </div>
            </div>
          </div>
        </div>

        {/* RUL 차트 & 트렌드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <RULChart predictions={filteredPredictions} />
          <RULTrendChart />
        </div>

        {/* RUL 카드 그리드 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">📊 기기별 잔여수명 상세</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {filteredPredictions.map((prediction) => (
              <RULCard key={prediction.equipmentId} prediction={prediction} />
            ))}
          </div>
        </section>

        {/* 정비 일정 & 캘린더 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="lg:col-span-2">
            <MaintenanceCalendar schedules={filteredSchedules} />
          </div>
          <CalendarView schedules={filteredSchedules} />
        </div>
      </div>
    </div>
  );
}

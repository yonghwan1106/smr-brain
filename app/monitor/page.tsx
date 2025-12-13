'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { SensorGrid, SensorStats } from '@/components/monitor/sensor-grid';
import { RealTimeChart, MultiSensorChart } from '@/components/monitor/real-time-chart';
import { AlertPanel } from '@/components/dashboard/alert-panel';
import { sensors as initialSensors, alerts, updateSensorValue } from '@/lib/mock-data';
import { Sensor, ModuleId } from '@/lib/types';
import { cn } from '@/lib/utils';

const moduleOptions = [
  { value: 'all', label: '전체 모듈' },
  { value: 'module1', label: 'Module 1' },
  { value: 'module2', label: 'Module 2' },
  { value: 'module3', label: 'Module 3' },
  { value: 'module4', label: 'Module 4' },
];

const typeOptions = [
  { value: 'all', label: '전체 센서' },
  { value: 'temperature', label: '온도' },
  { value: 'pressure', label: '압력' },
  { value: 'vibration', label: '진동' },
  { value: 'flow', label: '유량' },
  { value: 'radiation', label: '방사선' },
  { value: 'power', label: '전력' },
];

export default function MonitorPage() {
  const [sensors, setSensors] = useState<Sensor[]>(initialSensors);
  const [selectedModule, setSelectedModule] = useState<ModuleId | 'all'>('all');
  const [selectedType, setSelectedType] = useState<Sensor['type'] | 'all'>('all');

  // 실시간 센서 데이터 업데이트 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => prev.map(sensor => updateSensorValue(sensor)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // 선택된 센서 (차트용)
  const warningSensors = sensors.filter(s => s.status === 'warning' || s.status === 'danger');
  const chartSensor = warningSensors[0] || sensors.find(s => s.type === 'vibration' && s.moduleId === 'module1');

  return (
    <div className="min-h-screen">
      <Header 
        title="Monitor Agent" 
        subtitle="Bi-LSTM Autoencoder 기반 실시간 이상 탐지"
      />

      <div className="p-6 space-y-6">
        {/* 필터 및 통계 */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value as ModuleId | 'all')}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-monitor/20"
              >
                {moduleOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as Sensor['type'] | 'all')}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-monitor/20"
              >
                {typeOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <SensorStats sensors={sensors} />
          </div>
        </div>

        {/* 실시간 차트 */}
        <div className="grid grid-cols-2 gap-6">
          {chartSensor && <RealTimeChart sensor={chartSensor} height={180} />}
          <MultiSensorChart 
            sensors={sensors} 
            type="temperature" 
            moduleId={selectedModule}
          />
        </div>

        {/* 센서 그리드 */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">🔍 센서 모니터링</h2>
            <p className="text-sm text-gray-500">
              총 {sensors.filter(s => 
                (selectedModule === 'all' || s.moduleId === selectedModule) &&
                (selectedType === 'all' || s.type === selectedType)
              ).length}개 센서
            </p>
          </div>
          <SensorGrid 
            sensors={sensors}
            selectedModule={selectedModule}
            selectedType={selectedType}
          />
        </div>

        {/* 알림 패널 */}
        <AlertPanel 
          alerts={alerts.filter(a => a.agentSource === 'monitor')} 
          maxItems={3}
        />
      </div>
    </div>
  );
}

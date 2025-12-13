'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { 
  PowerDistributionChart, 
  DemandForecastChart, 
  EconomicDispatchCard,
  OptimizationRecommendations,
  GridStatusPanel
} from '@/components/optimize/power-distribution';
import { modules } from '@/lib/mock-data';

// 최적화 권고 목업 데이터
const optimizationRecommendations = [
  {
    id: 'opt-001',
    type: 'increase' as const,
    module: 'Module 1',
    currentPower: 165,
    targetPower: 168,
    reason: 'Module 4 정비 기간 중 출력 보상을 위해 Module 1 출력 증가 권고',
    impact: '총 출력 3MW 증가, 수요 대응력 향상',
  },
  {
    id: 'opt-002',
    type: 'maintain' as const,
    module: 'Module 2',
    currentPower: 168,
    targetPower: 168,
    reason: '현재 최적 출력 상태, 효율 98.8%로 최고 수준 유지',
    impact: '현재 상태 유지 권고',
  },
  {
    id: 'opt-003',
    type: 'increase' as const,
    module: 'Module 3',
    currentPower: 162,
    targetPower: 166,
    reason: '피크 수요 시간대(18-21시) 대비 출력 예비 확보',
    impact: '피크 대응 예비력 4MW 확보',
  },
];

export default function OptimizePage() {
  const [totalSavings, setTotalSavings] = useState(125000);

  // 절감액 실시간 업데이트 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSavings(prev => prev + Math.floor(Math.random() * 100));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 통계 계산
  const runningModules = modules.filter(m => m.status === 'running');
  const totalPower = runningModules.reduce((sum, m) => sum + m.power, 0);
  const avgEfficiency = runningModules.reduce((sum, m) => sum + m.efficiency, 0) / runningModules.length;

  return (
    <div className="min-h-screen">
      <Header 
        title="Optimize Agent" 
        subtitle="Multi-Agent RL (A3C) 기반 협조운전 최적화"
      />

      <div className="p-6 space-y-6">
        {/* 상단 통계 */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">총 발전출력</p>
            <p className="text-2xl font-bold text-gray-900">{totalPower} MW</p>
            <p className="text-xs text-gray-400 mt-1">최대 680 MW (73%)</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">평균 효율</p>
            <p className="text-2xl font-bold text-success">{avgEfficiency.toFixed(1)}%</p>
            <p className="text-xs text-success mt-1">목표 대비 +1.4%</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">가동 모듈</p>
            <p className="text-2xl font-bold text-gray-900">{runningModules.length} / 4</p>
            <p className="text-xs text-warning mt-1">Module 4 정비 중</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">누적 절감액</p>
            <p className="text-2xl font-bold text-optimize">{totalSavings.toLocaleString()}원</p>
            <p className="text-xs text-gray-400 mt-1">오늘 기준</p>
          </div>
        </div>

        {/* 출력 분배 & 수요 예측 */}
        <div className="grid grid-cols-2 gap-6">
          <PowerDistributionChart modules={modules} />
          <DemandForecastChart />
        </div>

        {/* 경제급전 & 최적화 권고 */}
        <div className="grid grid-cols-3 gap-6">
          <EconomicDispatchCard 
            totalCost={45000}
            savings={2500}
            fuelCost={32000}
            maintenanceCost={8000}
          />
          <div className="col-span-2">
            <OptimizationRecommendations recommendations={optimizationRecommendations} />
          </div>
        </div>

        {/* 계통 상태 & 다중모듈 협조 */}
        <div className="grid grid-cols-4 gap-6">
          <GridStatusPanel />
          
          <div className="col-span-3 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">🔄 다중모듈 협조운전 현황</h3>
            
            <div className="grid grid-cols-4 gap-4">
              {modules.map((module) => (
                <div 
                  key={module.id}
                  className={`p-4 rounded-xl border-2 ${
                    module.status === 'running' 
                      ? 'border-success/30 bg-success/5' 
                      : 'border-warning/30 bg-warning/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-gray-900">{module.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      module.status === 'running' 
                        ? 'bg-success text-white' 
                        : 'bg-warning text-white'
                    }`}>
                      {module.status === 'running' ? '가동' : '정비'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">출력</span>
                      <span className="font-semibold">{module.power} / {module.maxPower} MW</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          module.status === 'running' ? 'bg-success' : 'bg-gray-300'
                        }`}
                        style={{ width: `${(module.power / module.maxPower) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>효율: {module.efficiency}%</span>
                      <span>가동: {(module.uptime / 24).toFixed(0)}일</span>
                    </div>
                  </div>

                  {module.status === 'running' && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        <span className="text-xs text-success">최적 운전 중</span>
                      </div>
                    </div>
                  )}

                  {module.status === 'maintenance' && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-warning" />
                        <span className="text-xs text-warning">정비 진행 중</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">예상 완료: 12/20</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 협조운전 설명 */}
            <div className="mt-4 p-4 bg-optimize/5 rounded-lg border border-optimize/20">
              <p className="text-sm text-gray-700">
                <strong className="text-optimize">🤖 AI 협조운전:</strong> Module 4 정비 기간 동안 
                Optimize Agent가 Module 1~3의 출력을 자동 조정하여 총 495MW 출력을 유지하고 있습니다.
                피크 시간대 수요 예측에 따라 추가 출력 증가가 권고되었습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

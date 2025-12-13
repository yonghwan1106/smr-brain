'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend,
  AreaChart, Area, ReferenceLine
} from 'recharts';
import { cn } from '@/lib/utils';
import { Module } from '@/lib/types';
import { Zap, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PowerDistributionProps {
  modules: Module[];
}

export function PowerDistributionChart({ modules }: PowerDistributionProps) {
  const data = modules.map(m => ({
    name: m.name,
    current: m.power,
    max: m.maxPower,
    efficiency: m.efficiency,
  }));

  const totalPower = modules.reduce((sum, m) => sum + m.power, 0);
  const maxPower = modules.reduce((sum, m) => sum + m.maxPower, 0);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">⚡ 모듈별 출력 분배</h3>
          <p className="text-sm text-gray-500">Multi-Agent RL 기반 최적 출력 분배</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{totalPower} MW</p>
          <p className="text-sm text-gray-500">/ {maxPower} MW</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis type="number" domain={[0, 180]} tick={{ fontSize: 11 }} />
          <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 11 }} />
          <Tooltip 
            formatter={(value: number, name: string) => [
              `${value} MW`,
              name === 'current' ? '현재 출력' : '최대 출력'
            ]}
          />
          <Bar dataKey="max" fill="#E5E7EB" radius={[0, 4, 4, 0]} />
          <Bar dataKey="current" fill="#F59E0B" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {/* 효율 표시 */}
      <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
        {modules.map(m => (
          <div key={m.id} className="text-center">
            <p className="text-xs text-gray-500">{m.name}</p>
            <p className={cn(
              "text-lg font-bold",
              m.status === 'running' ? 'text-success' : 'text-gray-400'
            )}>
              {m.efficiency}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 전력 수요 예측 차트
interface DemandForecastData {
  time: string;
  demand: number;
  supply: number;
  forecast: number;
}

export function DemandForecastChart() {
  const [data, setData] = useState<DemandForecastData[]>([]);

  useEffect(() => {
    // 24시간 데이터 생성
    const generateData = () => {
      const now = new Date();
      const result: DemandForecastData[] = [];

      for (let i = -12; i <= 12; i++) {
        const time = new Date(now.getTime() + i * 3600000);
        const hour = time.getHours();
        
        // 시간대별 수요 패턴
        let baseDemand = 450;
        if (hour >= 10 && hour <= 12) baseDemand = 550;
        else if (hour >= 18 && hour <= 21) baseDemand = 580;
        else if (hour >= 0 && hour <= 6) baseDemand = 380;

        const variation = Math.random() * 30 - 15;

        result.push({
          time: time.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
          demand: i <= 0 ? Math.round(baseDemand + variation) : 0,
          supply: 495, // 현재 공급량 (Module 4 정비 중)
          forecast: Math.round(baseDemand + variation),
        });
      }

      return result;
    };

    setData(generateData());
  }, []);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-1">📈 전력 수요 예측</h3>
      <p className="text-sm text-gray-500 mb-4">24시간 수요 예측 및 공급 계획</p>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="time" tick={{ fontSize: 10 }} />
          <YAxis domain={[300, 650]} tick={{ fontSize: 10 }} />
          <Tooltip />
          <ReferenceLine y={495} stroke="#10B981" strokeDasharray="5 5" label={{ value: '현재 공급', fontSize: 10 }} />
          <Area type="monotone" dataKey="demand" stroke="#8B5CF6" fill="url(#demandGradient)" strokeWidth={2} name="실제 수요" />
          <Area type="monotone" dataKey="forecast" stroke="#F59E0B" fill="url(#forecastGradient)" strokeWidth={2} strokeDasharray="5 5" name="예측 수요" />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-assist" />
          <span className="text-xs text-gray-500">실제 수요</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-optimize" />
          <span className="text-xs text-gray-500">예측 수요</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-xs text-gray-500">공급 가능</span>
        </div>
      </div>
    </div>
  );
}

// 경제급전 카드
interface EconomicDispatchCardProps {
  totalCost: number;
  savings: number;
  fuelCost: number;
  maintenanceCost: number;
}

export function EconomicDispatchCard({ totalCost, savings, fuelCost, maintenanceCost }: EconomicDispatchCardProps) {
  const data = [
    { name: '연료비', value: fuelCost, color: '#3B82F6' },
    { name: '정비비', value: maintenanceCost, color: '#10B981' },
    { name: '기타', value: totalCost - fuelCost - maintenanceCost, color: '#E5E7EB' },
  ];

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-1">💰 경제급전 현황</h3>
      <p className="text-sm text-gray-500 mb-4">AI 최적화로 비용 절감</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value.toLocaleString()}원/MWh`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col justify-center space-y-3">
          <div>
            <p className="text-xs text-gray-500">총 발전비용</p>
            <p className="text-xl font-bold text-gray-900">{totalCost.toLocaleString()}원<span className="text-sm font-normal">/MWh</span></p>
          </div>
          <div className="p-3 bg-success/10 rounded-lg">
            <p className="text-xs text-success">AI 최적화 절감액</p>
            <p className="text-lg font-bold text-success">-{savings.toLocaleString()}원/h</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 최적화 추천 카드
interface OptimizationRecommendation {
  id: string;
  type: 'increase' | 'decrease' | 'maintain';
  module: string;
  currentPower: number;
  targetPower: number;
  reason: string;
  impact: string;
}

interface OptimizationRecommendationsProps {
  recommendations: OptimizationRecommendation[];
}

export function OptimizationRecommendations({ recommendations }: OptimizationRecommendationsProps) {
  const typeConfig = {
    increase: { icon: TrendingUp, color: 'text-success', bgColor: 'bg-success/10', label: '출력 증가' },
    decrease: { icon: TrendingDown, color: 'text-danger', bgColor: 'bg-danger/10', label: '출력 감소' },
    maintain: { icon: Minus, color: 'text-gray-500', bgColor: 'bg-gray-100', label: '유지' },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">🎯 AI 최적화 권고</h3>
        <p className="text-sm text-gray-500">Multi-Agent RL 기반 실시간 운전 권고</p>
      </div>

      <div className="divide-y divide-gray-100">
        {recommendations.map((rec) => {
          const config = typeConfig[rec.type];
          const Icon = config.icon;
          const delta = rec.targetPower - rec.currentPower;

          return (
            <div key={rec.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <div className={cn("p-2 rounded-lg", config.bgColor)}>
                  <Icon className={cn("w-5 h-5", config.color)} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-gray-900">{rec.module}</span>
                    <span className={cn("text-xs px-2 py-0.5 rounded", config.bgColor, config.color)}>
                      {config.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-gray-900">{rec.currentPower} MW</span>
                    <span className="text-gray-400">→</span>
                    <span className={cn("text-lg font-bold", config.color)}>{rec.targetPower} MW</span>
                    <span className={cn("text-sm", config.color)}>
                      ({delta > 0 ? '+' : ''}{delta} MW)
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-1">{rec.reason}</p>
                  <p className="text-xs text-gray-500">예상 효과: {rec.impact}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 실시간 그리드 상태
export function GridStatusPanel() {
  const [frequency, setFrequency] = useState(60.00);
  const [voltage, setVoltage] = useState(345);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrequency(59.98 + Math.random() * 0.04);
      setVoltage(344 + Math.random() * 2);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">🔌 계통 연계 상태</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">계통 주파수</span>
            <span className="text-xs text-success">정상</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{frequency.toFixed(2)} <span className="text-sm font-normal text-gray-500">Hz</span></p>
          <div className="h-1.5 bg-gray-100 rounded-full mt-2">
            <div 
              className="h-full bg-success rounded-full transition-all"
              style={{ width: `${((frequency - 59.9) / 0.2) * 100}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">모선 전압</span>
            <span className="text-xs text-success">정상</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{voltage.toFixed(1)} <span className="text-sm font-normal text-gray-500">kV</span></p>
          <div className="h-1.5 bg-gray-100 rounded-full mt-2">
            <div 
              className="h-full bg-success rounded-full transition-all"
              style={{ width: `${((voltage - 340) / 10) * 100}%` }}
            />
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">무효전력 출력</span>
            <span className="font-medium text-gray-900">+45 MVar</span>
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-gray-500">역률</span>
            <span className="font-medium text-gray-900">0.98</span>
          </div>
        </div>
      </div>
    </div>
  );
}

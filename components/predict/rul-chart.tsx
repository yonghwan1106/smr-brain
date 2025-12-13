'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, Legend } from 'recharts';
import { RULPrediction } from '@/lib/types';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface RULChartProps {
  predictions: RULPrediction[];
}

export function RULChart({ predictions }: RULChartProps) {
  const data = predictions.map(p => ({
    name: p.equipmentName.replace('Module ', 'M').replace(' ', '\n'),
    rul: p.currentRUL,
    confidence: p.confidence,
    trend: p.trend,
  }));

  const getBarColor = (rul: number) => {
    if (rul <= 30) return '#EF4444';
    if (rul <= 60) return '#F59E0B';
    if (rul <= 120) return '#3B82F6';
    return '#10B981';
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-1">📊 잔여수명(RUL) 예측</h3>
      <p className="text-sm text-gray-500 mb-4">Digital Twin + ML 기반 핵심 기기 수명 예측</p>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis type="number" domain={[0, 400]} tick={{ fontSize: 11 }} />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={120}
            tick={{ fontSize: 11 }}
          />
          <Tooltip 
            formatter={(value: number) => [`${value}일`, '잔여수명']}
            contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
          />
          <Bar dataKey="rul" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry.rul)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* 범례 */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-danger" />
          <span className="text-xs text-gray-500">≤30일 (긴급)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-warning" />
          <span className="text-xs text-gray-500">31-60일 (주의)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-monitor" />
          <span className="text-xs text-gray-500">61-120일 (관찰)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-success" />
          <span className="text-xs text-gray-500">&gt;120일 (양호)</span>
        </div>
      </div>
    </div>
  );
}

interface RULCardProps {
  prediction: RULPrediction;
}

export function RULCard({ prediction }: RULCardProps) {
  const trendConfig = {
    stable: { icon: CheckCircle, color: 'text-success', label: '안정' },
    declining: { icon: AlertTriangle, color: 'text-warning', label: '하락' },
    critical: { icon: AlertTriangle, color: 'text-danger', label: '위험' },
  };

  const trend = trendConfig[prediction.trend];
  const TrendIcon = trend.icon;

  const urgency = prediction.currentRUL <= 30 ? 'danger' : 
                  prediction.currentRUL <= 60 ? 'warning' : 'normal';

  return (
    <div className={cn(
      "bg-white rounded-xl p-5 shadow-sm border",
      urgency === 'danger' ? 'border-danger/30' : 
      urgency === 'warning' ? 'border-warning/30' : 'border-gray-100'
    )}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-gray-500 mb-1">{prediction.moduleId.replace('module', 'Module ')}</p>
          <h4 className="text-sm font-semibold text-gray-900">{prediction.equipmentName.split(' ').slice(-1)}</h4>
        </div>
        <div className={cn("flex items-center gap-1", trend.color)}>
          <TrendIcon className="w-4 h-4" />
          <span className="text-xs font-medium">{trend.label}</span>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-3xl font-bold text-gray-900">{prediction.currentRUL}<span className="text-sm font-normal text-gray-500">일</span></p>
        <p className="text-xs text-gray-500">잔여수명</p>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-500">신뢰도</span>
          <span className="font-medium text-gray-900">{prediction.confidence}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">예상 고장일</span>
          <span className="font-medium text-gray-900">
            {prediction.predictedFailureDate.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">권장 정비일</span>
          <span className="font-medium text-predict">
            {prediction.recommendedMaintenanceDate.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>
    </div>
  );
}

// RUL 트렌드 차트 (시계열)
export function RULTrendChart() {
  // 과거 30일간의 RUL 변화 시뮬레이션
  const data = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' }),
      pump: 75 - i * 1 + Math.random() * 2,
      condenser: 90 - i * 1 + Math.random() * 2,
      turbine: 395 - i * 1 + Math.random() * 3,
    };
  });

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-1">📈 RUL 변화 추이</h3>
      <p className="text-sm text-gray-500 mb-4">최근 30일간 잔여수명 변화</p>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pump" name="급수펌프" stroke="#3B82F6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="condenser" name="복수기" stroke="#10B981" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="turbine" name="터빈" stroke="#8B5CF6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

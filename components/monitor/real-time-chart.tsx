'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { useState, useEffect } from 'react';
import { generateSensorHistory } from '@/lib/mock-data';
import { Sensor } from '@/lib/types';

interface RealTimeChartProps {
  sensor: Sensor;
  height?: number;
}

export function RealTimeChart({ sensor, height = 200 }: RealTimeChartProps) {
  const [data, setData] = useState(() => generateSensorHistory(sensor.id, 12));

  // 실시간 업데이트 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        const lastValue = prev[prev.length - 1].value;
        const variation = lastValue * 0.01 * (Math.random() - 0.5);
        const newValue = Math.max(
          sensor.minValue, 
          Math.min(sensor.maxValue, lastValue + variation)
        );
        
        newData.push({
          time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
          value: Number(newValue.toFixed(2)),
        });
        
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [sensor]);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{sensor.nameKr}</h3>
          <p className="text-xs text-gray-500">{sensor.id} | {sensor.unit}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{data[data.length - 1]?.value}</p>
          <p className="text-xs text-gray-500">{sensor.unit}</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`gradient-${sensor.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis 
            domain={[sensor.normalMin * 0.95, sensor.normalMax * 1.05]}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <ReferenceLine 
            y={sensor.normalMax} 
            stroke="#F59E0B" 
            strokeDasharray="5 5" 
            label={{ value: '상한', fontSize: 10, fill: '#F59E0B' }}
          />
          <ReferenceLine 
            y={sensor.normalMin} 
            stroke="#F59E0B" 
            strokeDasharray="5 5"
            label={{ value: '하한', fontSize: 10, fill: '#F59E0B' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#3B82F6" 
            fill={`url(#gradient-${sensor.id})`}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

interface MultiSensorChartProps {
  sensors: Sensor[];
  type: Sensor['type'];
  moduleId: string;
}

export function MultiSensorChart({ sensors, type, moduleId }: MultiSensorChartProps) {
  const filteredSensors = sensors.filter(s => 
    s.type === type && 
    (moduleId === 'all' || s.moduleId === moduleId) &&
    s.status !== 'offline'
  ).slice(0, 3);

  const colors = ['#3B82F6', '#10B981', '#8B5CF6'];

  // 각 센서의 히스토리 데이터 생성
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const hours = 12;
    const data: any[] = [];
    const now = new Date();

    for (let i = hours; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 3600000);
      const point: any = {
        time: timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      };

      filteredSensors.forEach((sensor, idx) => {
        const variation = sensor.value * 0.02 * (Math.random() - 0.5);
        point[`sensor${idx}`] = Number((sensor.value + variation).toFixed(2));
      });

      data.push(point);
    }

    setChartData(data);
  }, [filteredSensors.length, moduleId, type]);

  const typeLabels: Record<string, string> = {
    temperature: '온도 (°C)',
    pressure: '압력 (MPa)',
    vibration: '진동 (mm/s)',
    flow: '유량 (kg/s)',
    radiation: '방사선 (μSv/h)',
    power: '전력 (MW)',
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">{typeLabels[type]} 트렌드</h3>
        <div className="flex gap-3">
          {filteredSensors.map((sensor, idx) => (
            <div key={sensor.id} className="flex items-center gap-1.5">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[idx] }}
              />
              <span className="text-xs text-gray-500">{sensor.id}</span>
            </div>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
          />
          <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} />
          <Tooltip />
          {filteredSensors.map((_, idx) => (
            <Line 
              key={idx}
              type="monotone" 
              dataKey={`sensor${idx}`} 
              stroke={colors[idx]} 
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

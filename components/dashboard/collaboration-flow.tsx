'use client';

import { cn, formatRelativeTime } from '@/lib/utils';
import { CollaborationEvent, AgentType } from '@/lib/types';
import { Activity, LineChart, MessageSquare, Zap, ArrowRight, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

const agentIcons: Record<AgentType, typeof Activity> = {
  monitor: Activity,
  predict: LineChart,
  assist: MessageSquare,
  optimize: Zap,
};

const agentColors: Record<AgentType, string> = {
  monitor: 'bg-monitor text-white',
  predict: 'bg-predict text-white',
  assist: 'bg-assist text-white',
  optimize: 'bg-optimize text-white',
};

interface CollaborationFlowProps {
  events: CollaborationEvent[];
}

export function CollaborationFlow({ events }: CollaborationFlowProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">🔄 에이전트 협업 현황</h2>
        <p className="text-sm text-gray-500">실시간 에이전트 간 협업 이벤트</p>
      </div>

      <div className="divide-y divide-gray-100">
        {events.map((event) => (
          <div key={event.id} className="p-5 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-4">
              {/* 에이전트 아이콘들 */}
              <div className="flex items-center -space-x-2">
                {event.agents.map((agentType, idx) => {
                  const Icon = agentIcons[agentType];
                  return (
                    <div
                      key={agentType}
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center ring-2 ring-white",
                        agentColors[agentType]
                      )}
                      style={{ zIndex: event.agents.length - idx }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  );
                })}
              </div>

              {/* 이벤트 내용 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900">{event.trigger}</span>
                  {event.status === 'completed' && (
                    <CheckCircle className="w-4 h-4 text-success" />
                  )}
                  {event.status === 'in-progress' && (
                    <Loader2 className="w-4 h-4 text-monitor animate-spin" />
                  )}
                  {event.status === 'failed' && (
                    <AlertCircle className="w-4 h-4 text-danger" />
                  )}
                </div>

                <div className="text-xs text-gray-500 mb-2">
                  {formatRelativeTime(event.timestamp)}
                </div>

                {/* 액션 플로우 */}
                <div className="bg-gray-50 rounded-lg p-3 mb-2">
                  <p className="text-xs text-gray-600 whitespace-pre-line">{event.action}</p>
                </div>

                {/* 결과 */}
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{event.result}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

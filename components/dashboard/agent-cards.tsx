'use client';

import { cn } from '@/lib/utils';
import { AgentStatus, AgentType } from '@/lib/types';
import { Activity, LineChart, MessageSquare, Zap, CheckCircle, Loader2, Clock, AlertCircle } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';

const agentConfig: Record<AgentType, {
  name: string;
  nameKr: string;
  icon: typeof Activity;
  color: string;
  bgColor: string;
  href: string;
  description: string;
}> = {
  monitor: {
    name: 'Monitor Agent',
    nameKr: '실시간 이상 탐지',
    icon: Activity,
    color: 'text-monitor',
    bgColor: 'bg-monitor/10',
    href: '/monitor',
    description: 'Bi-LSTM Autoencoder 기반 실시간 센서 분석',
  },
  predict: {
    name: 'Predict Agent',
    nameKr: 'AI 예측정비',
    icon: LineChart,
    color: 'text-predict',
    bgColor: 'bg-predict/10',
    href: '/predict',
    description: 'Digital Twin + ML 기반 잔여수명 예측',
  },
  assist: {
    name: 'Assist Agent',
    nameKr: '운전원 지원',
    icon: MessageSquare,
    color: 'text-assist',
    bgColor: 'bg-assist/10',
    href: '/assist',
    description: 'LLM + RAG 기반 자연어 질의응답',
  },
  optimize: {
    name: 'Optimize Agent',
    nameKr: '협조운전 최적화',
    icon: Zap,
    color: 'text-optimize',
    bgColor: 'bg-optimize/10',
    href: '/optimize',
    description: 'Multi-Agent RL 기반 출력 최적화',
  },
};

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; label: string; animate?: boolean }> = {
  active: { icon: CheckCircle, color: 'text-success', label: '활성' },
  idle: { icon: Clock, color: 'text-gray-400', label: '대기' },
  processing: { icon: Loader2, color: 'text-monitor', label: '처리 중', animate: true },
  error: { icon: AlertCircle, color: 'text-danger', label: '오류' },
};

interface AgentCardProps {
  agent: AgentStatus;
}

export function AgentCard({ agent }: AgentCardProps) {
  const config = agentConfig[agent.type];
  const status = statusConfig[agent.status];
  const Icon = config.icon;
  const StatusIcon = status.icon;

  return (
    <Link href={config.href}>
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 card-hover cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", config.bgColor)}>
            <Icon className={cn("w-6 h-6", config.color)} />
          </div>
          <div className="flex items-center gap-1.5">
            <StatusIcon className={cn("w-4 h-4", status.color, status.animate && "animate-spin")} />
            <span className={cn("text-xs font-medium", status.color)}>{status.label}</span>
          </div>
        </div>

        <h3 className={cn("text-lg font-bold mb-1", config.color)}>{config.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{config.nameKr}</p>
        <p className="text-xs text-gray-400 mb-4">{config.description}</p>

        <div className="pt-3 border-t border-gray-100">
          {agent.currentTask ? (
            <p className="text-xs text-gray-600 truncate">📌 {agent.currentTask}</p>
          ) : (
            <p className="text-xs text-gray-400">최근 활동: {formatRelativeTime(agent.lastActivity)}</p>
          )}
          <p className="text-xs text-gray-400 mt-1">완료 작업: {agent.tasksCompleted.toLocaleString()}건</p>
        </div>
      </div>
    </Link>
  );
}

interface AgentGridProps {
  agents: AgentStatus[];
}

export function AgentGrid({ agents }: AgentGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      {agents.map((agent) => (
        <AgentCard key={agent.type} agent={agent} />
      ))}
    </div>
  );
}

'use client';

import { Header } from '@/components/layout/header';
import { SystemOverview, ModuleCard } from '@/components/dashboard/system-status';
import { AgentGrid } from '@/components/dashboard/agent-cards';
import { CollaborationFlow } from '@/components/dashboard/collaboration-flow';
import { AlertPanel } from '@/components/dashboard/alert-panel';
import { 
  modules, 
  alerts, 
  agentStatuses, 
  collaborationEvents,
  systemStatus 
} from '@/lib/mock-data';
import { useState } from 'react';

export default function DashboardPage() {
  const [alertList, setAlertList] = useState(alerts);

  const handleAcknowledge = (id: string) => {
    setAlertList(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  return (
    <div className="min-h-screen">
      {/* 공모전 출품작 배너 */}
      <div className="bg-gradient-to-r from-primary to-blue-700 text-white text-center py-2 px-4">
        <span className="text-sm font-medium">
          🏆 2025 한국수력원자력 대국민 혁신 아이디어 공모전 출품작
        </span>
      </div>

      <Header
        title="SMR-BRAIN 통합 대시보드"
        subtitle="i-SMR 지능형 AI 에이전트 통합운영 플랫폼"
      />

      <div className="p-6 space-y-6">
        {/* 시스템 개요 */}
        <SystemOverview 
          totalPower={systemStatus.totalPower}
          maxPower={systemStatus.maxPower}
          modulesOnline={systemStatus.modulesOnline}
          totalModules={systemStatus.totalModules}
          activeAlerts={alertList.filter(a => !a.acknowledged).length}
          efficiency={systemStatus.efficiency}
        />

        {/* 모듈 상태 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">⚛️ 모듈 현황</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {modules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </section>

        {/* AI 에이전트 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">🤖 AI 에이전트 현황</h2>
          <AgentGrid agents={agentStatuses} />
        </section>

        {/* 협업 현황 & 알림 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <CollaborationFlow events={collaborationEvents} />
          <AlertPanel
            alerts={alertList}
            onAcknowledge={handleAcknowledge}
            maxItems={4}
          />
        </div>
      </div>
    </div>
  );
}

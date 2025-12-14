'use client';

import { Header } from '@/components/layout/header';
import { Activity, LineChart, MessageSquare, Zap, Target, Lightbulb, Users, Award } from 'lucide-react';

const agents = [
  {
    name: 'Monitor Agent',
    icon: Activity,
    color: 'text-monitor',
    bgColor: 'bg-monitor/10',
    tech: 'Bi-LSTM Autoencoder',
    description: '수천 개의 센서 데이터를 실시간으로 분석하여 이상 징후를 조기에 탐지합니다.',
    features: ['실시간 센서 모니터링', '이상 패턴 자동 탐지', '알림 및 경고 발생'],
  },
  {
    name: 'Predict Agent',
    icon: LineChart,
    color: 'text-predict',
    bgColor: 'bg-predict/10',
    tech: 'Digital Twin + ML',
    description: '디지털 트윈과 머신러닝을 결합하여 기기의 잔여수명(RUL)을 예측합니다.',
    features: ['잔여수명 예측', 'AI 예측정비 권고', '정비 일정 최적화'],
  },
  {
    name: 'Assist Agent',
    icon: MessageSquare,
    color: 'text-assist',
    bgColor: 'bg-assist/10',
    tech: 'LLM + RAG',
    description: '자연어 질의응답을 통해 운전원의 의사결정을 지원합니다.',
    features: ['자연어 질의응답', '절차서/규제문서 검색', '실시간 상태 분석'],
  },
  {
    name: 'Optimize Agent',
    icon: Zap,
    color: 'text-optimize',
    bgColor: 'bg-optimize/10',
    tech: 'Multi-Agent RL (A3C)',
    description: '다중모듈 협조운전을 최적화하여 경제적 운전을 실현합니다.',
    features: ['출력 분배 최적화', '수요 예측 기반 운전', '경제급전 시뮬레이션'],
  },
];

const keyFeatures = [
  {
    icon: Target,
    title: '자율운영 지원',
    description: '4대 AI 에이전트가 협업하여 i-SMR의 자율운영을 지원합니다.',
  },
  {
    icon: Lightbulb,
    title: 'AI 기반 의사결정',
    description: '데이터 기반 AI 분석으로 운전원의 신속한 의사결정을 돕습니다.',
  },
  {
    icon: Users,
    title: '에이전트 협업',
    description: '각 에이전트가 상호 연계하여 시너지 효과를 창출합니다.',
  },
  {
    icon: Award,
    title: '글로벌 경쟁력',
    description: 'AI 기술 적용으로 한수원 i-SMR의 글로벌 경쟁력을 강화합니다.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header
        title="프로젝트 소개"
        subtitle="SMR-BRAIN: i-SMR 지능형 AI 에이전트 통합운영 플랫폼"
      />

      <div className="p-4 lg:p-6 space-y-6 lg:space-y-8">
        {/* 프로젝트 개요 */}
        <section className="bg-white rounded-xl p-5 lg:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-monitor to-optimize flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">SMR-BRAIN</h2>
              <p className="text-sm text-gray-500">SMR-Based Reactive AI Network</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-4 lg:p-5 mb-6">
            <p className="text-gray-700 leading-relaxed">
              <strong>SMR-BRAIN</strong>은 한국수력원자력 i-SMR(혁신형 소형모듈원자로)의
              <strong className="text-primary"> 자율운영을 위한 AI 에이전트 통합 플랫폼</strong>입니다.
              4대 AI 에이전트(Monitor, Predict, Assist, Optimize)가 상호 협업하여
              실시간 감시, 예측정비, 운전원 지원, 출력 최적화를 수행합니다.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {keyFeatures.map((feature, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                <feature.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI 에이전트 소개 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">4대 AI 에이전트</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {agents.map((agent) => (
              <div key={agent.name} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${agent.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <agent.icon className={`w-6 h-6 ${agent.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-bold ${agent.color}`}>{agent.name}</h3>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                        {agent.tech}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{agent.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {agent.features.map((feature, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-gray-50 rounded text-gray-600">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 기술 스택 */}
        <section className="bg-white rounded-xl p-5 lg:p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">기술 스택</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">Next.js 15</p>
              <p className="text-xs text-gray-500">App Router</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">TypeScript</p>
              <p className="text-xs text-gray-500">타입 안전성</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">Tailwind</p>
              <p className="text-xs text-gray-500">스타일링</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">Recharts</p>
              <p className="text-xs text-gray-500">데이터 시각화</p>
            </div>
          </div>
        </section>

        {/* 제작 정보 */}
        <section className="bg-gradient-to-r from-primary to-blue-700 rounded-xl p-5 lg:p-6 text-white">
          <div>
            <p className="text-white/80 text-sm mb-1">2025 한국수력원자력 대국민 혁신 아이디어 공모전</p>
            <h2 className="text-2xl font-bold mb-2">SMR-BRAIN 프로젝트</h2>
            <p className="text-white/90">i-SMR의 글로벌 경쟁력을 AI로 완성합니다.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

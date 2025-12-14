'use client';

import { Header } from '@/components/layout/header';
import {
  Activity, LineChart, MessageSquare, Zap, Target, Lightbulb, Users, Award,
  AlertTriangle, TrendingUp, Shield, Globe, ArrowRight, CheckCircle2, Clock,
  Cpu, Database, Brain, Network
} from 'lucide-react';

const agents = [
  {
    name: 'Monitor Agent',
    icon: Activity,
    color: 'text-monitor',
    bgColor: 'bg-monitor/10',
    borderColor: 'border-monitor/30',
    tech: 'Bi-LSTM Autoencoder',
    description: '수천 개의 센서 데이터를 실시간으로 분석하여 이상 징후를 조기에 탐지합니다.',
    features: ['실시간 센서 모니터링', '이상 패턴 자동 탐지', '알림 및 경고 발생'],
    metrics: { accuracy: '99.2%', latency: '<100ms' },
  },
  {
    name: 'Predict Agent',
    icon: LineChart,
    color: 'text-predict',
    bgColor: 'bg-predict/10',
    borderColor: 'border-predict/30',
    tech: 'Digital Twin + ML',
    description: '디지털 트윈과 머신러닝을 결합하여 기기의 잔여수명(RUL)을 예측합니다.',
    features: ['잔여수명 예측', 'AI 예측정비 권고', '정비 일정 최적화'],
    metrics: { accuracy: '95.8%', prediction: '30일 전' },
  },
  {
    name: 'Assist Agent',
    icon: MessageSquare,
    color: 'text-assist',
    bgColor: 'bg-assist/10',
    borderColor: 'border-assist/30',
    tech: 'LLM + RAG',
    description: '자연어 질의응답을 통해 운전원의 의사결정을 지원합니다.',
    features: ['자연어 질의응답', '절차서/규제문서 검색', '실시간 상태 분석'],
    metrics: { documents: '10,000+', responseTime: '<2초' },
  },
  {
    name: 'Optimize Agent',
    icon: Zap,
    color: 'text-optimize',
    bgColor: 'bg-optimize/10',
    borderColor: 'border-optimize/30',
    tech: 'Multi-Agent RL (A3C)',
    description: '다중모듈 협조운전을 최적화하여 경제적 운전을 실현합니다.',
    features: ['출력 분배 최적화', '수요 예측 기반 운전', '경제급전 시뮬레이션'],
    metrics: { efficiency: '+12%', savings: '연 50억원' },
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

const challenges = [
  {
    icon: AlertTriangle,
    title: '복잡한 운전 환경',
    description: '다중모듈 SMR은 기존 대형 원전보다 복잡한 협조운전이 필요합니다.',
  },
  {
    icon: Clock,
    title: '실시간 의사결정',
    description: '방대한 센서 데이터 속에서 신속한 이상 탐지와 대응이 요구됩니다.',
  },
  {
    icon: Database,
    title: '정보 과부하',
    description: '수만 페이지의 기술문서와 규제문서를 효율적으로 활용해야 합니다.',
  },
  {
    icon: TrendingUp,
    title: '경제성 확보',
    description: 'SMR의 규모의 경제 한계를 AI 기술로 극복해야 합니다.',
  },
];

const expectedEffects = [
  { label: '이상 탐지 시간', before: '수 분', after: '수 초', improvement: '99%' },
  { label: '예측정비 정확도', before: '70%', after: '95%', improvement: '+25%p' },
  { label: '운전 효율성', before: '기준', after: '+12%', improvement: '12%' },
  { label: '문서 검색 시간', before: '30분', after: '2초', improvement: '99%' },
];

const roadmap = [
  { phase: 'Phase 1', title: '프로토타입 개발', status: 'completed', items: ['UI/UX 설계', '핵심 기능 구현', '데모 시스템 구축'] },
  { phase: 'Phase 2', title: '기술 고도화', status: 'current', items: ['AI 모델 학습', '실증 데이터 연동', '성능 최적화'] },
  { phase: 'Phase 3', title: '실증 및 검증', status: 'upcoming', items: ['시뮬레이터 연동', '운전원 피드백', '안전성 검증'] },
  { phase: 'Phase 4', title: '상용화', status: 'upcoming', items: ['현장 적용', '유지보수 체계', '해외 수출'] },
];

const techStack = [
  { category: 'Frontend', items: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Recharts'] },
  { category: 'AI/ML', items: ['Bi-LSTM', 'Digital Twin', 'LLM + RAG', 'A3C RL'] },
  { category: 'Backend', items: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'] },
  { category: 'Infra', items: ['Docker', 'Kubernetes', 'AWS/Azure', 'CI/CD'] },
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

        {/* i-SMR 배경 */}
        <section className="bg-white rounded-xl p-5 lg:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">i-SMR이란?</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong className="text-gray-900">i-SMR(혁신형 소형모듈원자로)</strong>은 한국수력원자력이 개발 중인
                차세대 원자로로, 전기출력 170MW급의 소형 모듈형 원전입니다.
                기존 대형 원전 대비 안전성이 강화되고, 공장 제작 후 현장 조립이 가능하여
                건설 기간과 비용을 대폭 절감할 수 있습니다.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">피동안전계통으로 무인 자동 냉각</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">모듈형 설계로 유연한 용량 확장</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">2028년 표준설계인가 목표</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-3">글로벌 SMR 시장 전망</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/70 rounded-lg">
                  <p className="text-2xl font-bold text-primary">$150B</p>
                  <p className="text-xs text-gray-500">2040년 시장 규모</p>
                </div>
                <div className="text-center p-3 bg-white/70 rounded-lg">
                  <p className="text-2xl font-bold text-primary">80+</p>
                  <p className="text-xs text-gray-500">전 세계 개발 프로젝트</p>
                </div>
                <div className="text-center p-3 bg-white/70 rounded-lg">
                  <p className="text-2xl font-bold text-primary">21GW</p>
                  <p className="text-xs text-gray-500">2035년 예상 용량</p>
                </div>
                <div className="text-center p-3 bg-white/70 rounded-lg">
                  <p className="text-2xl font-bold text-primary">Top 5</p>
                  <p className="text-xs text-gray-500">한국 기술 경쟁력</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 도전 과제 */}
        <section className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-5 lg:p-6 border border-orange-100">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-bold text-gray-900">해결해야 할 도전 과제</h2>
          </div>
          <p className="text-gray-600 mb-4">
            i-SMR의 성공적인 상용화를 위해서는 다음과 같은 기술적 과제를 해결해야 합니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {challenges.map((challenge, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur rounded-xl p-4">
                <challenge.icon className="w-8 h-8 text-orange-500 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">{challenge.title}</h3>
                <p className="text-xs text-gray-600">{challenge.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI 에이전트 소개 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">4대 AI 에이전트</h2>
          </div>
          <p className="text-gray-600 mb-4">
            SMR-BRAIN의 핵심은 4개의 특화된 AI 에이전트가 상호 협력하여 운전원의 의사결정을 지원하는 것입니다.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {agents.map((agent) => (
              <div key={agent.name} className={`bg-white rounded-xl p-5 shadow-sm border-2 ${agent.borderColor}`}>
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
                    <div className="flex flex-wrap gap-2 mb-3">
                      {agent.features.map((feature, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-gray-50 rounded text-gray-600">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 pt-2 border-t border-gray-100">
                      {Object.entries(agent.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className={`text-sm font-bold ${agent.color}`}>{value}</p>
                          <p className="text-xs text-gray-400">{key}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 에이전트 협업 흐름 */}
        <section className="bg-white rounded-xl p-5 lg:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Network className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">에이전트 협업 흐름</h2>
          </div>
          <p className="text-gray-600 mb-6">
            4대 에이전트는 독립적으로 작동하면서도 상호 정보를 교환하여 시너지 효과를 창출합니다.
          </p>

          <div className="relative">
            {/* 협업 흐름도 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-monitor/10 rounded-xl p-4 text-center">
                <Activity className="w-8 h-8 text-monitor mx-auto mb-2" />
                <h4 className="font-bold text-monitor mb-1">Monitor</h4>
                <p className="text-xs text-gray-600">이상 탐지</p>
                <ArrowRight className="w-5 h-5 text-gray-300 mx-auto mt-3 hidden md:block" />
              </div>
              <div className="bg-predict/10 rounded-xl p-4 text-center">
                <LineChart className="w-8 h-8 text-predict mx-auto mb-2" />
                <h4 className="font-bold text-predict mb-1">Predict</h4>
                <p className="text-xs text-gray-600">RUL 예측</p>
                <ArrowRight className="w-5 h-5 text-gray-300 mx-auto mt-3 hidden md:block" />
              </div>
              <div className="bg-assist/10 rounded-xl p-4 text-center">
                <MessageSquare className="w-8 h-8 text-assist mx-auto mb-2" />
                <h4 className="font-bold text-assist mb-1">Assist</h4>
                <p className="text-xs text-gray-600">의사결정 지원</p>
                <ArrowRight className="w-5 h-5 text-gray-300 mx-auto mt-3 hidden md:block" />
              </div>
              <div className="bg-optimize/10 rounded-xl p-4 text-center">
                <Zap className="w-8 h-8 text-optimize mx-auto mb-2" />
                <h4 className="font-bold text-optimize mb-1">Optimize</h4>
                <p className="text-xs text-gray-600">운전 최적화</p>
              </div>
            </div>

            {/* 협업 시나리오 */}
            <div className="mt-6 bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3">협업 시나리오 예시</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="bg-monitor text-white text-xs px-2 py-0.5 rounded">1</span>
                  <span className="text-gray-600"><strong className="text-monitor">Monitor</strong>가 펌프 진동 이상 패턴 감지</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-predict text-white text-xs px-2 py-0.5 rounded">2</span>
                  <span className="text-gray-600"><strong className="text-predict">Predict</strong>가 해당 펌프 RUL 15일로 예측</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-assist text-white text-xs px-2 py-0.5 rounded">3</span>
                  <span className="text-gray-600"><strong className="text-assist">Assist</strong>가 관련 정비 절차서 및 과거 사례 제공</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-optimize text-white text-xs px-2 py-0.5 rounded">4</span>
                  <span className="text-gray-600"><strong className="text-optimize">Optimize</strong>가 정비 기간 동안 출력 재분배 계획 수립</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 기대 효과 */}
        <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 lg:p-6 border border-green-100">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold text-gray-900">기대 효과</h2>
          </div>
          <p className="text-gray-600 mb-4">
            SMR-BRAIN 도입 시 다음과 같은 정량적 개선 효과가 기대됩니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {expectedEffects.map((effect, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">{effect.label}</h4>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Before</p>
                    <p className="text-sm text-gray-500">{effect.before}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-green-500" />
                  <div className="text-center">
                    <p className="text-xs text-gray-400">After</p>
                    <p className="text-sm font-bold text-green-600">{effect.after}</p>
                  </div>
                </div>
                <div className="text-center pt-2 border-t border-green-100">
                  <span className="text-lg font-bold text-green-600">{effect.improvement}</span>
                  <span className="text-xs text-gray-500 ml-1">개선</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 기술 스택 */}
        <section className="bg-white rounded-xl p-5 lg:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">기술 스택</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map((stack, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">{stack.category}</h3>
                <div className="space-y-2">
                  {stack.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 개발 로드맵 */}
        <section className="bg-white rounded-xl p-5 lg:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">개발 로드맵</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roadmap.map((phase, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border-2 ${
                  phase.status === 'completed'
                    ? 'bg-green-50 border-green-200'
                    : phase.status === 'current'
                    ? 'bg-blue-50 border-blue-300'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    phase.status === 'completed'
                      ? 'bg-green-500 text-white'
                      : phase.status === 'current'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {phase.phase}
                  </span>
                  {phase.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                  {phase.status === 'current' && <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{phase.title}</h3>
                <ul className="space-y-1">
                  {phase.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-xs text-gray-600 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-gray-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 제작 정보 */}
        <section className="bg-gradient-to-r from-primary to-blue-700 rounded-xl p-5 lg:p-6 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-white/80 text-sm mb-1">2025 한국수력원자력 대국민 혁신 아이디어 공모전</p>
              <h2 className="text-2xl font-bold mb-2">SMR-BRAIN 프로젝트</h2>
              <p className="text-white/90">i-SMR의 글로벌 경쟁력을 AI로 완성합니다.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-2 bg-white/10 rounded-lg">
                <Shield className="w-6 h-6 mx-auto mb-1" />
                <p className="text-xs">안전 최우선</p>
              </div>
              <div className="text-center px-4 py-2 bg-white/10 rounded-lg">
                <Brain className="w-6 h-6 mx-auto mb-1" />
                <p className="text-xs">AI 혁신</p>
              </div>
              <div className="text-center px-4 py-2 bg-white/10 rounded-lg">
                <Globe className="w-6 h-6 mx-auto mb-1" />
                <p className="text-xs">글로벌 도약</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

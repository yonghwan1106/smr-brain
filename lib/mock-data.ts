import { 
  Sensor, Module, Alert, RULPrediction, MaintenanceSchedule, 
  Document, ChatMessage, PowerDistribution, DemandForecast,
  SystemStatus, AgentStatus, CollaborationEvent, ModuleId
} from './types';

// =====================
// 모듈 데이터
// =====================

export const modules: Module[] = [
  {
    id: 'module1',
    name: 'Module 1',
    status: 'running',
    power: 165,
    maxPower: 170,
    efficiency: 97.1,
    uptime: 8760,
    lastMaintenance: new Date('2024-09-15'),
    nextMaintenance: new Date('2025-03-15'),
  },
  {
    id: 'module2',
    name: 'Module 2',
    status: 'running',
    power: 168,
    maxPower: 170,
    efficiency: 98.8,
    uptime: 7200,
    lastMaintenance: new Date('2024-10-20'),
    nextMaintenance: new Date('2025-04-20'),
  },
  {
    id: 'module3',
    name: 'Module 3',
    status: 'running',
    power: 162,
    maxPower: 170,
    efficiency: 95.3,
    uptime: 6500,
    lastMaintenance: new Date('2024-11-01'),
    nextMaintenance: new Date('2025-05-01'),
  },
  {
    id: 'module4',
    name: 'Module 4',
    status: 'maintenance',
    power: 0,
    maxPower: 170,
    efficiency: 0,
    uptime: 0,
    lastMaintenance: new Date('2024-12-10'),
    nextMaintenance: new Date('2024-12-20'),
  },
];

// =====================
// 센서 데이터 생성
// =====================

const sensorTypes = [
  { type: 'temperature' as const, unit: '°C', prefix: 'T' },
  { type: 'pressure' as const, unit: 'MPa', prefix: 'P' },
  { type: 'vibration' as const, unit: 'mm/s', prefix: 'V' },
  { type: 'flow' as const, unit: 'kg/s', prefix: 'F' },
  { type: 'radiation' as const, unit: 'μSv/h', prefix: 'R' },
  { type: 'power' as const, unit: 'MW', prefix: 'E' },
];

const sensorLocations = [
  { name: 'Reactor Core', nameKr: '원자로 노심' },
  { name: 'Steam Generator', nameKr: '증기발생기' },
  { name: 'Primary Coolant', nameKr: '1차 냉각재' },
  { name: 'Secondary Coolant', nameKr: '2차 냉각재' },
  { name: 'Turbine', nameKr: '터빈' },
  { name: 'Condenser', nameKr: '복수기' },
  { name: 'Feedwater Pump', nameKr: '급수펌프' },
  { name: 'Containment', nameKr: '격납건물' },
];

function generateSensors(): Sensor[] {
  const sensors: Sensor[] = [];
  const moduleIds: ModuleId[] = ['module1', 'module2', 'module3', 'module4'];

  moduleIds.forEach((moduleId, mIdx) => {
    sensorTypes.forEach((sensorType, tIdx) => {
      sensorLocations.forEach((location, lIdx) => {
        const id = `${sensorType.prefix}-${mIdx + 1}-${lIdx + 1}`;
        
        let baseValue: number, minValue: number, maxValue: number, normalMin: number, normalMax: number;
        
        switch (sensorType.type) {
          case 'temperature':
            baseValue = 280 + Math.random() * 40;
            minValue = 0; maxValue = 400;
            normalMin = 260; normalMax = 330;
            break;
          case 'pressure':
            baseValue = 15 + Math.random() * 2;
            minValue = 0; maxValue = 20;
            normalMin = 14; normalMax = 17;
            break;
          case 'vibration':
            baseValue = 0.5 + Math.random() * 0.5;
            minValue = 0; maxValue = 5;
            normalMin = 0; normalMax = 1.5;
            break;
          case 'flow':
            baseValue = 400 + Math.random() * 100;
            minValue = 0; maxValue = 600;
            normalMin = 350; normalMax = 550;
            break;
          case 'radiation':
            baseValue = 0.1 + Math.random() * 0.1;
            minValue = 0; maxValue = 10;
            normalMin = 0; normalMax = 0.5;
            break;
          case 'power':
            baseValue = moduleId === 'module4' ? 0 : 160 + Math.random() * 10;
            minValue = 0; maxValue = 180;
            normalMin = 150; normalMax = 175;
            break;
          default:
            baseValue = 50; minValue = 0; maxValue = 100; normalMin = 20; normalMax = 80;
        }

        // 일부 센서에 경고/위험 상태 부여
        let status: Sensor['status'] = 'normal';
        if (moduleId === 'module4') {
          status = 'offline';
        } else if (Math.random() < 0.05) {
          status = 'warning';
          baseValue = normalMax + (maxValue - normalMax) * 0.3;
        } else if (Math.random() < 0.01) {
          status = 'danger';
          baseValue = normalMax + (maxValue - normalMax) * 0.7;
        }

        sensors.push({
          id,
          name: `${location.name} ${sensorType.type}`,
          nameKr: `${location.nameKr} ${sensorType.type === 'temperature' ? '온도' : 
                   sensorType.type === 'pressure' ? '압력' : 
                   sensorType.type === 'vibration' ? '진동' :
                   sensorType.type === 'flow' ? '유량' :
                   sensorType.type === 'radiation' ? '방사선' : '전력'}`,
          type: sensorType.type,
          unit: sensorType.unit,
          moduleId,
          value: baseValue,
          minValue,
          maxValue,
          normalMin,
          normalMax,
          status,
          lastUpdated: new Date(),
        });
      });
    });
  });

  return sensors;
}

export const sensors: Sensor[] = generateSensors();

// =====================
// 알림 데이터
// =====================

export const alerts: Alert[] = [
  {
    id: 'alert-001',
    timestamp: new Date(Date.now() - 5 * 60000),
    severity: 'warning',
    moduleId: 'module1',
    sensorId: 'V-1-7',
    title: '급수펌프 진동 증가',
    message: 'Module 1 급수펌프 베어링 진동이 정상 범위(0.8mm/s)를 0.3% 초과했습니다. 예방정비를 권장합니다.',
    acknowledged: false,
    agentSource: 'monitor',
  },
  {
    id: 'alert-002',
    timestamp: new Date(Date.now() - 30 * 60000),
    severity: 'info',
    moduleId: 'module2',
    title: '정비 일정 알림',
    message: 'Module 2 증기발생기 정기 점검이 30일 후 예정되어 있습니다.',
    acknowledged: true,
    agentSource: 'predict',
  },
  {
    id: 'alert-003',
    timestamp: new Date(Date.now() - 2 * 3600000),
    severity: 'warning',
    moduleId: 'module3',
    sensorId: 'T-3-1',
    title: '노심 출구 온도 상승',
    message: 'Module 3 노심 출구 온도가 평소 대비 2°C 상승했습니다. 냉각재 유량 점검을 권장합니다.',
    acknowledged: true,
    agentSource: 'monitor',
  },
  {
    id: 'alert-004',
    timestamp: new Date(Date.now() - 6 * 3600000),
    severity: 'critical',
    moduleId: 'module4',
    title: 'Module 4 정비 시작',
    message: 'Module 4가 계획된 예방정비를 위해 정지되었습니다. 예상 소요시간: 10일',
    acknowledged: true,
    agentSource: 'optimize',
  },
  {
    id: 'alert-005',
    timestamp: new Date(Date.now() - 12 * 3600000),
    severity: 'info',
    moduleId: 'module1',
    title: '출력 최적화 완료',
    message: 'Module 4 정비 기간 동안 Module 1-3 출력을 최적 분배했습니다. 총 출력: 495MW 유지',
    acknowledged: true,
    agentSource: 'optimize',
  },
];

// =====================
// RUL 예측 데이터
// =====================

export const rulPredictions: RULPrediction[] = [
  {
    equipmentId: 'EQ-001',
    equipmentName: 'Module 1 급수펌프',
    moduleId: 'module1',
    currentRUL: 45,
    confidence: 87,
    predictedFailureDate: new Date(Date.now() + 45 * 24 * 3600000),
    recommendedMaintenanceDate: new Date(Date.now() + 30 * 24 * 3600000),
    trend: 'declining',
  },
  {
    equipmentId: 'EQ-002',
    equipmentName: 'Module 1 증기발생기 튜브',
    moduleId: 'module1',
    currentRUL: 180,
    confidence: 92,
    predictedFailureDate: new Date(Date.now() + 180 * 24 * 3600000),
    recommendedMaintenanceDate: new Date(Date.now() + 150 * 24 * 3600000),
    trend: 'stable',
  },
  {
    equipmentId: 'EQ-003',
    equipmentName: 'Module 2 터빈 블레이드',
    moduleId: 'module2',
    currentRUL: 365,
    confidence: 78,
    predictedFailureDate: new Date(Date.now() + 365 * 24 * 3600000),
    recommendedMaintenanceDate: new Date(Date.now() + 300 * 24 * 3600000),
    trend: 'stable',
  },
  {
    equipmentId: 'EQ-004',
    equipmentName: 'Module 2 1차 냉각재 펌프',
    moduleId: 'module2',
    currentRUL: 120,
    confidence: 85,
    predictedFailureDate: new Date(Date.now() + 120 * 24 * 3600000),
    recommendedMaintenanceDate: new Date(Date.now() + 90 * 24 * 3600000),
    trend: 'stable',
  },
  {
    equipmentId: 'EQ-005',
    equipmentName: 'Module 3 복수기',
    moduleId: 'module3',
    currentRUL: 60,
    confidence: 91,
    predictedFailureDate: new Date(Date.now() + 60 * 24 * 3600000),
    recommendedMaintenanceDate: new Date(Date.now() + 45 * 24 * 3600000),
    trend: 'declining',
  },
  {
    equipmentId: 'EQ-006',
    equipmentName: 'Module 3 제어봉 구동장치',
    moduleId: 'module3',
    currentRUL: 240,
    confidence: 95,
    predictedFailureDate: new Date(Date.now() + 240 * 24 * 3600000),
    recommendedMaintenanceDate: new Date(Date.now() + 200 * 24 * 3600000),
    trend: 'stable',
  },
];

// =====================
// 정비 일정 데이터
// =====================

export const maintenanceSchedules: MaintenanceSchedule[] = [
  {
    id: 'MS-001',
    equipmentId: 'EQ-001',
    equipmentName: 'Module 1 급수펌프',
    moduleId: 'module1',
    scheduledDate: new Date(Date.now() + 30 * 24 * 3600000),
    type: 'predictive',
    priority: 'high',
    estimatedDuration: 24,
    status: 'scheduled',
    description: 'AI 예측정비: 베어링 진동 이상 징후 감지, 베어링 교체 권장',
  },
  {
    id: 'MS-002',
    equipmentId: 'EQ-002',
    equipmentName: 'Module 1 증기발생기 튜브',
    moduleId: 'module1',
    scheduledDate: new Date(Date.now() + 150 * 24 * 3600000),
    type: 'preventive',
    priority: 'medium',
    estimatedDuration: 72,
    status: 'scheduled',
    description: '정기 점검: 증기발생기 튜브 와전류 검사',
  },
  {
    id: 'MS-003',
    equipmentId: 'EQ-005',
    equipmentName: 'Module 3 복수기',
    moduleId: 'module3',
    scheduledDate: new Date(Date.now() + 45 * 24 * 3600000),
    type: 'predictive',
    priority: 'high',
    estimatedDuration: 48,
    status: 'scheduled',
    description: 'AI 예측정비: 진공도 저하 추세 감지, 튜브 세정 권장',
  },
  {
    id: 'MS-004',
    equipmentId: 'M4-ALL',
    equipmentName: 'Module 4 전체',
    moduleId: 'module4',
    scheduledDate: new Date('2024-12-10'),
    type: 'preventive',
    priority: 'high',
    estimatedDuration: 240,
    status: 'in-progress',
    description: '계획 예방정비: 연료 재장전 및 주요 기기 점검',
  },
];

// =====================
// 문서 데이터
// =====================

export const documents: Document[] = [
  {
    id: 'DOC-001',
    title: '급수펌프 베어링 교체 절차서',
    type: 'procedure',
    category: '정비 절차',
    lastUpdated: new Date('2024-06-15'),
    content: '1. 펌프 격리 및 드레인\n2. 커플링 분리\n3. 베어링 하우징 해체\n4. 베어링 검사 및 교체\n5. 재조립 및 정렬\n6. 시운전 및 진동 측정',
    tags: ['급수펌프', '베어링', '정비', 'Module 1'],
  },
  {
    id: 'DOC-002',
    title: '원자로 냉각재 계통 운전 절차서',
    type: 'procedure',
    category: '운전 절차',
    lastUpdated: new Date('2024-08-20'),
    content: '1. 냉각재 펌프 기동 조건 확인\n2. 펌프 기동 순서\n3. 유량 및 압력 확인\n4. 정상 운전 파라미터 감시',
    tags: ['냉각재', '운전', 'RCS'],
  },
  {
    id: 'DOC-003',
    title: '원자력안전법 시행규칙',
    type: 'regulation',
    category: '규제 문서',
    lastUpdated: new Date('2024-01-01'),
    content: '제1장 총칙\n제2장 원자력 이용시설\n제3장 방사성폐기물 관리\n제4장 원자력손해배상',
    tags: ['규제', '안전법', '법규'],
  },
  {
    id: 'DOC-004',
    title: 'i-SMR 기술 설명서',
    type: 'manual',
    category: '기술 문서',
    lastUpdated: new Date('2024-05-10'),
    content: '1. 설계 개요\n2. 원자로 계통\n3. 안전 계통\n4. 제어 계측 계통\n5. 다중모듈 운영',
    tags: ['i-SMR', '기술', '설계'],
  },
  {
    id: 'DOC-005',
    title: '진동 이상 대응 절차서',
    type: 'procedure',
    category: '비상 절차',
    lastUpdated: new Date('2024-07-22'),
    content: '1. 진동 이상 판단 기준\n2. 초기 대응 조치\n3. 원인 분석 절차\n4. 정비 의사결정 기준\n5. 복구 후 시험',
    tags: ['진동', '이상', '대응', '비상'],
  },
];

// =====================
// 챗봇 시나리오 응답
// =====================

export const chatResponses: Record<string, { answer: string; sources: Document[] }> = {
  '베어링': {
    answer: 'Module 1 급수펌프 베어링 진동이 현재 0.83mm/s로, 정상 상한(0.8mm/s)을 약간 초과하고 있습니다.\n\nPredict Agent 분석 결과:\n- 잔여수명(RUL): 약 45일\n- 권장 정비일: 30일 이내\n- 예상 작업시간: 24시간\n\n관련 절차서 "급수펌프 베어링 교체 절차서"를 참조하시기 바랍니다.',
    sources: [documents[0], documents[4]],
  },
  '급수펌프': {
    answer: 'Module 1 급수펌프 현재 상태:\n- 진동: 0.83mm/s (경고)\n- 온도: 45.2°C (정상)\n- 유량: 425kg/s (정상)\n\nAI 예측정비 시스템이 베어링 마모 징후를 감지했습니다. 30일 이내 예방정비를 권장합니다.',
    sources: [documents[0]],
  },
  '정비': {
    answer: '현재 예정된 정비 일정:\n\n1. Module 1 급수펌프 (30일 후) - 예측정비\n2. Module 3 복수기 (45일 후) - 예측정비\n3. Module 1 증기발생기 (150일 후) - 정기점검\n\nModule 4는 현재 계획 예방정비 중입니다 (잔여: 약 10일).',
    sources: [documents[0], documents[1]],
  },
  '출력': {
    answer: '현재 발전소 출력 상태:\n\n- Module 1: 165 MW (가동)\n- Module 2: 168 MW (가동)\n- Module 3: 162 MW (가동)\n- Module 4: 0 MW (정비 중)\n\n총 출력: 495 MW / 최대 680 MW\n\nOptimize Agent가 Module 4 정비 기간 동안 최적 출력 분배를 수행 중입니다.',
    sources: [],
  },
  '안전': {
    answer: 'i-SMR 안전 계통 현황:\n\n모든 안전 계통이 정상 대기 상태입니다.\n- 비상노심냉각계통 (ECCS): 정상\n- 격납건물 살수계통: 정상\n- 피동안전주입계통: 정상\n\n방사선 감시:\n- 격납건물 내부: 0.12 μSv/h (정상)\n- 부지 경계: 0.08 μSv/h (배경준위)',
    sources: [documents[2], documents[3]],
  },
};

// =====================
// 시스템 상태
// =====================

export const systemStatus: SystemStatus = {
  overallHealth: 'warning',
  activeAlerts: 2,
  modulesOnline: 3,
  totalModules: 4,
  totalPower: 495,
  maxPower: 680,
  efficiency: 96.4,
};

// =====================
// 에이전트 상태
// =====================

export const agentStatuses: AgentStatus[] = [
  {
    type: 'monitor',
    status: 'active',
    lastActivity: new Date(Date.now() - 5000),
    tasksCompleted: 15234,
    currentTask: '실시간 센서 데이터 분석 중',
  },
  {
    type: 'predict',
    status: 'processing',
    lastActivity: new Date(Date.now() - 60000),
    tasksCompleted: 892,
    currentTask: 'Module 1 급수펌프 RUL 재계산',
  },
  {
    type: 'assist',
    status: 'idle',
    lastActivity: new Date(Date.now() - 300000),
    tasksCompleted: 456,
  },
  {
    type: 'optimize',
    status: 'active',
    lastActivity: new Date(Date.now() - 30000),
    tasksCompleted: 1205,
    currentTask: '출력 분배 최적화 수행',
  },
];

// =====================
// 협업 이벤트
// =====================

export const collaborationEvents: CollaborationEvent[] = [
  {
    id: 'CE-001',
    timestamp: new Date(Date.now() - 5 * 60000),
    agents: ['monitor', 'predict', 'assist'],
    trigger: 'Module 1 급수펌프 진동 0.3% 편차 감지',
    action: 'Monitor→Predict: RUL 분석 요청\nPredict→Assist: 정비 절차서 검색 요청',
    result: '잔여수명 45일, 30일 후 정비 권고, 관련 절차서 3건 검색',
    status: 'completed',
  },
  {
    id: 'CE-002',
    timestamp: new Date(Date.now() - 6 * 3600000),
    agents: ['predict', 'optimize'],
    trigger: 'Module 4 계획정비 시작',
    action: 'Predict→Optimize: 정비 기간 중 출력 보상 요청',
    result: 'Module 1-3 출력 최적 분배, 총 495MW 유지 성공',
    status: 'completed',
  },
  {
    id: 'CE-003',
    timestamp: new Date(Date.now() - 2 * 3600000),
    agents: ['monitor', 'assist'],
    trigger: 'Module 3 노심 출구 온도 2°C 상승',
    action: 'Monitor→Assist: 운전원 알림 및 대응 가이드 제공',
    result: '운전원에게 냉각재 유량 점검 권고 전달 완료',
    status: 'completed',
  },
];

// =====================
// 전력 수요 예측 데이터
// =====================

export function generateDemandForecast(): DemandForecast[] {
  const forecasts: DemandForecast[] = [];
  const now = new Date();
  
  for (let i = -24; i <= 24; i++) {
    const timestamp = new Date(now.getTime() + i * 3600000);
    const hour = timestamp.getHours();
    
    // 시간대별 수요 패턴 (피크: 오전 10-12시, 오후 6-9시)
    let baseDemand = 450;
    if (hour >= 10 && hour <= 12) baseDemand = 550;
    else if (hour >= 18 && hour <= 21) baseDemand = 580;
    else if (hour >= 0 && hour <= 6) baseDemand = 380;
    
    const variation = Math.random() * 40 - 20;
    
    forecasts.push({
      timestamp,
      predictedDemand: baseDemand + variation,
      confidence: 85 + Math.random() * 10,
      actualDemand: i <= 0 ? baseDemand + variation + (Math.random() * 20 - 10) : undefined,
    });
  }
  
  return forecasts;
}

// =====================
// 시간별 센서 데이터 생성 (차트용)
// =====================

export function generateSensorHistory(sensorId: string, hours: number = 24): { time: string; value: number }[] {
  const sensor = sensors.find(s => s.id === sensorId);
  if (!sensor) return [];
  
  const history: { time: string; value: number }[] = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 3600000);
    const variation = sensor.value * 0.02 * (Math.random() - 0.5);
    
    history.push({
      time: timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      value: Number((sensor.value + variation).toFixed(2)),
    });
  }
  
  return history;
}

// =====================
// 실시간 센서값 업데이트 함수
// =====================

export function updateSensorValue(sensor: Sensor): Sensor {
  const variation = sensor.value * 0.005 * (Math.random() - 0.5);
  const newValue = Math.max(sensor.minValue, Math.min(sensor.maxValue, sensor.value + variation));
  
  let status: Sensor['status'] = 'normal';
  if (sensor.moduleId === 'module4') {
    status = 'offline';
  } else if (newValue < sensor.normalMin || newValue > sensor.normalMax) {
    const deviation = Math.abs(newValue - (newValue < sensor.normalMin ? sensor.normalMin : sensor.normalMax));
    const maxDeviation = (sensor.maxValue - sensor.minValue) * 0.15;
    status = deviation > maxDeviation ? 'danger' : 'warning';
  }
  
  return {
    ...sensor,
    value: newValue,
    status,
    lastUpdated: new Date(),
  };
}

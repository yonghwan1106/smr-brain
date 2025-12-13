// =====================
// 기본 타입 정의
// =====================

export type ModuleId = 'module1' | 'module2' | 'module3' | 'module4';
export type AgentType = 'monitor' | 'predict' | 'assist' | 'optimize';
export type SensorStatus = 'normal' | 'warning' | 'danger' | 'offline';
export type AlertSeverity = 'info' | 'warning' | 'critical';

// =====================
// 센서 관련 타입
// =====================

export interface Sensor {
  id: string;
  name: string;
  nameKr: string;
  type: 'temperature' | 'pressure' | 'vibration' | 'flow' | 'radiation' | 'power';
  unit: string;
  moduleId: ModuleId;
  value: number;
  minValue: number;
  maxValue: number;
  normalMin: number;
  normalMax: number;
  status: SensorStatus;
  lastUpdated: Date;
}

export interface SensorReading {
  timestamp: Date;
  value: number;
}

export interface SensorHistory {
  sensorId: string;
  readings: SensorReading[];
}

// =====================
// 알림 관련 타입
// =====================

export interface Alert {
  id: string;
  timestamp: Date;
  severity: AlertSeverity;
  moduleId: ModuleId;
  sensorId?: string;
  title: string;
  message: string;
  acknowledged: boolean;
  agentSource: AgentType;
}

// =====================
// 모듈 관련 타입
// =====================

export interface Module {
  id: ModuleId;
  name: string;
  status: 'running' | 'maintenance' | 'standby' | 'offline';
  power: number;
  maxPower: number;
  efficiency: number;
  uptime: number;
  lastMaintenance: Date;
  nextMaintenance: Date;
}

// =====================
// 예측 관련 타입
// =====================

export interface RULPrediction {
  equipmentId: string;
  equipmentName: string;
  moduleId: ModuleId;
  currentRUL: number;
  confidence: number;
  predictedFailureDate: Date;
  recommendedMaintenanceDate: Date;
  trend: 'stable' | 'declining' | 'critical';
}

export interface MaintenanceSchedule {
  id: string;
  equipmentId: string;
  equipmentName: string;
  moduleId: ModuleId;
  scheduledDate: Date;
  type: 'preventive' | 'predictive' | 'corrective';
  priority: 'low' | 'medium' | 'high';
  estimatedDuration: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  description: string;
}

export interface FailureProbability {
  equipmentId: string;
  equipmentName: string;
  moduleId: ModuleId;
  probability: number;
  timeframe: '7days' | '30days' | '90days';
}

// =====================
// 챗봇 관련 타입
// =====================

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: DocumentReference[];
}

export interface DocumentReference {
  id: string;
  title: string;
  type: 'procedure' | 'regulation' | 'manual' | 'report';
  relevance: number;
  excerpt: string;
}

export interface Document {
  id: string;
  title: string;
  type: 'procedure' | 'regulation' | 'manual' | 'report';
  category: string;
  lastUpdated: Date;
  content: string;
  tags: string[];
}

// =====================
// 최적화 관련 타입
// =====================

export interface PowerDistribution {
  timestamp: Date;
  modules: {
    moduleId: ModuleId;
    currentPower: number;
    targetPower: number;
    efficiency: number;
  }[];
  totalPower: number;
  totalDemand: number;
}

export interface DemandForecast {
  timestamp: Date;
  predictedDemand: number;
  confidence: number;
  actualDemand?: number;
}

export interface EconomicDispatch {
  timestamp: Date;
  totalCost: number;
  fuelCost: number;
  maintenanceCost: number;
  emissionCost: number;
  optimizationGain: number;
}

// =====================
// 대시보드 관련 타입
// =====================

export interface SystemStatus {
  overallHealth: 'healthy' | 'warning' | 'critical';
  activeAlerts: number;
  modulesOnline: number;
  totalModules: number;
  totalPower: number;
  maxPower: number;
  efficiency: number;
}

export interface AgentStatus {
  type: AgentType;
  status: 'active' | 'idle' | 'processing' | 'error';
  lastActivity: Date;
  tasksCompleted: number;
  currentTask?: string;
}

export interface CollaborationEvent {
  id: string;
  timestamp: Date;
  agents: AgentType[];
  trigger: string;
  action: string;
  result: string;
  status: 'in-progress' | 'completed' | 'failed';
}
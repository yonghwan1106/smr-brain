'use client';

import { cn, formatRelativeTime } from '@/lib/utils';
import { Alert, AlertSeverity } from '@/lib/types';
import { AlertTriangle, Info, XCircle, Check, X } from 'lucide-react';

const severityConfig: Record<AlertSeverity, {
  icon: typeof AlertTriangle;
  bgColor: string;
  textColor: string;
  borderColor: string;
  label: string;
}> = {
  info: {
    icon: Info,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    label: '정보',
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-warning/10',
    textColor: 'text-warning',
    borderColor: 'border-warning/30',
    label: '경고',
  },
  critical: {
    icon: XCircle,
    bgColor: 'bg-danger/10',
    textColor: 'text-danger',
    borderColor: 'border-danger/30',
    label: '위험',
  },
};

interface AlertItemProps {
  alert: Alert;
  onAcknowledge?: (id: string) => void;
}

export function AlertItem({ alert, onAcknowledge }: AlertItemProps) {
  const config = severityConfig[alert.severity];
  const Icon = config.icon;

  return (
    <div className={cn(
      "p-4 rounded-lg border",
      config.bgColor,
      config.borderColor,
      alert.acknowledged && "opacity-60"
    )}>
      <div className="flex items-start gap-3">
        <div className={cn("mt-0.5", config.textColor)}>
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn("text-xs font-medium px-2 py-0.5 rounded", config.bgColor, config.textColor)}>
              {config.label}
            </span>
            <span className="text-xs text-gray-500">{alert.moduleId.toUpperCase()}</span>
            <span className="text-xs text-gray-400">{formatRelativeTime(alert.timestamp)}</span>
          </div>

          <h4 className={cn("text-sm font-semibold mb-1", config.textColor)}>{alert.title}</h4>
          <p className="text-sm text-gray-600">{alert.message}</p>

          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-gray-400">Source: {alert.agentSource}</span>
            {alert.sensorId && (
              <span className="text-xs text-gray-400">| Sensor: {alert.sensorId}</span>
            )}
          </div>
        </div>

        {!alert.acknowledged && onAcknowledge && (
          <button
            onClick={() => onAcknowledge(alert.id)}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-white rounded transition-colors"
            title="확인"
          >
            <Check className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

interface AlertPanelProps {
  alerts: Alert[];
  onAcknowledge?: (id: string) => void;
  maxItems?: number;
}

export function AlertPanel({ alerts, onAcknowledge, maxItems = 5 }: AlertPanelProps) {
  const displayAlerts = alerts.slice(0, maxItems);
  const unacknowledged = alerts.filter(a => !a.acknowledged).length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">⚠️ 알림</h2>
          <p className="text-sm text-gray-500">
            {unacknowledged > 0 ? `${unacknowledged}건의 새 알림` : '모든 알림 확인됨'}
          </p>
        </div>
        {unacknowledged > 0 && (
          <span className="px-2.5 py-1 bg-danger text-white text-xs font-medium rounded-full">
            {unacknowledged}
          </span>
        )}
      </div>

      <div className="p-4 space-y-3">
        {displayAlerts.map((alert) => (
          <AlertItem key={alert.id} alert={alert} onAcknowledge={onAcknowledge} />
        ))}
      </div>

      {alerts.length > maxItems && (
        <div className="p-4 border-t border-gray-100">
          <button className="text-sm text-primary hover:text-primary-dark font-medium">
            전체 {alerts.length}건 보기 →
          </button>
        </div>
      )}
    </div>
  );
}

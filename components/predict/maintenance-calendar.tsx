'use client';

import { MaintenanceSchedule } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Calendar, Wrench, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

interface MaintenanceCalendarProps {
  schedules: MaintenanceSchedule[];
}

export function MaintenanceCalendar({ schedules }: MaintenanceCalendarProps) {
  const sortedSchedules = [...schedules].sort(
    (a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime()
  );

  const typeConfig = {
    preventive: { label: '예방정비', color: 'bg-monitor', icon: Wrench },
    predictive: { label: 'AI 예측정비', color: 'bg-predict', icon: AlertTriangle },
    corrective: { label: '수정정비', color: 'bg-danger', icon: AlertTriangle },
  };

  const statusConfig = {
    scheduled: { label: '예정', color: 'text-monitor', bgColor: 'bg-monitor/10' },
    'in-progress': { label: '진행 중', color: 'text-warning', bgColor: 'bg-warning/10' },
    completed: { label: '완료', color: 'text-success', bgColor: 'bg-success/10' },
    cancelled: { label: '취소', color: 'text-gray-400', bgColor: 'bg-gray-100' },
  };

  const priorityConfig = {
    low: { label: '낮음', color: 'text-gray-500' },
    medium: { label: '보통', color: 'text-monitor' },
    high: { label: '높음', color: 'text-danger' },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <Calendar className="w-5 h-5 text-predict" />
          <h3 className="text-lg font-bold text-gray-900">정비 일정</h3>
        </div>
        <p className="text-sm text-gray-500">AI 예측정비 및 계획정비 일정</p>
      </div>

      <div className="divide-y divide-gray-100">
        {sortedSchedules.map((schedule) => {
          const type = typeConfig[schedule.type];
          const status = statusConfig[schedule.status];
          const priority = priorityConfig[schedule.priority];
          const TypeIcon = type.icon;

          const daysUntil = Math.ceil(
            (schedule.scheduledDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
          );

          return (
            <div key={schedule.id} className="p-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                {/* 날짜 박스 */}
                <div className="w-16 h-16 rounded-xl bg-gray-100 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-xs text-gray-500">
                    {schedule.scheduledDate.toLocaleDateString('ko-KR', { month: 'short' })}
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    {schedule.scheduledDate.getDate()}
                  </span>
                </div>

                {/* 정비 정보 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-xs font-medium text-white",
                      type.color
                    )}>
                      {type.label}
                    </span>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-xs font-medium",
                      status.bgColor, status.color
                    )}>
                      {status.label}
                    </span>
                    <span className={cn("text-xs", priority.color)}>
                      우선순위: {priority.label}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-gray-900 mb-1">
                    {schedule.equipmentName}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">{schedule.description}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      예상 소요: {schedule.estimatedDuration}시간
                    </span>
                    {schedule.status === 'scheduled' && (
                      <span className={cn(
                        "font-medium",
                        daysUntil <= 7 ? 'text-danger' : 
                        daysUntil <= 30 ? 'text-warning' : 'text-gray-500'
                      )}>
                        D-{daysUntil}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 간단한 캘린더 뷰
export function CalendarView({ schedules }: MaintenanceCalendarProps) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // 이번 달의 일수 계산
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // 정비 일정이 있는 날짜들
  const scheduledDates = schedules.reduce((acc, s) => {
    const date = s.scheduledDate.getDate();
    const month = s.scheduledDate.getMonth();
    if (month === currentMonth) {
      acc[date] = s;
    }
    return acc;
  }, {} as Record<number, MaintenanceSchedule>);

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-10" />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const schedule = scheduledDates[day];
    const isToday = day === today.getDate();
    
    days.push(
      <div 
        key={day}
        className={cn(
          "h-10 flex items-center justify-center rounded-lg text-sm",
          isToday && "bg-primary text-white font-bold",
          !isToday && schedule && "bg-predict/20 text-predict font-medium",
          !isToday && !schedule && "text-gray-600 hover:bg-gray-100"
        )}
      >
        {day}
        {schedule && !isToday && (
          <div className="w-1.5 h-1.5 rounded-full bg-predict absolute mt-6" />
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        📅 {currentYear}년 {currentMonth + 1}월
      </h3>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map(d => (
          <div key={d} className="h-8 flex items-center justify-center text-xs text-gray-500 font-medium">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 relative">
        {days}
      </div>
    </div>
  );
}

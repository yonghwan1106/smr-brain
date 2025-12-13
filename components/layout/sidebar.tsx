'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Activity, 
  LineChart, 
  MessageSquare, 
  Zap,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: '대시보드', href: '/', icon: LayoutDashboard },
  { name: 'Monitor Agent', href: '/monitor', icon: Activity, color: 'text-monitor' },
  { name: 'Predict Agent', href: '/predict', icon: LineChart, color: 'text-predict' },
  { name: 'Assist Agent', href: '/assist', icon: MessageSquare, color: 'text-assist' },
  { name: 'Optimize Agent', href: '/optimize', icon: Zap, color: 'text-optimize' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen bg-primary transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-primary-light">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-monitor to-optimize flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-white font-bold text-lg">SMR-BRAIN</span>
            </Link>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-monitor to-optimize flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-sm">S</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                  isActive 
                    ? "bg-white/10 text-white" 
                    : "text-white/70 hover:bg-white/5 hover:text-white",
                  collapsed && "justify-center"
                )}
              >
                <item.icon className={cn("w-5 h-5 flex-shrink-0", item.color)} />
                {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-primary-light">
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-all",
              collapsed && "justify-center"
            )}
          >
            <Settings className="w-5 h-5" />
            {!collapsed && <span className="text-sm">설정</span>}
          </Link>
        </div>

        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-primary border border-primary-light flex items-center justify-center text-white hover:bg-primary-light transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}

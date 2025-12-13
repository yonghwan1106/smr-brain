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
  ChevronLeft,
  ChevronRight,
  X,
  Info
} from 'lucide-react';
import { useSidebar } from '@/lib/sidebar-context';

const navigation = [
  { name: '대시보드', href: '/', icon: LayoutDashboard },
  { name: 'Monitor Agent', href: '/monitor', icon: Activity, color: 'text-monitor' },
  { name: 'Predict Agent', href: '/predict', icon: LineChart, color: 'text-predict' },
  { name: 'Assist Agent', href: '/assist', icon: MessageSquare, color: 'text-assist' },
  { name: 'Optimize Agent', href: '/optimize', icon: Zap, color: 'text-optimize' },
  { name: '프로젝트 소개', href: '/about', icon: Info },
];

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggle, isMobile, mobileOpen, setMobileOpen } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  // 모바일 오버레이
  if (isMobile) {
    return (
      <>
        {/* 오버레이 배경 */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* 모바일 사이드바 */}
        <aside className={cn(
          "fixed left-0 top-0 z-50 h-screen bg-primary transition-transform duration-300 w-64 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex h-full flex-col">
            {/* Logo & Close */}
            <div className="flex h-16 items-center justify-between px-4 border-b border-primary-light">
              <Link href="/" className="flex items-center gap-2" onClick={handleLinkClick}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-monitor to-optimize flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-white font-bold text-lg">SMR-BRAIN</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5 flex-shrink-0", item.color)} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom section */}
            <div className="p-4 border-t border-primary-light">
              <div className="flex items-center gap-3 px-3 py-2.5 text-white/50 text-xs">
                <span>SMR-BRAIN v0.1</span>
              </div>
            </div>
          </div>
        </aside>
      </>
    );
  }

  // 데스크톱 사이드바
  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen bg-primary transition-all duration-300 hidden lg:block",
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
          <div className={cn(
            "flex items-center gap-3 px-3 py-2.5 text-white/50 text-xs",
            collapsed && "justify-center"
          )}>
            {!collapsed && <span>SMR-BRAIN v0.1</span>}
          </div>
        </div>

        {/* Collapse button */}
        <button
          onClick={toggle}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-primary border border-primary-light flex items-center justify-center text-white hover:bg-primary-light transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}

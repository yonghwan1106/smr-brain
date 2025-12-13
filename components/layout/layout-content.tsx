'use client';

import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { useSidebar } from '@/lib/sidebar-context';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';

interface LayoutContentProps {
  children: ReactNode;
}

export function LayoutContent({ children }: LayoutContentProps) {
  const { collapsed, isMobile, setMobileOpen } = useSidebar();

  return (
    <>
      <Sidebar />

      {/* 모바일 헤더 */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 h-14 bg-primary z-30 flex items-center px-4 lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-white hover:bg-white/10 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2 ml-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-monitor to-optimize flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="text-white font-bold">SMR-BRAIN</span>
          </div>
        </div>
      )}

      <main className={cn(
        "min-h-screen bg-gray-50 transition-all duration-300",
        isMobile ? "ml-0 pt-14" : (collapsed ? "lg:ml-16" : "lg:ml-64")
      )}>
        {children}
      </main>
    </>
  );
}

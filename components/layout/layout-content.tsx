'use client';

import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { useSidebar } from '@/lib/sidebar-context';
import { cn } from '@/lib/utils';

interface LayoutContentProps {
  children: ReactNode;
}

export function LayoutContent({ children }: LayoutContentProps) {
  const { collapsed } = useSidebar();

  return (
    <>
      <Sidebar />
      <main className={cn(
        "min-h-screen bg-gray-50 transition-all duration-300",
        collapsed ? "ml-16" : "ml-64"
      )}>
        {children}
      </main>
    </>
  );
}

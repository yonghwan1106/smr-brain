import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "@/lib/sidebar-context";
import { LayoutContent } from "@/components/layout/layout-content";

export const metadata: Metadata = {
  title: "SMR-BRAIN | i-SMR 지능형 AI 에이전트 통합운영 플랫폼",
  description: "SMR-Based Reactive AI Network - 4대 AI 에이전트 협업 기반 i-SMR 자율운영 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <SidebarProvider>
          <LayoutContent>{children}</LayoutContent>
        </SidebarProvider>
      </body>
    </html>
  );
}

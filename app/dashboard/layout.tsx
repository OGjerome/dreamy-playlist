"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { BackgroundEffects } from "@/components/background-effects";
import { DashboardHeader } from "@/components/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-950">
      <BackgroundEffects />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />
          <div className="">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

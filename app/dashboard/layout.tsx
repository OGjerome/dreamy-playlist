"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type React from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { BackgroundEffects } from "@/components/background-effects";
import { DashboardHeader } from "@/components/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Music } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  // Loading state — show a spinner while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30 animate-pulse">
            <Music className="w-7 h-7 text-white" />
          </div>
          <p className="text-gray-400 text-sm">Chargement...</p>
        </div>
      </div>
    );
  }

  // Not authenticated — redirect in progress
  if (!session) {
    return null;
  }

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

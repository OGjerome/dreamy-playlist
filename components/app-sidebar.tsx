"use client";

import {
  Home,
  Link2,
  LogOut,
  Music,
  Plus,
  Settings,
  Share2,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Accueil",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Mes playlists",
    url: "/dashboard/playlists",
    icon: Music,
  },
  {
    title: "Créer une playlist",
    url: "/dashboard/create",
    icon: Plus,
  },
  {
    title: "Plateformes connectées",
    url: "/dashboard/platforms",
    icon: Link2,
  },
  {
    title: "Partage",
    url: "/dashboard/share",
    icon: Share2,
  },
  {
    title: "Paramètres",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const { data: session } = useSession();

  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [pathname, isMobile, setOpenMobile]);

  const userName = session?.user?.name ?? "Utilisateur";
  const userEmail = session?.user?.email ?? "";
  const userImage = session?.user?.image ?? "";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Sidebar className="border-r border-violet-500/20 bg-gray-950/95 backdrop-blur-xl">
      <SidebarHeader className="border-b bg-gray-950 border-violet-500/20 p-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Music className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            OmniGroove
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-4 bg-gray-950">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="text-gray-400  hover:text-white hover:bg-violet-500/20 data-[active=true]:bg-gradient-to-r data-[active=true]:bg-violet-500/20 data-[active=true]:text-white border-0 transition-all duration-300 rounded-lg"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t bg-gray-950 border-violet-500/20 p-4">
        <div className="space-y-4">
          {/* Spotify connected indicator */}
          {session && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-sm text-gray-300">Spotify connecté</span>
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start p-3 h-auto"
              >
                <Avatar className="h-8 w-8 border-2 border-violet-500/30">
                  <AvatarImage src={userImage} alt={userName} />
                  <AvatarFallback className="bg-gradient-to-r from-violet-500 to-blue-500 text-white text-sm">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3 text-left">
                  <p className="text-sm font-medium text-white">{userName}</p>
                  <p className="text-xs text-gray-400 truncate max-w-[140px]">
                    {userEmail}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-gray-900/95 backdrop-blur-xl border-violet-500/30"
              align="end"
            >
              <DropdownMenuLabel className="text-gray-300">
                Mon compte
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-violet-500/30" />
              <DropdownMenuItem
                asChild
                className="text-gray-300 hover:text-white hover:bg-violet-500/20"
              >
                <Link href="/dashboard/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="text-gray-300 hover:text-white hover:bg-violet-500/20"
              >
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-violet-500/30" />
              <DropdownMenuItem
                onClick={() => signOut({ redirectTo: "/" })}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/20 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

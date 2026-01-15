"use client"

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-violet-500/20 bg-gray-950/80 backdrop-blur-xl px-6">
      <SidebarTrigger className="text-gray-400 hover:text-white" />

      <div className="flex-1 flex items-center gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            placeholder="Rechercher dans vos playlists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-900/50 border-violet-500/30 text-white placeholder:text-gray-500 focus:border-violet-400 focus:ring-violet-400/20 rounded-lg"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          size="sm"
          className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-violet-500/30"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle playlist
        </Button>
      </div>
    </header>
  )
}

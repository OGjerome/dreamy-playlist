"use client";

import { Heart, Play, Search, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Données factices (100% Spotify)
const playlists = [
  {
    id: 1,
    name: "Summer Vibes 2025",
    icon: "https://external-preview.redd.it/skeleton-wlr-very-chill-playlist-v0-SQkNKj5s_4m-OYB8SOapRtNf3tf1oT3ZQcdev8Y0UJI.jpg?auto=webp&s=c622a1c1963cb1e77137abd029d4f95b677d59b2",
    tracks: 24,
    duration: "1h",
    lastModified: "Il y a 2 jours",
    isLiked: true,
  },
  {
    id: 2,
    name: "Workout Energy",
    icon: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8465af6680de29e27a02db4585",
    tracks: 18,
    duration: "58min",
    lastModified: "Il y a 1 semaine",
    isLiked: false,
  },
  {
    id: 3,
    name: "Chill Evening",
    icon: "https://i1.sndcdn.com/artworks-000321524016-jw118f-t500x500.jpg",
    tracks: 31,
    duration: "2h 15min",
    lastModified: "Il y a 3 jours",
    isLiked: true,
  },
  {
    id: 4,
    name: "Road Trip Classics",
    icon: "https://t4.ftcdn.net/jpg/02/70/65/01/360_F_270650173_MZnLWAW6aCmsC2RTrPTLZDsJik4QrjA4.jpg",
    tracks: 45,
    duration: "1h 12min",
    lastModified: "Il y a 5 jours",
    isLiked: false,
  },
];

export default function PlaylistsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header de la page */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Mes Playlists</h1>
            <p className="text-gray-400 mt-1">
              Gérez et synchronisez vos sélections Spotify
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                placeholder="Rechercher une playlist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900/50 border-violet-500/30 text-white placeholder:text-gray-500 focus:border-violet-400 focus:ring-violet-400/20"
              />
            </div>
            <Button
              asChild
              className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white border-0"
            >
              <Link href="/dashboard/create">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle
              </Link>
            </Button>
          </div>
        </div>

        {/* Grille des playlists */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {playlists.map((playlist) => (
            <Link
              href={`/dashboard/playlists/${playlist.id}`}
              key={playlist.id}
              className="block group"
            >
              <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm hover:bg-gray-900/70 hover:border-violet-500/50 transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {/* Image et bouton Play */}
                    <div className="relative aspect-square w-full rounded-md overflow-hidden shadow-lg">
                      <Image
                        src={playlist.icon}
                        alt={playlist.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          size="icon"
                          className="w-12 h-12 rounded-full bg-violet-500 hover:bg-violet-600 text-white border-0 shadow-xl scale-90 group-hover:scale-100 transition-transform"
                        >
                          <Play className="w-5 h-5 ml-1" />
                        </Button>
                      </div>
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center shadow-lg bg-black/50 backdrop-blur-md overflow-hidden">
                          <Image
                            src="/spotify.png"
                            alt="Spotify"
                            width={16}
                            height={16}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Infos de la playlist */}
                    <div>
                      <h3 className="font-semibold text-white truncate group-hover:text-violet-400 transition-colors">
                        {playlist.name}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-400">
                          {playlist.tracks} morceaux • {playlist.duration}
                        </p>
                        <Heart
                          className={`w-4 h-4 ${playlist.isLiked ? "text-red-400 fill-current" : "text-gray-500"}`}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

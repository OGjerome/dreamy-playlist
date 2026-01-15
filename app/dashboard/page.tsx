"use client";

import {
  Download,
  Edit3,
  Headphones,
  Heart,
  Link2,
  MoreHorizontal,
  Music,
  Play,
  Plus,
  Share2,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const playlists = [
  {
    id: 1,
    name: "Summer Vibes 2025",
    icon: "https://external-preview.redd.it/skeleton-wlr-very-chill-playlist-v0-SQkNKj5s_4m-OYB8SOapRtNf3tf1oT3ZQcdev8Y0UJI.jpg?auto=webp&s=c622a1c1963cb1e77137abd029d4f95b677d59b2",
    tracks: 24,
    duration: "1h",
    platforms: ["spotify", "deezer", "youtube", "apple"],
    lastModified: "Il y a 2 jours",
    isLiked: true,
  },
  {
    id: 2,
    name: "Workout Energy",
    icon: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8465af6680de29e27a02db4585",
    tracks: 18,
    duration: "58min",
    platforms: ["spotify", "youtube", "soundcloud"],
    lastModified: "Il y a 1 semaine",
    isLiked: false,
  },
  {
    id: 3,
    name: "Chill Evening",
    icon: "https://i1.sndcdn.com/artworks-000321524016-jw118f-t500x500.jpg",
    tracks: 31,
    duration: "2h 15min",
    platforms: ["spotify", "deezer", "apple"],
    lastModified: "Il y a 3 jours",
    isLiked: true,
  },
  {
    id: 4,
    name: "Road Trip Classics",
    icon: "https://t4.ftcdn.net/jpg/02/70/65/01/360_F_270650173_MZnLWAW6aCmsC2RTrPTLZDsJik4QrjA4.jpg",
    tracks: 45,
    duration: "1h 12min",
    platforms: ["spotify", "deezer", "youtube", "soundcloud", "apple"],
    lastModified: "Il y a 5 jours",
    isLiked: false,
  },
];

const platformIcons = {
  spotify: (
    <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 overflow-hidden">
      <Image
        src="/spotify.png"
        alt="Spotify"
        width={20}
        height={20}
        className="w-full h-full object-cover"
      />
    </div>
  ),
  deezer: (
    <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 overflow-hidden">
      <Image
        src="/deezer.jpg"
        alt="Deezer"
        width={20}
        height={20}
        className="w-full h-full object-cover"
      />
    </div>
  ),
  youtube: (
    <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 overflow-hidden">
      <Image
        src="/youtube-music.png"
        alt="YouTube Music"
        width={20}
        height={20}
        className="w-full h-full object-cover"
      />
    </div>
  ),
  apple: (
    <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-gray-500/30 overflow-hidden">
      <Image
        src="/apple-music.png"
        alt="Apple Music"
        width={20}
        height={20}
        className="w-full h-full object-cover"
      />
    </div>
  ),
  soundcloud: (
    <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-orange-600/30 overflow-hidden">
      <Image
        src="/soundcloud.webp"
        alt="SoundCloud"
        width={20}
        height={20}
        className="w-full h-full object-cover"
      />
    </div>
  ),
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="flex-1 p-6 relative">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Bonjour John 👋</h1>
            <p className="text-gray-400">
              Gérez vos playlists et exportez-les vers vos plateformes préférées
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gray-900/50 border-violet-500/30 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  Total Playlists
                </CardTitle>
                <Music className="h-4 w-4 text-violet-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">12</div>
                <p className="text-xs text-gray-400">+2 ce mois-ci</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-blue-500/30 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  Total Morceaux
                </CardTitle>
                <Headphones className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">347</div>
                <p className="text-xs text-gray-400">+23 cette semaine</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-green-500/30 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  Plateformes
                </CardTitle>
                <Link2 className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">5</div>
                <p className="text-xs text-gray-400">Toutes connectées</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-orange-500/30 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  Partages
                </CardTitle>
                <Share2 className="h-4 w-4 text-orange-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">28</div>
                <p className="text-xs text-gray-400">+5 cette semaine</p>
              </CardContent>
            </Card>
          </div>

          {/* Playlists Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Mes Playlists</h2>
              <Button
                asChild
                variant="outline"
                className="border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:text-white bg-transparent"
              >
                <Link href="/dashboard/playlists">Voir tout</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {playlists.map((playlist) => (
                <Card
                  key={playlist.id}
                  className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm hover:bg-gray-900/70 hover:border-violet-500/40 transition-all duration-300 group cursor-pointer"
                >
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-md flex items-center justify-center">
                              <Image
                                src={playlist.icon}
                                alt={playlist.name}
                                width={50}
                                height={50}
                                className="w-full h-full object-cover rounded-md"
                              />
                            </div>
                            <Button
                              size="sm"
                              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white text-gray-900 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300 p-0"
                            >
                              <Play className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white truncate">
                              {playlist.name}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {playlist.tracks} morceaux • {playlist.duration}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto ${
                              playlist.isLiked
                                ? "text-red-400"
                                : "text-gray-400"
                            } hover:text-red-400`}
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                playlist.isLiked ? "fill-current" : ""
                              }`}
                            />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white p-1 h-auto"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-900/95 backdrop-blur-xl border-violet-500/30">
                              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-violet-500/20">
                                <Play className="mr-2 h-4 w-4" />
                                Écouter
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-violet-500/20">
                                <Edit3 className="mr-2 h-4 w-4" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-violet-500/20">
                                <Share2 className="mr-2 h-4 w-4" />
                                Partager
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-violet-500/20">
                                <Download className="mr-2 h-4 w-4" />
                                Exporter
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-violet-500/30" />
                              <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-red-500/20">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {playlist.platforms.map((platform) => (
                            <div key={platform} className="relative">
                              {
                                platformIcons[
                                  platform as keyof typeof platformIcons
                                ]
                              }
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          {playlist.lastModified}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white border-0 text-xs shadow-lg shadow-violet-500/30"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Exporter
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:text-white text-xs bg-transparent"
                        >
                          <Share2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <Card className="bg-gray-900/50 border-violet-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Actions rapides</CardTitle>
              <CardDescription className="text-gray-400">
                Créez et gérez vos playlists en quelques clics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  asChild
                  className="h-20 bg-gradient-to-br from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white border-0 flex-col gap-2 shadow-lg shadow-violet-500/30"
                >
                  <Link href="/dashboard/create">
                    <Plus className="w-6 h-6" />
                    Créer une playlist
                  </Link>
                </Button>
                <Button
                  asChild
                  className="h-20 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 flex-col gap-2 shadow-lg shadow-blue-500/30"
                >
                  <Link href="/dashboard/platforms">
                    <Link2 className="w-6 h-6" />
                    Connecter une plateforme
                  </Link>
                </Button>
                <Button
                  asChild
                  className="h-20 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 flex-col gap-2 shadow-lg shadow-green-500/30"
                >
                  <Link href="/dashboard/share">
                    <Share2 className="w-6 h-6" />
                    Partager une playlist
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

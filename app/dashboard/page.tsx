"use client";

import {
  Download,
  Edit3,
  ExternalLink,
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
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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

interface PlatformLink {
  id: string;
  platform: string;
  externalId: string;
  url: string;
}

interface Track {
  id: string;
  title: string;
  artist: string;
  imageUrl: string | null;
  links: PlatformLink[];
}

interface TrackInPlaylist {
  position: number;
  track: Track;
}

interface Playlist {
  id: string;
  title: string;
  description: string | null;
  isPublic: boolean;
  shareToken: string;
  tracks: TrackInPlaylist[];
  createdAt: string;
  updatedAt: string;
}

const platformIcons = {
  SPOTIFY: (
    <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 overflow-hidden">
      <Image src="/spotify.png" alt="Spotify" width={20} height={20} className="w-full h-full object-cover" />
    </div>
  ),
  DEEZER: (
    <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 overflow-hidden">
      <Image src="/deezer.jpg" alt="Deezer" width={20} height={20} className="w-full h-full object-cover" />
    </div>
  ),
  YOUTUBE_MUSIC: (
    <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 overflow-hidden">
      <Image src="/youtube-music.png" alt="YouTube Music" width={20} height={20} className="w-full h-full object-cover" />
    </div>
  ),
  APPLE_MUSIC: (
    <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-gray-500/30 overflow-hidden">
      <Image src="/apple-music.png" alt="Apple Music" width={20} height={20} className="w-full h-full object-cover" />
    </div>
  ),
  SOUNDCLOUD: (
    <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-orange-600/30 overflow-hidden">
      <Image src="/soundcloud.webp" alt="SoundCloud" width={20} height={20} className="w-full h-full object-cover" />
    </div>
  ),
};


function getPlaylistPlatforms(tracks: TrackInPlaylist[]): string[] {
  const platforms = new Set<string>();
  for (const t of tracks) {
    for (const link of t.track.links) {
      platforms.add(link.platform);
    }
  }
  return Array.from(platforms);
}

function getPlaylistCover(tracks: TrackInPlaylist[]): string | null {
  for (const t of tracks) {
    if (t.track.imageUrl) return t.track.imageUrl;
  }
  return null;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const res = await fetch("/api/playlists");
        if (res.ok) {
          const data = await res.json() as { playlists: Playlist[] };
          setPlaylists(data.playlists);
        }
      } catch (err) {
        console.error("Failed to fetch playlists:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPlaylists();
  }, []);

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette playlist ?")) return;

    // Optimistic update
    const previousPlaylists = playlists;
    setPlaylists((prev) => prev.filter((p) => p.id !== id));

    try {
      const res = await fetch(`/api/playlists/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Erreur lors de la suppression");
      }
    } catch (err) {
      console.error("Failed to delete playlist:", err);
      // Rollback en cas d'erreur
      setPlaylists(previousPlaylists);
    }
  };

  const [exportingId, setExportingId] = useState<string | null>(null);

  const handleExport = async (playlistId: string) => {
    try {
      setExportingId(playlistId);
      const res = await fetch("/api/spotify/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playlistId }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de l'export");
      }
      if (data.spotifyUrl) {
        window.open(data.spotifyUrl, "_blank");
      }
    } catch (err) {
      console.error("Export failed:", err);
      alert("Erreur lors de l'export vers Spotify");
    } finally {
      setExportingId(null);
    }
  };

  const handleShare = useCallback(async (shareToken: string) => {
    const url = `${window.location.origin}/share/${shareToken}`;
    try {
      await navigator.clipboard.writeText(url);
      alert("Lien de partage copié !");
    } catch {
      prompt("Copiez ce lien :", url);
    }
  }, []);

  const firstName = session?.user?.name?.split(" ")[0] ?? "là";

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="flex-1 p-6 relative">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">
              Bonjour {firstName} 👋
            </h1>
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
                <div className="text-2xl font-bold text-white">
                  {isLoading ? "—" : playlists.length}
                </div>
                <p className="text-xs text-gray-400">dans votre bibliothèque</p>
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
                <div className="text-2xl font-bold text-white">
                  {isLoading
                    ? "—"
                    : playlists.reduce((sum, p) => sum + p.tracks.length, 0)}
                </div>
                <p className="text-xs text-gray-400">sur toutes vos playlists</p>
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
                <div className="text-2xl font-bold text-white">1</div>
                <p className="text-xs text-gray-400">Spotify connecté</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-orange-500/30 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  Publiques
                </CardTitle>
                <Share2 className="h-4 w-4 text-orange-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {isLoading ? "—" : playlists.filter((p) => p.isPublic).length}
                </div>
                <p className="text-xs text-gray-400">playlists partagées</p>
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
                <Link href="/dashboard/create">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle playlist
                </Link>
              </Button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card
                    key={i}
                    className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm animate-pulse"
                  >
                    <CardContent className="p-4">
                      <div className="h-32 bg-gray-800/50 rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : playlists.length === 0 ? (
              <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg font-medium">
                    Aucune playlist pour l&apos;instant
                  </p>
                  <p className="text-gray-500 mt-2 mb-6">
                    Créez votre première playlist et exportez-la vers Spotify
                  </p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white border-0"
                  >
                    <Link href="/dashboard/create">
                      <Plus className="w-4 h-4 mr-2" />
                      Créer une playlist
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {playlists.map((playlist) => {
                  const cover = getPlaylistCover(playlist.tracks);
                  const platforms = getPlaylistPlatforms(playlist.tracks);
                  const isLiked = likedIds.has(playlist.id);

                  return (
                    <Card
                      key={playlist.id}
                      className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm hover:bg-gray-900/70 hover:border-violet-500/40 transition-all duration-300 group cursor-pointer"
                    >
                      <CardContent className="p-4 pt-0">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div className="w-12 h-12 rounded-md flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-500 to-blue-500">
                                  {cover ? (
                                    <Image
                                      src={cover}
                                      alt={playlist.title}
                                      width={48}
                                      height={48}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <Music className="w-6 h-6 text-white" />
                                  )}
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
                                  {playlist.title}
                                </h3>
                                <p className="text-sm text-gray-400">
                                  {playlist.tracks.length} morceaux
                                  {playlist.isPublic ? " • Publique" : " • Privée"}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleLike(playlist.id)}
                                className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto ${isLiked ? "text-red-400" : "text-gray-400"
                                  } hover:text-red-400`}
                              >
                                <Heart
                                  className={`w-4 h-4 ${isLiked ? "fill-current" : ""
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
                                  <DropdownMenuItem
                                    asChild
                                    className="text-gray-300 hover:text-white hover:bg-violet-500/20"
                                  >
                                    <Link href={`/dashboard/playlists/${playlist.id}`}>
                                      <Edit3 className="mr-2 h-4 w-4" />
                                      Modifier
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleShare(playlist.shareToken)}
                                    className="text-gray-300 hover:text-white hover:bg-violet-500/20 cursor-pointer"
                                  >
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Partager
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator className="bg-violet-500/30" />
                                  <DropdownMenuItem
                                    onClick={() => handleDelete(playlist.id)}
                                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>

                          {/* Platform icons */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              {platforms.map((platform) => (
                                <div key={platform} className="relative">
                                  {platformIcons[platform as keyof typeof platformIcons]}
                                </div>
                              ))}
                              {platforms.length === 0 && (
                                <span className="text-xs text-gray-600">
                                  Aucune plateforme
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(playlist.updatedAt).toLocaleDateString(
                                "fr-FR",
                                { day: "numeric", month: "short" }
                              )}
                            </span>
                          </div>

                          {/* Action buttons */}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              disabled={exportingId === playlist.id}
                              onClick={() => handleExport(playlist.id)}
                              className="flex-1 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white border-0 text-xs shadow-lg shadow-violet-500/30 disabled:opacity-50"
                            >
                              <Download className="w-3 h-3 mr-1" />
                              {exportingId === playlist.id ? "Export..." : "Exporter"}
                            </Button>
                            <Button
                              asChild
                              size="sm"
                              variant="outline"
                              className="border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:text-white text-xs bg-transparent"
                            >
                              <Link href={`/share/${playlist.shareToken}`} target="_blank">
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
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

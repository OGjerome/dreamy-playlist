"use client";

import {
  ArrowLeft,
  Copy,
  Check,
  Link2,
  Music,
  Globe,
  Lock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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

function getPlaylistCover(tracks: TrackInPlaylist[]): string | null {
  for (const t of tracks) {
    if (t.track.imageUrl) return t.track.imageUrl;
  }
  return null;
}

export default function SharePage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const res = await fetch("/api/playlists");
        if (res.ok) {
          const data = (await res.json()) as { playlists: Playlist[] };
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

  const getShareUrl = (shareToken: string) => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/share/${shareToken}`;
    }
    return `/share/${shareToken}`;
  };

  const handleCopyLink = async (shareToken: string, playlistId: string) => {
    const url = getShareUrl(shareToken);
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(playlistId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback pour les navigateurs qui ne supportent pas clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedId(playlistId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const publicPlaylists = playlists.filter((p) => p.isPublic);
  const privatePlaylists = playlists.filter((p) => !p.isPublic);
  const totalTracks = playlists.reduce(
    (sum, p) => sum + p.tracks.length,
    0
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <Button
          asChild
          variant="ghost"
          className="text-gray-400 hover:text-white mb-4"
        >
          <Link href="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-white">Partage</h1>
        <p className="text-gray-400 mt-2">
          Partagez vos playlists publiques avec vos amis
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-900/50 border-violet-500/30 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {isLoading ? "—" : playlists.length}
              </div>
              <div className="text-sm text-gray-400">Total playlists</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-green-500/30 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {isLoading ? "—" : publicPlaylists.length}
              </div>
              <div className="text-sm text-gray-400">Playlists publiques</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-blue-500/30 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {isLoading ? "—" : totalTracks}
              </div>
              <div className="text-sm text-gray-400">Morceaux partagés</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Playlists publiques (partageables) */}
        <div className="space-y-6">
          <Card className="bg-gray-900/50 border-green-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-400" />
                Playlists publiques
              </CardTitle>
              <CardDescription className="text-gray-400">
                Ces playlists sont accessibles via un lien de partage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-20 bg-gray-800/50 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : publicPlaylists.length === 0 ? (
                <div className="text-center py-8">
                  <Globe className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">
                    Aucune playlist publique
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Rendez une playlist publique pour la partager
                  </p>
                </div>
              ) : (
                publicPlaylists.map((playlist) => {
                  const cover = getPlaylistCover(playlist.tracks);
                  const isCopied = copiedId === playlist.id;
                  return (
                    <div
                      key={playlist.id}
                      className="p-4 bg-gray-800/30 rounded-lg border border-green-500/10 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md overflow-hidden bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                            {cover ? (
                              <Image
                                src={cover}
                                alt={playlist.title}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Music className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-white">
                              {playlist.title}
                            </h4>
                            <p className="text-sm text-gray-400">
                              {playlist.tracks.length} morceaux •{" "}
                              {new Date(
                                playlist.updatedAt
                              ).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "short",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          readOnly
                          value={getShareUrl(playlist.shareToken)}
                          className="bg-gray-800/50 border-violet-500/30 text-white text-xs"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleCopyLink(
                              playlist.shareToken,
                              playlist.id
                            )
                          }
                          className={`border-violet-500/30 bg-transparent transition-all ${
                            isCopied
                              ? "text-green-400 border-green-500/30"
                              : "text-violet-400 hover:bg-violet-500/20 hover:text-white"
                          }`}
                        >
                          {isCopied ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>

        {/* Playlists privées */}
        <div className="space-y-6">
          <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-gray-400" />
                Playlists privées
              </CardTitle>
              <CardDescription className="text-gray-400">
                Ces playlists ne sont pas partagées. Rendez-les publiques pour
                les partager.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-16 bg-gray-800/50 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : privatePlaylists.length === 0 ? (
                <div className="text-center py-8">
                  <Lock className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">Aucune playlist privée</p>
                </div>
              ) : (
                privatePlaylists.map((playlist) => {
                  const cover = getPlaylistCover(playlist.tracks);
                  return (
                    <div
                      key={playlist.id}
                      className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded overflow-hidden bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center flex-shrink-0">
                          {cover ? (
                            <Image
                              src={cover}
                              alt={playlist.title}
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Music className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-white text-sm">
                            {playlist.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {playlist.tracks.length} morceaux
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link2 className="w-4 h-4 text-gray-600" />
                        <span className="text-xs text-gray-500">Privée</span>
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

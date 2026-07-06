"use client";

import { ExternalLink, Music, Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  album: string | null;
  duration: number;
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
  owner: {
    name: string | null;
    image: string | null;
  };
  tracks: TrackInPlaylist[];
  createdAt: string;
  updatedAt: string;
}

const platformConfig: Record<string, { name: string; icon: string; color: string }> = {
  SPOTIFY: { name: "Spotify", icon: "/spotify.png", color: "text-green-400 border-green-500/30 hover:bg-green-500/20" },
  DEEZER: { name: "Deezer", icon: "/deezer.jpg", color: "text-purple-400 border-purple-500/30 hover:bg-purple-500/20" },
  YOUTUBE_MUSIC: { name: "YouTube Music", icon: "/youtube-music.png", color: "text-red-400 border-red-500/30 hover:bg-red-500/20" },
  APPLE_MUSIC: { name: "Apple Music", icon: "/apple-music.png", color: "text-gray-300 border-gray-500/30 hover:bg-gray-500/20" },
  SOUNDCLOUD: { name: "SoundCloud", icon: "/soundcloud.webp", color: "text-orange-400 border-orange-500/30 hover:bg-orange-500/20" },
};

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function getPlaylistCover(tracks: TrackInPlaylist[]): string | null {
  for (const t of tracks) {
    if (t.track.imageUrl) return t.track.imageUrl;
  }
  return null;
}

export default function SharedPlaylistPage() {
  const params = useParams();
  const token = params.token as string;

  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const res = await fetch(`/api/playlists/share/${token}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Playlist introuvable");
          return;
        }

        setPlaylist(data.playlist);
      } catch {
        setError("Impossible de charger la playlist");
      } finally {
        setIsLoading(false);
      }
    }

    if (token) fetchPlaylist();
  }, [token]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30 animate-pulse">
            <Music className="w-7 h-7 text-white" />
          </div>
          <p className="text-gray-400 text-sm">Chargement de la playlist...</p>
        </div>
      </div>
    );
  }

  if (error || !playlist) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Music className="w-16 h-16 text-gray-600 mx-auto" />
          <h1 className="text-2xl font-bold text-white">
            {error || "Playlist introuvable"}
          </h1>
          <p className="text-gray-400">
            Cette playlist n&apos;existe pas ou est privée.
          </p>
          <Button asChild variant="outline" className="border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:text-white bg-transparent">
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>
        </div>
      </div>
    );
  }

  const cover = getPlaylistCover(playlist.tracks);
  const totalDuration = playlist.tracks.reduce(
    (sum, t) => sum + t.track.duration,
    0
  );
  const totalMinutes = Math.floor(totalDuration / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMins = totalMinutes % 60;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-5xl mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Music className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            OmniGroove
          </span>
        </Link>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        {/* Playlist Header */}
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="w-48 h-48 rounded-xl overflow-hidden bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-2xl shadow-violet-500/30">
            {cover ? (
              <Image
                src={cover}
                alt={playlist.title}
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            ) : (
              <Music className="w-20 h-20 text-white/50" />
            )}
          </div>
          <div className="space-y-3">
            <p className="text-sm text-violet-400 uppercase tracking-wider font-medium">
              Playlist partagée
            </p>
            <h1 className="text-4xl md:text-5xl font-bold">{playlist.title}</h1>
            {playlist.description && (
              <p className="text-gray-400 text-lg">{playlist.description}</p>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {playlist.owner.name || "Utilisateur"}
              </span>
              <span className="flex items-center gap-1">
                <Music className="w-4 h-4" />
                {playlist.tracks.length} morceaux
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {totalHours > 0
                  ? `${totalHours}h ${remainingMins}min`
                  : `${remainingMins}min`}
              </span>
            </div>
          </div>
        </div>

        {/* Tracks list */}
        <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Morceaux</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {playlist.tracks.map((tip, index) => {
                const track = tip.track;
                return (
                  <div
                    key={track.id}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors group"
                  >
                    <span className="text-gray-500 font-mono text-sm w-6 text-right">
                      {index + 1}
                    </span>
                    <div className="w-10 h-10 rounded flex-shrink-0 overflow-hidden bg-gradient-to-br from-violet-500/50 to-blue-500/50">
                      {track.imageUrl ? (
                        <Image
                          src={track.imageUrl}
                          alt={track.title}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Music className="w-5 h-5 text-white/50" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white truncate">
                        {track.title}
                      </div>
                      <div className="text-sm text-gray-400 truncate">
                        {track.artist}
                        {track.album ? ` • ${track.album}` : ""}
                      </div>
                    </div>
                    {/* Platform links */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {track.links.map((link) => {
                        const config = platformConfig[link.platform];
                        if (!config) return null;
                        return (
                          <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 hover:scale-110 transition-transform"
                            title={`Écouter sur ${config.name}`}
                          >
                            <Image
                              src={config.icon}
                              alt={config.name}
                              width={24}
                              height={24}
                              className="w-full h-full object-cover"
                            />
                          </a>
                        );
                      })}
                    </div>
                    <span className="text-xs text-gray-500 font-mono">
                      {formatDuration(track.duration)}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Platform quick links */}
        {playlist.tracks.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {Object.entries(platformConfig).map(([platform, config]) => {
              const firstLink = playlist.tracks.find((t) =>
                t.track.links.some((l) => l.platform === platform)
              );
              if (!firstLink) return null;
              const link = firstLink.track.links.find(
                (l) => l.platform === platform
              );
              if (!link) return null;
              return (
                <Button
                  key={platform}
                  asChild
                  variant="outline"
                  className={`${config.color} bg-transparent`}
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <div className="w-4 h-4 rounded-full overflow-hidden mr-2">
                      <Image
                        src={config.icon}
                        alt={config.name}
                        width={16}
                        height={16}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    Écouter sur {config.name}
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Créé avec{" "}
            <Link
              href="/"
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
              OmniGroove
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

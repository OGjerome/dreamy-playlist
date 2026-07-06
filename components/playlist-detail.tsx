"use client";

import {
  ArrowLeft,
  Clock,
  Download,
  Edit3,
  ExternalLink,
  Filter,
  Heart,
  MoreHorizontal,
  Music,
  Pause,
  Play,
  Plus,
  Search,
  Share2,
  Trash2,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PlatformLink {
  id: string;
  platform: string;
  externalId: string;
  url: string;
}

interface TrackData {
  id: string;
  title: string;
  artist: string;
  album: string | null;
  duration: number; // en secondes
  imageUrl: string | null;
  links: PlatformLink[];
}

interface TrackInPlaylist {
  position: number;
  track: TrackData;
}

interface PlaylistData {
  id: string;
  title: string;
  description: string | null;
  isPublic: boolean;
  shareToken: string;
  ownerId: string;
  owner: {
    name: string | null;
    image: string | null;
  };
  tracks: TrackInPlaylist[];
  createdAt: string;
  updatedAt: string;
}

const platformIcons: Record<string, { name: string; component: React.ReactNode }> = {
  SPOTIFY: {
    name: "Spotify",
    component: (
      <div className="w-6 h-6 rounded-full overflow-hidden shadow-lg">
        <Image
          src="/spotify.png"
          alt="Spotify"
          width={24}
          height={24}
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  DEEZER: {
    name: "Deezer",
    component: (
      <div className="w-6 h-6 rounded-full overflow-hidden shadow-lg">
        <Image
          src="/deezer.jpg"
          alt="Deezer"
          width={24}
          height={24}
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  YOUTUBE_MUSIC: {
    name: "YouTube Music",
    component: (
      <div className="w-6 h-6 rounded-full overflow-hidden shadow-lg">
        <Image
          src="/youtube-music.png"
          alt="YouTube Music"
          width={24}
          height={24}
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  APPLE_MUSIC: {
    name: "Apple Music",
    component: (
      <div className="w-6 h-6 rounded-full overflow-hidden shadow-lg">
        <Image
          src="/apple-music.png"
          alt="Apple Music"
          width={24}
          height={24}
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  SOUNDCLOUD: {
    name: "SoundCloud",
    component: (
      <div className="w-6 h-6 rounded-full overflow-hidden shadow-lg">
        <Image
          src="/soundcloud.webp"
          alt="SoundCloud"
          width={24}
          height={24}
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
};

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function formatTotalDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
}

function getPlaylistCover(tracks: TrackInPlaylist[]): string | null {
  for (const t of tracks) {
    if (t.track.imageUrl) return t.track.imageUrl;
  }
  return null;
}

function getPlaylistPlatforms(tracks: TrackInPlaylist[]): string[] {
  const platforms = new Set<string>();
  for (const t of tracks) {
    for (const link of t.track.links) {
      platforms.add(link.platform);
    }
  }
  return Array.from(platforms);
}

interface PlaylistDetailProps {
  playlistId: string;
}

export default function PlaylistDetail({ playlistId }: PlaylistDetailProps) {
  const router = useRouter();
  const [playlist, setPlaylist] = useState<PlaylistData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [exportingId, setExportingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/playlists/${playlistId}`);
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Erreur lors du chargement");
        }
        const data = await res.json() as { playlist: PlaylistData };
        setPlaylist(data.playlist);
      } catch (err) {
        console.error("Failed to fetch playlist:", err);
        setError(err instanceof Error ? err.message : "Erreur de chargement");
      } finally {
        setIsLoading(false);
      }
    }
    fetchPlaylist();
  }, [playlistId]);

  const handleSelectTrack = (trackId: string) => {
    setSelectedTracks((prev) =>
      prev.includes(trackId)
        ? prev.filter((id) => id !== trackId)
        : [...prev, trackId]
    );
  };

  const handleSelectAll = () => {
    if (!playlist) return;
    setSelectedTracks(
      selectedTracks.length === playlist.tracks.length
        ? []
        : playlist.tracks.map((t) => t.track.id)
    );
  };

  const handleExport = async () => {
    if (!playlist) return;
    try {
      setExportingId(playlist.id);
      const res = await fetch("/api/spotify/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playlistId: playlist.id }),
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
      alert(err instanceof Error ? err.message : "Erreur lors de l'export vers Spotify");
    } finally {
      setExportingId(null);
    }
  };

  const handleShare = useCallback(async () => {
    if (!playlist) return;
    const url = `${window.location.origin}/share/${playlist.shareToken}`;
    try {
      await navigator.clipboard.writeText(url);
      alert("Lien de partage copié !");
    } catch {
      prompt("Copiez ce lien :", url);
    }
  }, [playlist]);

  const handleDelete = async () => {
    if (!playlist) return;
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette playlist ?")) return;
    try {
      const res = await fetch(`/api/playlists/${playlist.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      router.push("/dashboard");
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Erreur lors de la suppression");
    }
  };

  // Affichage chargement
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Music className="w-12 h-12 text-violet-400 mx-auto animate-pulse" />
          <p className="text-gray-400">Chargement de la playlist...</p>
        </div>
      </div>
    );
  }

  // Affichage erreur
  if (error || !playlist) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <XCircle className="w-12 h-12 text-red-400 mx-auto" />
          <p className="text-gray-400">{error || "Playlist introuvable"}</p>
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard")}
            className="border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:text-white bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au dashboard
          </Button>
        </div>
      </div>
    );
  }

  const cover = getPlaylistCover(playlist.tracks);
  const platforms = getPlaylistPlatforms(playlist.tracks);
  const totalDuration = playlist.tracks.reduce(
    (acc, t) => acc + t.track.duration,
    0
  );

  // Filtrer les tracks par recherche
  const filteredTracks = searchQuery.trim()
    ? playlist.tracks.filter(
        (t) =>
          t.track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (t.track.album ?? "").toLowerCase().includes(searchQuery.toLowerCase())
      )
    : playlist.tracks;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Effets de lumière de fond */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Header */}
        <div className="bg-gradient-to-b from-violet-900/20 to-gray-950 border-b border-violet-500/20">
          <div className="p-6">
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-white mb-6"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux playlists
            </Button>

            <div className="flex items-start gap-6">
              <div className="w-48 h-48 rounded-md flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-500 to-blue-500">
                {cover ? (
                  <Image
                    src={cover}
                    alt={playlist.title}
                    width={192}
                    height={192}
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <Music className="w-16 h-16 text-white" />
                )}
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 mb-2">
                    {playlist.isPublic ? "Playlist publique" : "Playlist privée"}
                  </Badge>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {playlist.title}
                  </h1>
                  <p className="text-gray-400">
                    {playlist.owner.name ? `Créée par ${playlist.owner.name}` : "Ma playlist"} •{" "}
                    {playlist.tracks.length} morceaux, {formatTotalDuration(totalDuration)}
                  </p>
                  {playlist.description && (
                    <p className="text-gray-500 text-sm mt-1">{playlist.description}</p>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-violet-500/30"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 mr-2" />
                    ) : (
                      <Play className="w-5 h-5 mr-2" />
                    )}
                    {isPlaying ? "Pause" : "Écouter"}
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:text-white bg-transparent"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:text-white bg-transparent"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-900/95 backdrop-blur-xl border-violet-500/30">
                      <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-violet-500/20">
                        <Edit3 className="mr-2 h-4 w-4" />
                        Modifier la playlist
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleShare}
                        className="text-gray-300 hover:text-white hover:bg-violet-500/20 cursor-pointer"
                      >
                        <Share2 className="mr-2 h-4 w-4" />
                        Partager
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleExport}
                        className="text-gray-300 hover:text-white hover:bg-violet-500/20 cursor-pointer"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Exporter vers Spotify
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-violet-500/30" />
                      <DropdownMenuItem
                        onClick={handleDelete}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20 cursor-pointer"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Disponible sur:</span>
                  <div className="flex gap-2">
                    {platforms.map((platform) => (
                      <div key={platform}>
                        {platformIcons[platform]?.component}
                      </div>
                    ))}
                    {platforms.length === 0 && (
                      <span className="text-xs text-gray-600">
                        Aucune plateforme
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Actions Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <Input
                  placeholder="Rechercher dans cette playlist..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-violet-500/30 text-white placeholder:text-gray-500 focus:border-violet-400 focus:ring-violet-400/20 w-80"
                />
              </div>
              <Button
                variant="outline"
                className="border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:text-white bg-transparent"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
              </Button>
            </div>

            <div className="flex items-center gap-2">
              {selectedTracks.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">
                    {selectedTracks.length} sélectionné
                    {selectedTracks.length > 1 ? "s" : ""}
                  </span>
                  <Button
                    size="sm"
                    onClick={handleExport}
                    disabled={exportingId === playlist.id}
                    className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white border-0"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {exportingId === playlist.id ? "Export..." : "Exporter la sélection"}
                  </Button>
                </div>
              )}
              <Button
                variant="outline"
                className="border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:text-white bg-transparent"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un morceau
              </Button>
            </div>
          </div>

          {/* Tracks Table */}
          <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
            <CardContent className="p-0">
              {filteredTracks.length === 0 ? (
                <div className="text-center py-12">
                  <Music className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">
                    {searchQuery ? "Aucun résultat" : "Aucun morceau dans cette playlist"}
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-violet-500/20 hover:bg-transparent">
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedTracks.length === playlist.tracks.length && playlist.tracks.length > 0}
                          onCheckedChange={handleSelectAll}
                          className="border-violet-500/30 data-[state=checked]:bg-violet-500 data-[state=checked]:border-violet-500"
                        />
                      </TableHead>
                      <TableHead className="text-gray-400">#</TableHead>
                      <TableHead className="text-gray-400">Titre</TableHead>
                      <TableHead className="text-gray-400">Album</TableHead>
                      <TableHead className="text-gray-400">Plateformes</TableHead>
                      <TableHead className="text-gray-400 text-right">
                        <Clock className="w-4 h-4 ml-auto" />
                      </TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTracks.map((tip, index) => (
                      <TableRow
                        key={tip.track.id}
                        className="border-violet-500/10 hover:bg-violet-500/5 group"
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedTracks.includes(tip.track.id)}
                            onCheckedChange={() => handleSelectTrack(tip.track.id)}
                            className="border-violet-500/30 data-[state=checked]:bg-violet-500 data-[state=checked]:border-violet-500"
                          />
                        </TableCell>
                        <TableCell className="text-gray-400 font-mono text-sm">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-500 to-blue-500">
                              {tip.track.imageUrl ? (
                                <Image
                                  src={tip.track.imageUrl}
                                  alt={tip.track.title}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover rounded-md"
                                />
                              ) : (
                                <Music className="w-5 h-5 text-white" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-white">
                                {tip.track.title}
                              </div>
                              <div className="text-sm text-gray-400">
                                {tip.track.artist}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-400">
                          {tip.track.album ?? "—"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {tip.track.links.map((link) => (
                              <div key={link.id}>
                                {platformIcons[link.platform]?.component || (
                                  <div className="w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center">
                                    <Music className="w-3 h-3 text-white" />
                                  </div>
                                )}
                              </div>
                            ))}
                            {tip.track.links.length === 0 && (
                              <span className="text-xs text-gray-600">—</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-400 text-right font-mono text-sm">
                          {formatDuration(tip.track.duration)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white"
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
                                <Share2 className="mr-2 h-4 w-4" />
                                Partager
                              </DropdownMenuItem>
                              {tip.track.links.find(l => l.platform === "SPOTIFY") && (
                                <DropdownMenuItem asChild className="text-gray-300 hover:text-white hover:bg-violet-500/20">
                                  <a
                                    href={tip.track.links.find(l => l.platform === "SPOTIFY")!.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Ouvrir sur Spotify
                                  </a>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator className="bg-violet-500/30" />
                              <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-red-500/20">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Retirer de la playlist
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">
                Options d&apos;export
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <Button
                  onClick={handleExport}
                  disabled={exportingId === playlist.id}
                  className="h-16 bg-black-600 hover:bg-black-800 text-white border-0 flex-col gap-2 shadow-lg"
                >
                  <div className="w-6 h-6  ">
                    <Image
                      src="/spotify.png"
                      alt="Spotify"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {exportingId === playlist.id ? "Export..." : "Spotify"}
                </Button>
                <Button className="h-16 bg-white hover:bg-gray-200 text-black border-0 flex-col gap-2 shadow-lg shadow-purple-500/30" disabled>
                  <div className="w-6 h-6  ">
                    <Image
                      src="/deezer.jpg"
                      alt="Deezer"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  Deezer (bientôt)
                </Button>
                <Button className="h-16 bg-[#FD0100] hover:bg-red-600 text-white border-0 flex-col gap-2 shadow-lg shadow-red-500/30" disabled>
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src="/youtube-music.png"
                      alt="YouTube Music"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  YouTube Music (bientôt)
                </Button>
                <Button className="h-16 bg-[#FB435A] hover:bg-[#FB435A]/80 text-white border-0 flex-col gap-2 shadow-lg shadow-gray-500/30" disabled>
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src="/apple-music.png"
                      alt="Apple Music"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  Apple Music (bientôt)
                </Button>
                <Button className="h-16 bg-[#FF5517] hover:bg-orange-700 text-white border-0 flex-col gap-2 shadow-lg shadow-orange-600/30" disabled>
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src="/soundcloud.webp"
                      alt="SoundCloud"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  SoundCloud (bientôt)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

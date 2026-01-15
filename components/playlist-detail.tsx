"use client";

import {
  ArrowLeft,
  Clock,
  Download,
  Edit3,
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
import { useState } from "react";

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

const tracks = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
    duration: "3:20",
    isLiked: true,
    platforms: {
      spotify: true,
      deezer: true,
      youtube: true,
      apple: true,
      soundcloud: false,
    },
  },
  {
    id: 2,
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    albumCover:
      "https://cdn-images.dzcdn.net/images/cover/544862aa5be45bc82ad4ab1a14daf63a/1900x1900-000000-80-0-0.jpg",
    duration: "2:54",
    isLiked: false,
    platforms: {
      spotify: true,
      deezer: false,
      youtube: true,
      apple: true,
      soundcloud: true,
    },
  },
  {
    id: 3,
    title: "SICKO MODE",
    artist: "Travis Scott",
    album: "ASTROWORLD",
    albumCover:
      "https://m.media-amazon.com/images/I/81nFF-rXdRL._UF894,1000_QL80_.jpg",
    duration: "3:23",
    isLiked: true,
    platforms: {
      spotify: true,
      deezer: true,
      youtube: true,
      apple: false,
      soundcloud: true,
    },
  },
  {
    id: 4,
    title: "Don't Start Now",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b273c35ea649223a519a9ad51ccf",
    duration: "3:03",
    isLiked: true,
    platforms: {
      spotify: true,
      deezer: true,
      youtube: false,
      apple: true,
      soundcloud: false,
    },
  },
  {
    id: 5,
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "Sour",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b273670ec029374e082f921f9f74",
    duration: "2:58",
    isLiked: false,
    platforms: {
      spotify: false,
      deezer: true,
      youtube: true,
      apple: true,
      soundcloud: true,
    },
  },
];

const platformIcons = {
  spotify: {
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
  deezer: {
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
  youtube: {
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
  apple: {
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
  soundcloud: {
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

export default function PlaylistDetail() {
  const [selectedTracks, setSelectedTracks] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSelectTrack = (trackId: number) => {
    setSelectedTracks((prev) =>
      prev.includes(trackId)
        ? prev.filter((id) => id !== trackId)
        : [...prev, trackId]
    );
  };

  const handleSelectAll = () => {
    setSelectedTracks(
      selectedTracks.length === tracks.length
        ? []
        : tracks.map((track) => track.id)
    );
  };

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
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux playlists
            </Button>

            <div className="flex items-start gap-6">
              <div className="w-48 h-48 rounded-md flex items-center justify-center">
                <Image
                  src="https://external-preview.redd.it/skeleton-wlr-very-chill-playlist-v0-SQkNKj5s_4m-OYB8SOapRtNf3tf1oT3ZQcdev8Y0UJI.jpg?auto=webp&s=c622a1c1963cb1e77137abd029d4f95b677d59b2"
                  alt="Playlist Cover"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 mb-2">
                    Playlist
                  </Badge>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Summer Vibes 2025
                  </h1>
                  <p className="text-gray-400">
                    Créée par John Doe • 24 morceaux, 1h 32min
                  </p>
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

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Disponible sur:</span>
                  <div className="flex gap-2">
                    {Object.entries(platformIcons).map(([platform, config]) => (
                      <div key={platform}>{config.component}</div>
                    ))}
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
                    className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white border-0"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Exporter la sélection
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
              <Table>
                <TableHeader>
                  <TableRow className="border-violet-500/20 hover:bg-transparent">
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedTracks.length === tracks.length}
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
                  {tracks.map((track, index) => (
                    <TableRow
                      key={track.id}
                      className="border-violet-500/10 hover:bg-violet-500/5 group"
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedTracks.includes(track.id)}
                          onCheckedChange={() => handleSelectTrack(track.id)}
                          className="border-violet-500/30 data-[state=checked]:bg-violet-500 data-[state=checked]:border-violet-500"
                        />
                      </TableCell>
                      <TableCell className="text-gray-400 font-mono text-sm">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md flex items-center justify-center">
                            <Image
                              src={track.albumCover}
                              alt={track.title}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-white">
                              {track.title}
                            </div>
                            <div className="text-sm text-gray-400">
                              {track.artist}
                            </div>
                          </div>
                          {track.isLiked && (
                            <Heart className="w-4 h-4 text-red-400 fill-current" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {track.album}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {Object.entries(track.platforms).map(
                            ([platform, available]) => (
                              <div key={platform}>
                                {available ? (
                                  platformIcons[
                                    platform as keyof typeof platformIcons
                                  ]?.component || (
                                    <div className="w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center">
                                      <Music className="w-3 h-3 text-white" />
                                    </div>
                                  )
                                ) : (
                                  <div className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center">
                                    <XCircle className="w-3 h-3 text-gray-500" />
                                  </div>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-400 text-right font-mono text-sm">
                        {track.duration}
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
                              <Heart className="mr-2 h-4 w-4" />
                              {track.isLiked
                                ? "Retirer des favoris"
                                : "Ajouter aux favoris"}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-violet-500/20">
                              <Share2 className="mr-2 h-4 w-4" />
                              Partager
                            </DropdownMenuItem>
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
                <Button className="h-16 bg-black-600 hover:bg-black-800 text-white border-0 flex-col gap-2 shadow-lg">
                  <div className="w-6 h-6  ">
                    <Image
                      src="/spotify.png"
                      alt="Spotify"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  Spotify
                </Button>
                <Button className="h-16 bg-white hover:bg-gray-200 text-black border-0 flex-col gap-2 shadow-lg shadow-purple-500/30">
                  <div className="w-6 h-6  ">
                    <Image
                      src="/deezer.jpg"
                      alt="Deezer"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  Deezer
                </Button>
                <Button className="h-16 bg-[#FD0100] hover:bg-red-600 text-white border-0 flex-col gap-2 shadow-lg shadow-red-500/30">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src="/youtube-music.png"
                      alt="YouTube Music"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  YouTube Music
                </Button>
                <Button className="h-16 bg-[#FB435A] hover:bg-[#FB435A]/80 text-white border-0 flex-col gap-2 shadow-lg shadow-gray-500/30">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src="/apple-music.png"
                      alt="Apple Music"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  Apple Music
                </Button>
                <Button className="h-16 bg-[#FF5517] hover:bg-orange-700 text-white border-0 flex-col gap-2 shadow-lg shadow-orange-600/30">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src="/soundcloud.webp"
                      alt="SoundCloud"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  SoundCloud
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

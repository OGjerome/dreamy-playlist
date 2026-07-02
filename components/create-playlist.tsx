"use client";

import {
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  Globe,
  Lock,
  Music,
  Plus,
  Save,
  Search,
  Trash2,
  Upload,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
  spotifyId: string;
  spotifyUri: string;
  platforms: {
    spotify: boolean;
    deezer: boolean;
    youtube: boolean;
    apple: boolean;
    soundcloud: boolean;
  };
};

const platformIcons = {
  spotify: {
    name: "Spotify",
    component: (
      <div className="w-4 h-4 rounded-full overflow-hidden">
        <Image
          src="/spotify.png"
          alt="Spotify"
          width={16}
          height={16}
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  deezer: {
    name: "Deezer",
    component: (
      <div className="w-4 h-4 rounded-full overflow-hidden">
        <Image
          src="/deezer.jpg"
          alt="Deezer"
          width={16}
          height={16}
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  youtube: {
    name: "YouTube Music",
    component: (
      <div className="w-4 h-4 rounded-full overflow-hidden">
        <Image
          src="/youtube-music.png"
          alt="YouTube Music"
          width={16}
          height={16}
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  apple: {
    name: "Apple Music",
    component: (
      <div className="w-4 h-4 rounded-full overflow-hidden">
        <Image
          src="/apple-music.png"
          alt="Apple Music"
          width={16}
          height={16}
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  soundcloud: {
    name: "SoundCloud",
    component: (
      <div className="w-4 h-4 rounded-full overflow-hidden">
        <Image
          src="/soundcloud.webp"
          alt="SoundCloud"
          width={16}
          height={16}
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
};

export default function CreatePlaylist() {
  const router = useRouter();

  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  // Sauvegarde en DB
  const [isSaving, setIsSaving] = useState(false);
  const [savedPlaylistId, setSavedPlaylistId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState("");

  // Export vers Spotify
  const [isExporting, setIsExporting] = useState(false);
  const [spotifyUrl, setSpotifyUrl] = useState<string | null>(null);
  const [exportError, setExportError] = useState("");

  const handleAddTrack = (track: Track) => {
    if (!selectedTracks.find((t) => t.id === track.id)) {
      setSelectedTracks((prev) => [...prev, track]);
    }
  };

  const handleRemoveTrack = (trackId: string) => {
    setSelectedTracks((prev) => prev.filter((t) => t.id !== trackId));
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearchError("");
      return;
    }

    try {
      setIsSearching(true);
      setSearchError("");

      const response = await fetch(
        `/api/spotify/search?q=${encodeURIComponent(searchQuery)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur de recherche");
      }

      setSearchResults(data.tracks || []);
    } catch (error) {
      console.error(error);
      setSearchResults([]);
      setSearchError("Impossible de rechercher sur Spotify");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSave = async () => {
    if (!playlistName.trim() || selectedTracks.length === 0) return;

    try {
      setIsSaving(true);
      setSaveError("");

      const response = await fetch("/api/playlists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: playlistName,
          description: playlistDescription,
          isPublic,
          tracks: selectedTracks,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la sauvegarde");
      }

      setSavedPlaylistId(data.playlist.id);
    } catch (error) {
      console.error(error);
      setSaveError(
        error instanceof Error ? error.message : "Erreur lors de la sauvegarde"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportToSpotify = async () => {
    if (!savedPlaylistId) return;

    try {
      setIsExporting(true);
      setExportError("");

      const response = await fetch("/api/spotify/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playlistId: savedPlaylistId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'export");
      }

      setSpotifyUrl(data.spotifyUrl);
    } catch (error) {
      console.error(error);
      setExportError(
        error instanceof Error ? error.message : "Erreur lors de l'export"
      );
    } finally {
      setIsExporting(false);
    }
  };

  const totalDuration = selectedTracks.reduce((acc, track) => {
    const [minutes, seconds] = track.duration.split(":").map(Number);
    return acc + minutes * 60 + seconds;
  }, 0);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Effets de lumière de fond */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative p-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-white mb-4"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au dashboard
          </Button>
          <h1 className="text-3xl font-bold text-white">
            Créer une nouvelle playlist
          </h1>
          <p className="text-gray-400 mt-2">
            Recherchez et ajoutez vos morceaux préférés
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Playlist Info & Search */}
          <div className="space-y-6">
            {/* Playlist Information */}
            <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">
                  Informations de la playlist
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Nom de la playlist
                  </Label>
                  <Input
                    id="name"
                    placeholder="Ma nouvelle playlist"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    className="bg-gray-800/50 border-violet-500/30 text-white placeholder:text-gray-500 focus:border-violet-400 focus:ring-violet-400/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-300">
                    Description (optionnel)
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez votre playlist..."
                    value={playlistDescription}
                    onChange={(e) => setPlaylistDescription(e.target.value)}
                    className="bg-gray-800/50 border-violet-500/30 text-white placeholder:text-gray-500 focus:border-violet-400 focus:ring-violet-400/20 min-h-[100px]"
                  />
                </div>

                {/* Toggle Public/Privé */}
                <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-violet-500/20">
                  <div className="flex items-center gap-2">
                    {isPublic ? (
                      <Globe className="w-4 h-4 text-violet-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-gray-400" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-white">
                        {isPublic ? "Playlist publique" : "Playlist privée"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {isPublic
                          ? "Visible par tout le monde sur Spotify"
                          : "Seulement visible par vous"}
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="isPublic"
                    checked={isPublic}
                    onCheckedChange={setIsPublic}
                  />
                </div>

                <div className="flex items-center gap-4 p-4 bg-violet-500/10 rounded-lg border border-violet-500/20">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {playlistName || "Ma nouvelle playlist"}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {selectedTracks.length} morceaux •{" "}
                      {formatDuration(totalDuration)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search */}
            <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">
                  Rechercher des morceaux
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <Input
                      placeholder="Rechercher un artiste, titre, album..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-gray-800/50 border-violet-500/30 text-white placeholder:text-gray-500 focus:border-violet-400 focus:ring-violet-400/20"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSearch();
                        }
                      }}
                    />
                  </div>
                  <Button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white border-0"
                  >
                    {isSearching ? "..." : "Rechercher"}
                  </Button>
                </div>

                {/* Search Results */}
                {searchQuery && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-300">
                      Résultats de recherche
                    </h4>
                    {searchError && (
                      <p className="text-sm text-red-400">{searchError}</p>
                    )}
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {searchResults.map((track) => (
                        <div
                          key={track.id}
                          className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
                        >
                          {/* Cover de l'album Spotify */}
                          <div className="w-10 h-10 rounded flex-shrink-0 overflow-hidden bg-gradient-to-br from-violet-500 to-blue-500">
                            {track.cover && track.cover !== "/spotify.png" ? (
                              <Image
                                src={track.cover}
                                alt={track.title}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Music className="w-5 h-5 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-white truncate">
                              {track.title}
                            </div>
                            <div className="text-sm text-gray-400 truncate">
                              {track.artist} • {track.album}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {Object.entries(track.platforms).map(
                              ([platform, available]) => (
                                <div
                                  key={platform}
                                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                    available ? "" : "bg-gray-700"
                                  }`}
                                >
                                  {available ? (
                                    platformIcons[
                                      platform as keyof typeof platformIcons
                                    ]?.component || (
                                      <CheckCircle className="w-2 h-2 text-white" />
                                    )
                                  ) : (
                                    <XCircle className="w-2 h-2 text-gray-500" />
                                  )}
                                </div>
                              )
                            )}
                          </div>
                          <span className="text-xs text-gray-500 font-mono">
                            {track.duration}
                          </span>
                          <Button
                            size="sm"
                            onClick={() => handleAddTrack(track)}
                            disabled={selectedTracks.some(
                              (t) => t.id === track.id
                            )}
                            className="bg-violet-500 hover:bg-violet-600 text-white border-0 disabled:opacity-50"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Selected Tracks */}
          <div className="space-y-6">
            <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">
                  Morceaux sélectionnés ({selectedTracks.length})
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:text-white bg-transparent"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Importer
                  </Button>
                  <Button
                    size="sm"
                    disabled={
                      selectedTracks.length === 0 ||
                      !playlistName ||
                      isSaving ||
                      !!savedPlaylistId
                    }
                    onClick={handleSave}
                    className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white border-0 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving
                      ? "Sauvegarde..."
                      : savedPlaylistId
                      ? "Sauvegardée ✓"
                      : "Sauvegarder"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Feedback sauvegarde */}
                {saveError && (
                  <div className="mb-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-sm text-red-400">{saveError}</p>
                  </div>
                )}

                {savedPlaylistId && !spotifyUrl && (
                  <div className="mb-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-between">
                    <p className="text-sm text-green-400">
                      ✓ Playlist sauvegardée ! Exportez-la maintenant vers
                      Spotify.
                    </p>
                  </div>
                )}

                {/* Lien Spotify après export */}
                {spotifyUrl && (
                  <div className="mb-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg space-y-2">
                    <p className="text-sm text-green-400 font-medium">
                      ✓ Playlist exportée sur Spotify avec succès !
                    </p>
                    <a
                      href={spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ouvrir sur Spotify
                    </a>
                  </div>
                )}

                {exportError && (
                  <div className="mb-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-sm text-red-400">{exportError}</p>
                  </div>
                )}

                {selectedTracks.length === 0 ? (
                  <div className="text-center py-12">
                    <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg font-medium">
                      Aucun morceau sélectionné
                    </p>
                    <p className="text-gray-500 mt-2">
                      Recherchez et ajoutez des morceaux à votre playlist
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {selectedTracks.map((track, index) => (
                      <div
                        key={track.id}
                        className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors group"
                      >
                        <span className="text-gray-500 font-mono text-sm w-6">
                          {index + 1}
                        </span>
                        {/* Cover */}
                        <div className="w-10 h-10 rounded flex-shrink-0 overflow-hidden bg-gradient-to-br from-violet-500 to-blue-500">
                          {track.cover && track.cover !== "/spotify.png" ? (
                            <Image
                              src={track.cover}
                              alt={track.title}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Music className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-white truncate">
                            {track.title}
                          </div>
                          <div className="text-sm text-gray-400 truncate">
                            {track.artist}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {Object.entries(track.platforms).map(
                            ([platform, available]) => (
                              <div
                                key={platform}
                                className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                  available ? "" : "bg-gray-700"
                                }`}
                              >
                                {available ? (
                                  platformIcons[
                                    platform as keyof typeof platformIcons
                                  ]?.component || (
                                    <CheckCircle className="w-2 h-2 text-white" />
                                  )
                                ) : (
                                  <XCircle className="w-2 h-2 text-gray-500" />
                                )}
                              </div>
                            )
                          )}
                        </div>
                        <span className="text-xs text-gray-500 font-mono">
                          {track.duration}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveTrack(track.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 hover:bg-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {selectedTracks.length > 0 && (
                  <>
                    <Separator className="my-4 bg-violet-500/20" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">
                        Total: {selectedTracks.length} morceaux
                      </span>
                      <span className="text-gray-400">
                        Durée: {formatDuration(totalDuration)}
                      </span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Export vers Spotify */}
            {savedPlaylistId && (
              <Card className="bg-gray-900/50 border-green-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full overflow-hidden">
                      <Image
                        src="/spotify.png"
                        alt="Spotify"
                        width={20}
                        height={20}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    Exporter vers Spotify
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-400">
                    Crée une nouvelle playlist dans votre compte Spotify avec
                    tous les morceaux sélectionnés.
                  </p>
                  {spotifyUrl ? (
                    <Button
                      asChild
                      className="w-full bg-[#1DB954] hover:bg-[#1aa34a] text-white border-0"
                    >
                      <a
                        href={spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ouvrir sur Spotify
                      </a>
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-[#1DB954] hover:bg-[#1aa34a] text-white border-0 disabled:opacity-50"
                      disabled={isExporting}
                      onClick={handleExportToSpotify}
                    >
                      {isExporting ? (
                        "Export en cours..."
                      ) : (
                        <>
                          <div className="w-4 h-4 rounded-full overflow-hidden mr-2">
                            <Image
                              src="/spotify.png"
                              alt="Spotify"
                              width={16}
                              height={16}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          Exporter vers Spotify
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Platform Availability */}
            {selectedTracks.length > 0 && (
              <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">
                    Disponibilité par plateforme
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(platformIcons).map(([platform, config]) => {
                      const availableCount = selectedTracks.filter(
                        (track) =>
                          track.platforms[
                            platform as keyof typeof track.platforms
                          ]
                      ).length;
                      const percentage =
                        (availableCount / selectedTracks.length) * 100;

                      return (
                        <div key={platform} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {config.component}
                              <span className="text-white capitalize">
                                {config.name}
                              </span>
                            </div>
                            <span className="text-gray-400 text-sm">
                              {availableCount}/{selectedTracks.length} (
                              {Math.round(percentage)}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

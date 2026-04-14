"use client";

import {
  ArrowLeft,
  Music,
  Plus,
  Save,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

// Note : Les données statiques 'searchResults' et 'platformIcons' ont été supprimées
// pour préparer l'intégration réelle avec l'API Spotify.

export default function CreatePlaylist() {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // État pour les résultats de recherche (initialement vide)
  const [results, setResults] = useState<any[]>([]);

  // État pour les morceaux sélectionnés
  const [selectedTracks, setSelectedTracks] = useState<any[]>([]);

  const handleAddTrack = (track: any) => {
    if (!selectedTracks.find((t) => t.id === track.id)) {
      setSelectedTracks([...selectedTracks, track]);
    }
  };

  const handleRemoveTrack = (trackId: string | number) => {
    setSelectedTracks(selectedTracks.filter((t) => t.id !== trackId));
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    // Emplacement pour l'appel API Spotify par l'autre développeur
    // Pour l'instant, nous simulons simplement une recherche vide
    setTimeout(() => {
      setIsSearching(false);
      // setResults(dataFromSpotify)
    }, 600);
  };

  const totalDuration = selectedTracks.reduce((acc, track) => {
    // On suppose que la durée arrivera en secondes ou format MM:SS
    if (typeof track.duration === "string" && track.duration.includes(":")) {
      const [minutes, seconds] = track.duration.split(":").map(Number);
      return acc + minutes * 60 + seconds;
    }
    return acc + (track.duration || 0);
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
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au dashboard
          </Button>
          <h1 className="text-3xl font-bold text-white">
            Créer une nouvelle playlist
          </h1>
          <p className="text-gray-400 mt-2">
            Recherchez des morceaux sur Spotify et composez votre liste
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Colonne Gauche - Infos & Recherche */}
          <div className="space-y-6">
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
                    placeholder="Ma nouvelle playlist Spotify"
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
                    placeholder="Une playlist générée avec Innov'mind..."
                    value={playlistDescription}
                    onChange={(e) => setPlaylistDescription(e.target.value)}
                    className="bg-gray-800/50 border-violet-500/30 text-white placeholder:text-gray-500 focus:border-violet-400 focus:ring-violet-400/20 min-h-[100px]"
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

            <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">
                  Rechercher sur Spotify
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <Input
                      placeholder="Artiste, titre, album..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-gray-800/50 border-violet-500/30 text-white placeholder:text-gray-500 focus:border-violet-400 focus:ring-violet-400/20"
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
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

                {/* Liste des résultats de recherche */}
                {results.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-300">
                      Résultats
                    </h4>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {results.map((track) => (
                        <div
                          key={track.id}
                          className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
                        >
                          <div className="w-10 h-10 bg-violet-500/20 rounded flex items-center justify-center">
                            <Music className="w-5 h-5 text-violet-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-white truncate">
                              {track.title}
                            </div>
                            <div className="text-sm text-gray-400 truncate">
                              {track.artist}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleAddTrack(track)}
                            disabled={selectedTracks.find(
                              (t) => t.id === track.id,
                            )}
                            className="bg-violet-500 hover:bg-violet-600 text-white border-0"
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

          {/* Colonne Droite - Sélection actuelle */}
          <div className="space-y-6">
            <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm h-fit">
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
                    disabled={selectedTracks.length === 0 || !playlistName}
                    className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white border-0"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {selectedTracks.length === 0 ? (
                  <div className="text-center py-12">
                    <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg font-medium">
                      Votre sélection est vide
                    </p>
                    <p className="text-gray-500 mt-2">
                      Utilisez la recherche pour ajouter des titres Spotify
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[500px] overflow-y-auto">
                    {selectedTracks.map((track, index) => (
                      <div
                        key={track.id}
                        className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors group"
                      >
                        <span className="text-gray-500 font-mono text-sm w-6">
                          {index + 1}
                        </span>
                        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-blue-500 rounded flex items-center justify-center">
                          <Music className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-white truncate">
                            {track.title}
                          </div>
                          <div className="text-sm text-gray-400 truncate">
                            {track.artist}
                          </div>
                        </div>
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
                        Total: {selectedTracks.length} titres
                      </span>
                      <span className="text-gray-400">
                        Durée: {formatDuration(totalDuration)}
                      </span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

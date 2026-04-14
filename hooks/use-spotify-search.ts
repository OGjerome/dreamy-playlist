import { useState } from "react";
import { Track } from "./use-playlist-detail";

export function useSpotifySearch() {
  const [results, setResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchTracks = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      // Appel vers la future route d'API de recherche Spotify
      const response = await fetch(
        `/api/spotify/search?q=${encodeURIComponent(query)}`,
      );

      if (!response.ok) {
        throw new Error("Erreur de communication avec Spotify");
      }

      const data = await response.json();
      setResults(data.tracks);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue est survenue");
      }
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setResults([]);
  };

  return { results, isSearching, error, searchTracks, clearSearch };
}

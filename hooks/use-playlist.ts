import { useState, useEffect, useCallback } from "react";

// On définit une interface de base pour typer nos données
export interface Playlist {
  id: string | number;
  title: string;
  icon?: string;
  tracks: number;
  duration: string;
  lastModified?: string;
  isLiked?: boolean;
}

export function usePlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaylists = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Appel vers la future route d'API que nous créerons à l'étape 3
      const response = await fetch("/api/playlists");

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des playlists");
      }

      const data = await response.json();
      setPlaylists(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue est survenue");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  return { playlists, isLoading, error, refetch: fetchPlaylists };
}

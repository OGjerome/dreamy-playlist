import { useState, useEffect, useCallback } from "react";

export interface Track {
  id: string | number;
  title: string;
  artist: string;
  album: string;
  albumCover: string;
  duration: string;
  isLiked?: boolean;
  spotifyId?: string;
}

export interface PlaylistInfo {
  title: string;
  description: string | null;
  coverImage: string;
  totalTracks: number;
}

export function usePlaylistDetail(playlistId: string | undefined) {
  const [playlist, setPlaylist] = useState<PlaylistInfo | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    if (!playlistId) return;

    setIsLoading(true);
    setError(null);
    try {
      // Appel vers la future route d'API dynamique
      const response = await fetch(`/api/playlists/${playlistId}`);

      if (!response.ok) {
        throw new Error("Playlist introuvable");
      }

      const data = await response.json();
      setPlaylist(data.info); // Les infos générales (nom, auteur, pochette)
      setTracks(data.tracks); // Le tableau des musiques
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue est survenue");
      }
    } finally {
      setIsLoading(false);
    }
  }, [playlistId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return { playlist, tracks, isLoading, error, refetch: fetchDetail };
}

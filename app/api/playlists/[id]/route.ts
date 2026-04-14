import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const playlistId = params.id;

    const playlist = await prisma.playlist.findUnique({
      where: { id: playlistId },
      include: {
        tracks: {
          include: {
            track: true, // Va chercher les vraies informations du morceau via la table pivot
          },
          orderBy: { position: "asc" }, // Trie dans l'ordre de la playlist
        },
      },
    });

    if (!playlist) {
      return NextResponse.json(
        { error: "Playlist introuvable" },
        { status: 404 },
      );
    }

    // Formatage pour le hook "usePlaylistDetail"
    const formattedData = {
      info: {
        title: playlist.title,
        description: playlist.description,
        coverImage:
          playlist.tracks[0]?.track.imageUrl ||
          "https://external-preview.redd.it/skeleton-wlr-very-chill-playlist-v0-SQkNKj5s_4m-OYB8SOapRtNf3tf1oT3ZQcdev8Y0UJI.jpg?auto=webp&s=c622a1c1963cb1e77137abd029d4f95b677d59b2",
        totalTracks: playlist.tracks.length,
      },
      tracks: playlist.tracks.map((t) => ({
        id: t.track.id,
        title: t.track.title,
        artist: t.track.artist,
        album: t.track.album,
        albumCover: t.track.imageUrl || "/spotify.png", // Image par défaut
        duration: "3:00", // Vous pourrez calculer ça avec la durée en MS de Spotify
        spotifyId: t.track.id,
      })),
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Erreur API GET playlist detail:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

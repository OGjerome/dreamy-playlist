import { NextResponse } from "next/server";
import { auth } from "@/auth";

function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export async function GET(request: Request) {
  const session = await auth();
  const accessToken = session?.accessToken;

  if (!accessToken) {
    return NextResponse.json(
      { error: "Utilisateur non connecté à Spotify" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json({ tracks: [] });
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?${new URLSearchParams({
        q: query,
        type: "track",
        limit: "10",
      }).toString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const details = await response.text();
      console.error("Erreur Spotify Search:", details);
      return NextResponse.json(
        { error: "Erreur lors de la recherche Spotify" },
        { status: response.status }
      );
    }

    const data = await response.json();

    const tracks = (data.tracks?.items ?? []).map((item: any) => ({
      id: item.id,
      title: item.name,
      artist: item.artists?.map((a: any) => a.name).join(", ") ?? "Inconnu",
      album: item.album?.name ?? "Inconnu",
      duration: formatDuration(item.duration_ms ?? 0),
      cover: item.album?.images?.[0]?.url ?? "/spotify.png",
      spotifyId: item.id,
      spotifyUri: item.uri,
      platforms: {
        spotify: true,
        deezer: false,
        youtube: false,
        apple: false,
        soundcloud: false,
      },
    }));

    return NextResponse.json({ tracks });
  } catch (error) {
    console.error("Erreur API Recherche Spotify:", error);
    return NextResponse.json(
      { error: "Erreur lors de la recherche" },
      { status: 500 }
    );
  }
}
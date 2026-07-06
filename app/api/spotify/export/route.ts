import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/**
 * Parse le body d'une réponse Spotify en erreur.
 * Retourne un message lisible ou le texte brut.
 */
async function parseSpotifyError(res: Response): Promise<string> {
  try {
    const text = await res.text();
    try {
      const json = JSON.parse(text);
      // Format Spotify standard: { error: { status: 401, message: "..." } }
      if (json?.error?.message) {
        return `Spotify ${res.status}: ${json.error.message}`;
      }
      return `Spotify ${res.status}: ${text}`;
    } catch {
      return `Spotify ${res.status}: ${text}`;
    }
  } catch {
    return `Spotify ${res.status}: impossible de lire la réponse`;
  }
}

// POST /api/spotify/export
// Body: { playlistId: string }
// 1. Récupère la playlist en DB
// 2. Crée la playlist sur Spotify
// 3. Ajoute les morceaux par URI Spotify
// 4. Retourne l'URL de la playlist Spotify
export async function POST(request: Request) {
  const session = await auth();
  const accessToken = session?.accessToken;

  if (!accessToken) {
    return NextResponse.json(
      { error: "Utilisateur non connecté à Spotify. Veuillez vous reconnecter." },
      { status: 401 }
    );
  }

  const body = await request.json() as { playlistId: string };
  const { playlistId } = body;

  if (!playlistId) {
    return NextResponse.json({ error: "playlistId requis" }, { status: 400 });
  }

  // Récupérer la playlist depuis notre DB
  const playlist = await prisma.playlist.findUnique({
    where: { id: playlistId },
    include: {
      tracks: {
        include: {
          track: {
            include: { links: true },
          },
        },
        orderBy: { position: "asc" },
      },
    },
  });

  if (!playlist) {
    return NextResponse.json({ error: "Playlist introuvable" }, { status: 404 });
  }

  try {
    // Étape 1 : Récupérer le profil Spotify de l'utilisateur
    const meRes = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    if (!meRes.ok) {
      const errMsg = await parseSpotifyError(meRes);
      console.error("Spotify /me error:", errMsg);
      return NextResponse.json(
        { error: `Impossible de récupérer le profil Spotify. ${errMsg}` },
        { status: meRes.status }
      );
    }

    const me = await meRes.json() as { id: string };

    // Étape 2 : Créer la playlist sur Spotify
    const createRes = await fetch(
      `https://api.spotify.com/v1/users/${me.id}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playlist.title,
          description: playlist.description ?? "",
          public: playlist.isPublic,
        }),
        cache: "no-store",
      }
    );

    if (!createRes.ok) {
      const errMsg = await parseSpotifyError(createRes);
      console.error("Spotify create playlist error:", errMsg);
      return NextResponse.json(
        { error: `Impossible de créer la playlist sur Spotify. ${errMsg}` },
        { status: createRes.status }
      );
    }

    const spotifyPlaylist = await createRes.json() as {
      id: string;
      external_urls: { spotify: string };
    };

    // Étape 3 : Construire la liste des URIs Spotify des morceaux
    const spotifyUris: string[] = [];
    for (const tip of playlist.tracks) {
      const spotifyLink = tip.track.links.find((l: { platform: string; externalId: string; url: string; id: string; trackId: string }) => l.platform === "SPOTIFY");
      if (spotifyLink) {
        spotifyUris.push(`spotify:track:${spotifyLink.externalId}`);
      }
    }

    if (spotifyUris.length > 0) {
      // L'API Spotify accepte max 100 URIs par appel
      const chunks: string[][] = [];
      for (let i = 0; i < spotifyUris.length; i += 100) {
        chunks.push(spotifyUris.slice(i, i + 100));
      }

      for (const chunk of chunks) {
        const addRes = await fetch(
          `https://api.spotify.com/v1/playlists/${spotifyPlaylist.id}/tracks`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uris: chunk }),
            cache: "no-store",
          }
        );

        if (!addRes.ok) {
          const errMsg = await parseSpotifyError(addRes);
          console.error("Spotify add tracks error:", errMsg);
          // On retourne quand même l'URL Spotify, la playlist est créée
          return NextResponse.json({
            spotifyUrl: spotifyPlaylist.external_urls.spotify,
            warning: `Certains morceaux n'ont pas pu être ajoutés. ${errMsg}`,
          });
        }
      }
    }

    return NextResponse.json({
      spotifyUrl: spotifyPlaylist.external_urls.spotify,
      spotifyPlaylistId: spotifyPlaylist.id,
    });
  } catch (error) {
    console.error("Erreur export Spotify:", error);
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json(
      { error: `Erreur lors de l'export vers Spotify: ${message}` },
      { status: 500 }
    );
  }
}

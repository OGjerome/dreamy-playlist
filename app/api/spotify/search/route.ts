import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Récupère ce que l'utilisateur a tapé (ex: ?q=Dua+Lipa)
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ tracks: [] });
  }

  try {
    // TODO par votre collègue (Étape 1) : Récupérer le token de session Spotify
    // const session = await getServerSession(authOptions);
    // const accessToken = session?.accessToken;

    // --- LE VRAI APPEL API (À décommenter plus tard) ---
    /*
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const data = await response.json();
    const formattedTracks = data.tracks.items.map((item: any) => ({
        id: item.id,
        title: item.name,
        artist: item.artists[0].name,
        album: item.album.name,
        albumCover: item.album.images[0]?.url,
        duration: "3:00", // Convertir les ms en mm:ss
        spotifyId: item.uri
    }));
    return NextResponse.json({ tracks: formattedTracks });
    */

    // --- MOCK TEMPORAIRE ---
    // Pour tester votre UI (Création de playlist) immédiatement !
    await new Promise((resolve) => setTimeout(resolve, 600)); // Simule le temps de chargement

    const mockTracks = [
      {
        id: "mock1",
        title: `${query} (Version Studio)`,
        artist: "Artiste Trouvé",
        album: "Album 2025",
        albumCover: "/spotify.png",
        duration: "3:30",
        spotifyId: "spotify:track:123",
      },
      {
        id: "mock2",
        title: `${query} (Remix)`,
        artist: "DJ Virtuel",
        album: "Remixes",
        albumCover: "/spotify.png",
        duration: "4:15",
        spotifyId: "spotify:track:456",
      },
    ];

    return NextResponse.json({ tracks: mockTracks });
  } catch (error) {
    console.error("Erreur API Recherche Spotify:", error);
    return NextResponse.json(
      { error: "Erreur lors de la recherche" },
      { status: 500 },
    );
  }
}

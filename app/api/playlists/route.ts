import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // TODO: À décommenter quand votre collègue aura fini NextAuth
    // const session = await getServerSession(authOptions);
    // if (!session) return new NextResponse("Unauthorized", { status: 401 });
    // const userId = session.user.id;

    // Récupération des playlists depuis la base de données Prisma
    const playlists = await prisma.playlist.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        tracks: {
          include: {
            track: true, // Nécessaire pour accéder à imageUrl du morceau
          },
          orderBy: { position: "asc" }, // On trie par position
        },
      },
    });

    // Formatage pour correspondre parfaitement à votre hook "usePlaylists"
    const formattedPlaylists = playlists.map((p) => ({
      id: p.id,
      title: p.title,
      icon:
        p.tracks[0]?.track.imageUrl ||
        "https://external-preview.redd.it/skeleton-wlr-very-chill-playlist-v0-SQkNKj5s_4m-OYB8SOapRtNf3tf1oT3ZQcdev8Y0UJI.jpg?auto=webp&s=c622a1c1963cb1e77137abd029d4f95b677d59b2", // Image par défaut
      tracks: p.tracks.length,
      duration: "1h 00min", // Le calcul de la durée réelle pourra être fait plus tard
      lastModified: p.updatedAt.toLocaleDateString("fr-FR"),
      isLiked: false,
    }));

    return NextResponse.json(formattedPlaylists);
  } catch (error) {
    console.error("Erreur API GET playlists:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

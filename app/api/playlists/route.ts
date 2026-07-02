import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma";

interface TrackPayload {
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
}

// GET /api/playlists — Lister les playlists de l'utilisateur connecté
export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
  }

  const playlists = await prisma.playlist.findMany({
    where: { ownerId: user.id },
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
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ playlists });
}

// POST /api/playlists — Créer une playlist en base de données
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json() as {
    title: string;
    description?: string;
    isPublic?: boolean;
    tracks: TrackPayload[];
  };

  const { title, description, isPublic = false, tracks } = body;

  if (!title?.trim()) {
    return NextResponse.json({ error: "Le titre est requis" }, { status: 400 });
  }

  if (!tracks || tracks.length === 0) {
    return NextResponse.json({ error: "Aucun morceau sélectionné" }, { status: 400 });
  }

  // Récupérer ou créer l'utilisateur en DB
  let user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: session.user.email,
        name: session.user.name ?? null,
        image: session.user.image ?? null,
      },
    });
  }

  // Créer la playlist avec ses morceaux en transaction
  const playlist = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const newPlaylist = await tx.playlist.create({
      data: {
        title: title.trim(),
        description: description?.trim() ?? null,
        isPublic,
        ownerId: user.id,
      },
    });

    for (let i = 0; i < tracks.length; i++) {
      const t = tracks[i];

      // Upsert du Track (par spotifyId utilisé comme ISRC de substitution pour le MVP)
      const track = await tx.track.upsert({
        where: { isrc: `spotify:${t.spotifyId}` },
        update: {},
        create: {
          isrc: `spotify:${t.spotifyId}`,
          title: t.title,
          artist: t.artist,
          album: t.album || "",
          duration: (() => {
            const [mins, secs] = t.duration.split(":").map(Number);
            return (mins || 0) * 60 + (secs || 0);
          })(),
          imageUrl: t.cover || null,
          links: {
            create: {
              platform: "SPOTIFY",
              externalId: t.spotifyId,
              url: `https://open.spotify.com/track/${t.spotifyId}`,
            },
          },
        },
      });

      // Lier le morceau à la playlist
      await tx.trackInPlaylist.create({
        data: {
          playlistId: newPlaylist.id,
          trackId: track.id,
          position: i,
        },
      });
    }

    return newPlaylist;
  });

  return NextResponse.json({ playlist }, { status: 201 });
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/playlists/share/[token] — Récupérer une playlist publique par son shareToken
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (!token) {
    return NextResponse.json(
      { error: "Token manquant" },
      { status: 400 }
    );
  }

  const playlist = await prisma.playlist.findUnique({
    where: { shareToken: token },
    include: {
      owner: {
        select: { name: true, image: true },
      },
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
    return NextResponse.json(
      { error: "Playlist introuvable" },
      { status: 404 }
    );
  }

  if (!playlist.isPublic) {
    return NextResponse.json(
      { error: "Cette playlist est privée" },
      { status: 403 }
    );
  }

  return NextResponse.json({ playlist });
}

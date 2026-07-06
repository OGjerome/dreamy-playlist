import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// GET /api/playlists/[id] — Récupérer une playlist par ID
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Utilisateur introuvable" },
      { status: 404 }
    );
  }

  const playlist = await prisma.playlist.findUnique({
    where: { id },
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

  if (playlist.ownerId !== user.id) {
    return NextResponse.json(
      { error: "Vous n'êtes pas le propriétaire de cette playlist" },
      { status: 403 }
    );
  }

  return NextResponse.json({ playlist });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;

  // Vérifier que l'utilisateur est bien le propriétaire
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Utilisateur introuvable" },
      { status: 404 }
    );
  }

  const playlist = await prisma.playlist.findUnique({
    where: { id },
    select: { ownerId: true },
  });

  if (!playlist) {
    return NextResponse.json(
      { error: "Playlist introuvable" },
      { status: 404 }
    );
  }

  if (playlist.ownerId !== user.id) {
    return NextResponse.json(
      { error: "Vous n'êtes pas le propriétaire de cette playlist" },
      { status: 403 }
    );
  }

  // Supprimer la playlist (cascade supprime TrackInPlaylist)
  await prisma.playlist.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}

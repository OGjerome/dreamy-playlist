"use client";

import { useParams } from "next/navigation";
import PlaylistDetail from "@/components/playlist-detail";

export default function PlaylistDetailPage() {
  const params = useParams();
  const playlistId = params.id as string;

  return <PlaylistDetail playlistId={playlistId} />;
}

"use client";

import { redirect } from "next/navigation";

export default function PlaylistsPage() {
  // Redirige vers le dashboard qui contient la liste des playlists
  redirect("/dashboard");
}

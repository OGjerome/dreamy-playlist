import PlaylistDetail from "@/components/playlist-detail";

export default function PlaylistDynamicPage({
  params,
}: {
  params: { id: string };
}) {
  return <PlaylistDetail />;
}

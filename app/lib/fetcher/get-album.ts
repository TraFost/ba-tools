import type { ITrack } from "@/app/type/music-type";
import { createClient } from "@/app/lib/supabase/server";

function extractNumberFromId(title: string): number {
  const match = title.match(/\d+/);
  return match ? Number.parseInt(match[0], 10) : 0;
}

function sortTracksById(tracks: ITrack[]): ITrack[] {
  return tracks.slice().sort((a, b) => {
    const numA = extractNumberFromId(a.id);
    const numB = extractNumberFromId(b.id);
    return numA - numB;
  });
}

export const getAlbums = async () => {
  const supabase = await createClient();

  const { data: albums } = await supabase
    .from("albums")
    .select("*, album_tracks(musics(*))")
    .order("id", { ascending: true });

  const result = albums.map((album) => ({
    ...album,
    tracks: sortTracksById(album.album_tracks.map((t: { musics: ITrack }) => t.musics)),
  }));

  return result;
};

export const getAlbumByTitle = async (title: string) => {
  const supabase = await createClient();

  const { data: album } = await supabase
    .from("albums")
    .select("*, album_tracks(musics(*))")
    .eq("path", title)
    .single();

  return {
    ...album,
    tracks: sortTracksById(album.album_tracks.map((t: { musics: ITrack }) => t.musics)),
  };
};

export const getAlbumByArtist = async () => {
  const artistName = [
    "mitsukiyo",
    "karut",
    "nor",
    "aiobahn",
    "emocosine",
    "synthion",
    "7mai",
    "yuc'e",
    "ariuei",
    "hatsune miku",
  ];

  const supabase = await createClient();

  const filter = artistName.map((name) => `title.ilike.%${name}%`).join(",");

  const { data: albums } = await supabase
    .from("albums")
    .select("*, album_tracks(musics(*))")
    .or(filter);

  return albums.map((album) => ({
    ...album,
    tracks: sortTracksById(album.album_tracks.map((t: { musics: ITrack }) => t.musics)),
  }));
};

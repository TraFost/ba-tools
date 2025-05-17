import type { ITrack } from "@/app/type/music-type";
import { createClient } from "@/app/lib/supabase/server";
import { sortTracksById } from "../music/sortTracks";

export const getAlbums = async () => {
  const supabase = await createClient();

  const { data: albums } = await supabase
    .from("albums")
    .select("*, album_tracks(musics(*))")
    .order("section", { ascending: true })
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

export const getAlbumsBySection = async (section: string) => {
  const supabase = await createClient();

  const { data: albums } = await supabase
    .from("albums")
    .select("*, album_tracks(musics(*))")
    .order("id", { ascending: true })
    .eq("section", section);

  return albums.map((album) => ({
    ...album,
    tracks: sortTracksById(album.album_tracks.map((t: { musics: ITrack }) => t.musics)),
  }));
};

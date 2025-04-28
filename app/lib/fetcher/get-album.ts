import { createClient } from "../supabase/server";

export const getAlbums = async () => {
  const supabase = await createClient();

  const { data: albums } = await supabase
    .from("albums")
    .select("*")
    .order("id", { ascending: true });

  for (const album of albums) {
    const { data: albumTracks } = await supabase
      .from("album_tracks")
      .select("musics(*)")
      .eq("album_id", album.id);
    if (albumTracks) {
      album.tracks = albumTracks.map((track) => track.musics);
    }
  }

  return albums;
};

export const getAlbumByTitle = async (title: string) => {
  const supabase = await createClient();

  const { data: album } = await supabase.from("albums").select().eq("title", title).single();

  const { data: albumTracks } = await supabase
    .from("album_tracks")
    .select("musics(*)")
    .eq("album_id", album.id);

  if (albumTracks) {
    album.tracks = albumTracks.map((track) => track.musics);
  }

  return album;
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

  const { data: albums } = await supabase.from("albums").select("*").or(filter);

  for (const album of albums) {
    const { data: albumTracks } = await supabase
      .from("album_tracks")
      .select("musics(*)")
      .eq("album_id", album.id);
    if (albumTracks) {
      album.tracks = albumTracks.map((track) => track.musics);
    }
  }

  return albums;
};

import { createClient } from "@/app/lib/supabase/server";
import { sortTracksById } from "../music/sortTracks";

export const getMusics = async () => {
  const supabase = await createClient();

  const { data: musics } = await supabase.from("musics").select("*");

  return sortTracksById(musics);
};

export const getSomeMusics = async (limit: number) => {
  const supabase = await createClient();

  const { data: musics } = await supabase
    .from("musics")
    .select("*")
    .limit(limit)
    .order("id", { ascending: true });

  return musics;
};

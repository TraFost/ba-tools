import { createClient } from "../supabase/server";

export const getMusics = async () => {
  const supabase = await createClient();

  const { data: musics } = await supabase.from("musics").select("*");

  return musics;
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

export const getSingleMusic = async () => {
  const supabase = await createClient();

  const { data: musics } = await supabase.from("musics").select("*").order("random()").limit(1);

  return musics;
};

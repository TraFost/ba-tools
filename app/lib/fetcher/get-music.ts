import type { ITrack } from "@/app/type/music-type";
import { createClient } from "@/app/lib/supabase/server";

function extractNumberFromTitle(title: string): number {
  const match = title.match(/\d+/);
  return match ? Number.parseInt(match[0], 10) : 0;
}

function sortTracksById(tracks: ITrack[]): ITrack[] {
  return tracks.slice().sort((a, b) => {
    const numA = extractNumberFromTitle(a.id);
    const numB = extractNumberFromTitle(b.id);
    return numA - numB;
  });
}

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

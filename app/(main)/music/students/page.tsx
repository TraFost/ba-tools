import MusicList from "@/app/components/music/music-list";
import { createClient } from "@/app/lib/supabase/server";

const StudentsPage = async () => {
  const supabase = await createClient();
  const { data: tracks } = await supabase.from("musics").select("*");

  if (!tracks || tracks.length === 0) return <div>No tracks found</div>;

  return (
    <div>
      <MusicList musicList={tracks} />
    </div>
  );
};

export default StudentsPage;

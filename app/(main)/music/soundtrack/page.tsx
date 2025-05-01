import AlbumImage from "components/music/album-image";
import MusicList from "components/music/music-list";
import { getMusics } from "@/app/lib/fetcher/getMusic";

const SoundtrackPage = async () => {
  const tracks = await getMusics();

  if (!tracks || tracks.length === 0) return <div>No tracks found</div>;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex max-lg:flex-col gap-4">
        <picture className="w-full max-w-52 max-lg:mx-auto">
          <AlbumImage
            music={tracks}
            src="/ost.jpg"
            alt="Akane"
            width={720}
            height={720}
            isVisible={true}
          />
        </picture>
        <div className="flex flex-col justify-end gap-1 lg:gap-3">
          <p className="text-accent-foreground font-semibold">Playlist</p>
          <p className="capitalize text-4xl font-bold text-accent">Blue Archive Soundtracks</p>
          <p className="text-accent-foreground font-semibold text-lg">{tracks.length} tracks</p>
        </div>
      </div>
      <MusicList musicList={tracks} />
    </div>
  );
};

export default SoundtrackPage;

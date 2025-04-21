import AlbumImage from "components/music/album-image";
import { albums } from "@/app/data/dataMusic";
import MusicList from "components/music/music-list";

const AlbumPage = async ({
  params,
}: {
  params: Promise<{ title: string }>;
}) => {
  const { title } = await params;
  const { image, musics } = albums[title];

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex max-lg:flex-col gap-4">
        <AlbumImage
          music={musics}
          src={image}
          alt={title}
          width={208}
          height={208}
          isVisible={true}
        />
        <div className="flex flex-col justify-end gap-1 lg:gap-3">
          <p className="text-accent-foreground font-semibold">Playlist</p>
          <p className="capitalize text-4xl font-bold text-accent">{title.replaceAll("-", " ")}</p>
          <p className="text-accent-foreground font-semibold text-lg">{musics?.length} tracks</p>
        </div>
      </div>
      <MusicList musicList={musics} />
    </div>
  );
};

export default AlbumPage;

import AlbumImage from "components/music/album-image";
import MusicList from "components/music/music-list";
import { getAlbumByTitle } from "@/app/lib/fetcher/get-album";
import type { IAlbum } from "@/app/type/music-type";

const AlbumPage = async ({
  params,
}: {
  params: Promise<{ title: string }>;
}) => {
  const { title } = await params;

  const album: IAlbum = await getAlbumByTitle(title);

  if (!album) <div>No album found</div>;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex max-lg:flex-col gap-4">
        <picture className="w-full max-w-52 max-lg:mx-auto">
          <AlbumImage
            music={album.tracks}
            src={
              album.image
                ? `https://jyxwxdxjdshypymisxeo.supabase.co/storage/v1/object/public/music/images/${album.image}`
                : "/icon.png"
            }
            alt={title}
            width={720}
            height={720}
            isVisible={true}
          />
        </picture>
        <div className="flex flex-col justify-end gap-1 lg:gap-3">
          <p className="text-accent-foreground font-semibold">Playlist</p>
          <p className="capitalize text-4xl font-bold text-accent">{album.title}</p>
          <p className="text-accent-foreground font-semibold text-lg">
            {album.tracks.length} tracks
          </p>
        </div>
      </div>
      <MusicList musicList={album.tracks} />
    </div>
  );
};

export default AlbumPage;

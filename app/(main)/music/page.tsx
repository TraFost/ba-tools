import { Link } from "components/ui/link";
import AlbumImage from "components/music/album-image";
import { getAlbums } from "@/app/lib/fetcher/get-album";
import type { IAlbum } from "@/app/type/music-type";
import CarouselMusic from "@/app/components/music/carousel-music";
import { artistName } from "@/app/config/constants";
import { getSomeMusics } from "@/app/lib/fetcher/get-music";
import MusicList from "@/app/components/music/music-list";

const MusicPage = async () => {
  const albums = await getAlbums();
  const musics = await getSomeMusics(5);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-4xl font-bold">Artists</p>
          <Link
            href="/music/artists"
            className="text-accent-foreground font-semibold text-lg hover:underline"
          >
            See all artists
          </Link>
        </div>
        <CarouselMusic albums={albums} />
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-4xl font-bold">Musics</p>
          <Link
            href="/music/musics"
            className="text-accent-foreground font-semibold text-lg hover:underline"
          >
            See all musics
          </Link>
        </div>
        <MusicList musicList={musics} />
      </div>
      <div>
        <p className="text-4xl font-bold">other playlists</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 lg:gap-4">
          {albums.map(
            async (album: IAlbum) =>
              !artistName.includes(album.title.toLowerCase()) && (
                <Link
                  href={`/music/${album.title.replaceAll(" ", "-")}`}
                  key={album.id}
                  className="flex flex-col gap-2 hover:bg-primary/50 rounded-xl p-2 group transition-colors duration-200"
                  draggable={false}
                >
                  <AlbumImage
                    music={album.tracks}
                    src={
                      album.image
                        ? `https://jyxwxdxjdshypymisxeo.supabase.co/storage/v1/object/public/music/images/${album.image}`
                        : "/icon.png"
                    }
                    alt={album.title}
                    width={720}
                    height={720}
                    isVisible={false}
                  />
                  <div className="px-2 pb-2">
                    <p className="font-bold capitalize line-clamp-2">{album.title}</p>
                  </div>
                </Link>
              ),
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;

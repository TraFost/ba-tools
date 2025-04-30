import AlbumImage from "components/music/album-image";
import { Link } from "components/ui/link";
import { getAlbumByArtist } from "@/app/lib/fetcher/getAlbum";
import type { IAlbum } from "@/app/type/music-type";

const ArtistsPage = async () => {
  const albums = await getAlbumByArtist();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 lg:gap-4">
      {albums.map((album: IAlbum) => (
        <Link
          href={`/music/${album.path}`}
          key={album.id}
          className="flex flex-col gap-2 hover:bg-primary/50 rounded-xl p-2 group transition-colors duration-200"
          draggable={false}
        >
          <AlbumImage
            music={album.tracks}
            src={album.image ? album.image : "/Akane_(Bunny_Girl).png"}
            alt={album.title}
            width={256}
            height={256}
            isVisible={false}
          />
          <div className="px-2 pb-2">
            <p className="font-bold capitalize line-clamp-2">{album.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ArtistsPage;

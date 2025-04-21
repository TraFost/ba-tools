import { Input } from "components/ui/input";
import { albums } from "@/app/data/dataMusic";
import { Link } from "components/ui/link";
import AlbumImage from "components/music/album-image";

const MusicPage = () => {
  return (
    <>
      <Input
        className="rounded-full max-w-1/2 mb-4 mx-auto hidden lg:block"
        placeholder="🔎 Search..."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 lg:gap-4">
        {Object.entries(albums).map(([title, album]) => (
          <Link
            href={`/music/${title}`}
            key={title}
            className="flex flex-col gap-2 hover:bg-primary/50 rounded-xl p-2 group transition-colors duration-200"
            draggable={false}
          >
            <AlbumImage
              music={album.musics}
              src={album.image}
              alt={title}
              width={256}
              height={256}
              isVisible={false}
            />
            <div className="px-2 pb-2">
              <p className="font-bold capitalize line-clamp-2">{title}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default MusicPage;

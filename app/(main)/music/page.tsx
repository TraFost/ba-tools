import { Input } from "components/ui/input";
import { albums } from "@/app/data/dataMusic";
import AlbumCard from "components/music/album-card";

const MusicPage = () => {
  return (
    <>
      <Input
        className="rounded-full max-w-1/2 mb-4 mx-auto hidden lg:block"
        placeholder="🔎 Search..."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {Object.entries(albums).map(([title, album]) => (
          <AlbumCard
            image={album.image}
            title={title.replaceAll("-", " ")}
            href={title}
            key={title}
          />
        ))}
      </div>
    </>
  );
};

export default MusicPage;

import AlbumCard from "components/music/album-card";
import { Input } from "@/app/components/ui/input";
import { albums } from "@/app/data/dataMusic";

const MusicPage = () => {
  return (
    <>
      <Input className="rounded-full max-w-1/2 mb-4 mx-auto" placeholder="🔎 Search..." />
      <div className="flex flex-wrap gap-2">
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

import AlbumImage from "components/music/album-image";
import { albums } from "@/app/data/dataMusic";
import { EllipsisIcon, PlayIcon } from "lucide-react";

const AlbumPage = async ({
  params,
}: {
  params: Promise<{ title: string }>;
}) => {
  const { title } = await params;
  const { image, songs } = albums[title];

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex gap-4">
        <AlbumImage src={image} alt={title} width={208} height={208}>
          <div className="absolute bottom-3 right-3 w-12 cursor-pointer aspect-square bg-primary text-primary-foreground rounded-full p-2 flex items-center justify-center transition-all duration-200 hover:scale-110">
            <PlayIcon fill="#33445c" size={28} />
          </div>
        </AlbumImage>
        <div className="flex flex-col justify-end gap-3">
          <p className="text-accent-foreground font-semibold">Playlist</p>
          <p className="capitalize text-4xl font-bold text-accent">{title.replaceAll("-", " ")}</p>
          <p className="text-accent-foreground font-semibold text-lg">{songs.length} tracks</p>
        </div>
      </div>
      <div>
        <div className="text-accent cursor-pointer flex justify-between items-center rounded-xl px-6 py-3 hover:bg-primary/25 group">
          <div className="flex items-center gap-6">
            <div className="w-6 flex justify-center items-center">
              <p className="text-lg font-semibold group-hover:hidden">1</p>
              <PlayIcon size={20} fill="#4c5b6d" className="hidden group-hover:block" />
            </div>
            <div>
              <p className="text-lg font-bold">Usagi Flap</p>
              <p className="text-accent-foreground text-sm font-semibold">Mitsukiyo</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-accent-foreground text-sm">2:37</p>
            <div className="hover:bg-black/10 rounded-full p-1.5">
              <EllipsisIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;

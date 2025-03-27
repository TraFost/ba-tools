import { albums, songs as songList } from "@/app/data/dataMusic";
import Image from "next/image";

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
        <Image
          src={image}
          alt={title}
          width={256}
          height={256}
          className="aspect-square object-cover rounded-lg w-52"
        />
        <div className="flex flex-col justify-center">
          <p className="text-accent-foreground font-semibold">Playlist</p>
          <p className="capitalize text-3xl font-bold text-accent">{title.replaceAll("-", " ")}</p>
          <p className="text-accent-foreground font-semibold text-lg">{songs.length} tracks</p>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-6 px-6 py-3 hover:bg-primary/25">
          <p className="text-lg font-semibold">1</p>
          <div>
            <p className="text-lg font-semibold text-accent">Usagi Flap</p>
            <p className="text-accent-foreground text-sm">Mitsukiyo</p>
          </div>
        </div>
        <div className="flex items-center gap-6 px-6 py-3 hover:bg-primary/25">
          <p className="text-lg font-semibold">1</p>
          <div>
            <p className="text-lg font-semibold text-accent">Usagi Flap</p>
            <p className="text-accent-foreground text-sm">Mitsukiyo</p>
          </div>
        </div>
        <div className="flex items-center gap-6 px-6 py-3 hover:bg-primary/25">
          <p className="text-lg font-semibold">1</p>
          <div>
            <p className="text-lg font-semibold text-accent">Usagi Flap</p>
            <p className="text-accent-foreground text-sm">Mitsukiyo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;

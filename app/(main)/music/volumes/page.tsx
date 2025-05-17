import AlbumImage from "@/app/components/music/album-image";
import { Link } from "@/app/components/ui/link";
import { getAlbumsBySection } from "@/app/lib/fetcher/getAlbum";
import type { IAlbum } from "@/app/type/music-type";
import React from "react";

const VolumesPage = async () => {
  const albums = await getAlbumsBySection("ost volume");

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4">Blue Archive Original Soundtrack Volume</h2>
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
              src={
                album.image
                  ? `https://jyxwxdxjdshypymisxeo.supabase.co/storage/v1/object/public/music/images/${album.image}`
                  : "/icon.png"
              }
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
    </div>
  );
};

export default VolumesPage;

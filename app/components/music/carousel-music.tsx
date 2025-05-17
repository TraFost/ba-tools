"use client";

import type { FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "components/ui/carousel";
import { Link } from "components/ui/link";
import AlbumImage from "components/music/album-image";
import type { IAlbum } from "@/app/type/music-type";

interface Props {
  albums: IAlbum[];
  section: string;
}

const CarouselMusic: FC<Props> = (props) => {
  const { albums, section } = props;

  return (
    <Carousel className="mx-14">
      <CarouselContent>
        {albums.map(
          (album: IAlbum) =>
            album.section === section && (
              <CarouselItem
                key={album.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
              >
                <Link
                  href={`/music/${album.path}`}
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
              </CarouselItem>
            ),
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselMusic;

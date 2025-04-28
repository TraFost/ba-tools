"use client";

import type { FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Link } from "../ui/link";
import AlbumImage from "./album-image";
import type { IAlbum } from "@/app/type/music-type";

interface Props {
  albums: IAlbum[];
}

const artistName = [
  "mitsukiyo",
  "karut",
  "nor",
  "aiobahn",
  "emocosine",
  "synthion",
  "7mai",
  "yuc'e",
  "ariuei",
  "hatsune miku",
];

const CarouselMusic: FC<Props> = (props) => {
  const { albums } = props;

  return (
    <Carousel className="mx-14">
      <CarouselContent>
        {albums.map(
          (album: IAlbum) =>
            artistName.includes(album.title.toLowerCase()) && (
              <CarouselItem
                key={album.id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
              >
                <Link
                  href={`/music/${album.title.replaceAll(" ", "-")}`}
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

"use client";

import { useMusicContext } from "providers/music-providers";
import { PlayIcon } from "lucide-react";
import Image from "next/image";
import type { FC } from "react";
import type { ITrack } from "@/app/type/music-type";
import { playTrack } from "@/app/lib/music/playTrack";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  isVisible: boolean;
  tracks: ITrack[];
}

const AlbumImage: FC<Props> = (props) => {
  const { src, alt, width, height, isVisible, tracks } = props;

  const context = useMusicContext();

  const { isShuffle, setQueue } = context;

  return (
    <div className="overflow-hidden rounded-lg relative w-fit max-lg:mx-auto">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="aspect-square object-cover object-center group-hover:scale-110 ease-in-out duration-200"
        draggable={false}
      />
      <button
        type="button"
        className={
          isVisible
            ? "absolute bottom-3 right-3 cursor-pointer w-10 lg:w-12 aspect-square bg-primary text-primary-foreground rounded-full p-2 flex items-center justify-center transition-all duration-200 hover:scale-110"
            : "absolute bottom-3 right-3 cursor-pointer w-10 lg:w-12 aspect-square bg-primary text-primary-foreground rounded-full p-2 flex items-center justify-center lg:opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 hover:scale-125"
        }
        onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.preventDefault();
          if (isShuffle) {
            const shuffled = [...tracks];
            for (let i = shuffled.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }

            setQueue(shuffled);
            playTrack(context, shuffled[0], 0, shuffled);
          } else {
            playTrack(context, tracks[0], 0, tracks);
          }
        }}
      >
        <PlayIcon fill="#33445c" />
      </button>
    </div>
  );
};

export default AlbumImage;

"use client";

import { type Track, useMusicContext } from "providers/music-providers";
import { PlayIcon } from "lucide-react";
import Image from "next/image";
import type { FC } from "react";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  isVisible: boolean;
  music: Track[];
}

const AlbumImage: FC<Props> = (props) => {
  const { src, alt, width, height, isVisible, music } = props;

  const { setCurrentTrack, setTrackIndex, setPlaylist } = useMusicContext();

  const handlePlay = (music: Track[]) => {
    setCurrentTrack(music[0]);
    setTrackIndex(0);
    setPlaylist(music);
  };

  return (
    <picture className="overflow-hidden rounded-lg relative w-fit max-lg:mx-auto">
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
            ? "absolute bottom-3 right-3 w-12 cursor-pointer aspect-square bg-primary text-primary-foreground rounded-full p-2 flex items-center justify-center transition-all duration-200 hover:scale-110"
            : "absolute bottom-3 right-3 cursor-pointer w-12 aspect-square bg-primary text-primary-foreground rounded-full p-2 flex items-center justify-center opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 hover:scale-125"
        }
        onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.preventDefault();
          handlePlay(music);
        }}
      >
        <PlayIcon fill="#33445c" />
      </button>
    </picture>
  );
};

export default AlbumImage;

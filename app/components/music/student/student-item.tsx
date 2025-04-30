"use client";

import type { FC } from "react";
import Image from "next/image";
import type { IStudent } from "@/app/type/student-type";
import { PlayIcon } from "lucide-react";
import { useMusicContext } from "@/app/providers/music-providers";

interface Props {
  student: IStudent;
}

const StudentItem: FC<Props> = (props) => {
  const { student } = props;

  const { setCurrentTrack, setTrackIndex, setQueue, audioRef, setIsPlaying } = useMusicContext();

  const handlePlay = () => {
    setCurrentTrack(student.track);
    setTrackIndex(0);
    setQueue([student.track]);
    setIsPlaying(true);
    audioRef.current?.play();
  };

  return (
    <button
      type="button"
      onClick={handlePlay}
      className="flex items-center group gap-4 hover:bg-primary/50 cursor-pointer rounded-xl p-2"
    >
      <div className="relative shrink-0">
        <Image
          src={`https://jyxwxdxjdshypymisxeo.supabase.co/storage/v1/object/public/student/collection/${student.image}.webp`}
          alt={student.name}
          width={52}
          height={52}
          className="aspect-square rounded-md object-cover group-hover:brightness-50"
          loading="lazy"
        />
        <PlayIcon
          fill="#78d8ed"
          className="absolute inset-1/2 -translate-1/2 hidden group-hover:block text-primary"
        />
      </div>
      <div className="text-left">
        <p className="font-bold text-xl line-clamp-1">{student.name}</p>
        <p className="font-semibold line-clamp-1 text-accent-foreground">{student.track.title}</p>
      </div>
    </button>
  );
};

export default StudentItem;

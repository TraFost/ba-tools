"use client";

import { useMusicContext } from "providers/music-providers";
import { DownloadIcon, EllipsisIcon, Share2Icon, Trash2Icon, UserRoundIcon } from "lucide-react";
import type { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu";
import type { ITrack } from "@/app/type/music-type";

interface Props {
  title: string;
  artist: string;
  music: ITrack;
  index: number;
}

const QueueList: FC<Props> = (props) => {
  const { title, artist, music, index } = props;

  const { queue, setQueue, currentTrack, setCurrentTrack, setTrackIndex } = useMusicContext();

  const handlePlay = (music: ITrack, index: number) => {
    setCurrentTrack(music);
    setTrackIndex(index);
  };

  const handleRemove = () => {
    setQueue((prev) => prev.filter((track) => track.title !== title));
  };

  return (
    <button
      type="button"
      onClick={() => handlePlay(music, index)}
      className={`flex items-center justify-between gap-4 w-full cursor-pointer hover:bg-primary/25 rounded-xl p-4 text-left ${currentTrack.title === title ? "bg-primary/25" : ""}`}
    >
      <div>
        <p className="font-bold text-lg line-clamp-1">{title}</p>
        <p className="font-semibold line-clamp-1">{artist}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="hover:bg-black/10 rounded-full p-1.5">
            <EllipsisIcon />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="font-semibold text-accent bg-white rounded-lg shadow-lg p-4">
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              if (queue.length === 1) return;
              handleRemove();
            }}
          >
            <Trash2Icon />
            <span>Remove from queue</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
            <DownloadIcon />
            <span>Download music</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
            <UserRoundIcon />
            <span>Go to composer</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
            <Share2Icon />
            <span>Share</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </button>
  );
};

export default QueueList;

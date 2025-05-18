"use client";

import {
  PlayIcon,
  EllipsisIcon,
  DownloadIcon,
  ListMusicIcon,
  UserRoundIcon,
  ListCheckIcon,
} from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu";
import { useMusicContext } from "providers/music-providers";
import { Link } from "components/ui/link";
import type { ITrack } from "@/app/type/music-type";
import { artistName } from "@/app/config/music";
import { playTrack } from "@/app/lib/music/playTrack";
import { toast } from "sonner";

interface Props {
  music: ITrack;
  index: number;
  musicList: ITrack[];
}

const TrackItem = ({ music, index, musicList }: Props) => {
  const context = useMusicContext();
  const { setQueue, currentTrack, trackIndex, queue, isShuffle } = context;
  const queueId = queue.map((item) => item.id);

  const isCurrent = currentTrack?.title === music.title;

  const artist = music.artist.split(", ");

  const downloadMusic = async () => {
    const response = await fetch(music.src);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `${music.artist} - ${music.title}.ogg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(blobUrl);
    toast.success("Success download!", {
      description: `${music.artist} - ${music.title}`,
    });
  };

  return (
    <button
      type="button"
      onClick={() => {
        if (isShuffle) {
          for (let i = musicList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [musicList[i], musicList[j]] = [musicList[j], musicList[i]];
          }
          playTrack(context, music, index, musicList);
        } else {
          playTrack(context, music, index, musicList);
        }
      }}
      className={`w-full text-accent cursor-pointer flex justify-between items-center rounded-xl px-3 py-3 hover:bg-primary/25 group ${isCurrent ? "bg-primary/25" : ""}`}
    >
      <div className="flex items-center gap-6">
        <div className="w-6 flex justify-center items-center max-lg:hidden">
          <p className="text-lg font-semibold group-hover:hidden">{index + 1}</p>
          <PlayIcon size={20} fill="#4c5b6d" className="hidden group-hover:block" />
        </div>
        <div className="flex items-center gap-2">
          <div className="shrink-0">
            <Image
              src={
                music.image
                  ? `https://jyxwxdxjdshypymisxeo.supabase.co/storage/v1/object/public/music/images/${music.image}`
                  : "/icon.png"
              }
              width={128}
              height={128}
              alt={music.title}
              className="w-12 h-12 rounded-lg object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="lg:text-lg font-bold max-lg:line-clamp-1 text-left">{music.title}</p>
            <p className="text-accent-foreground text-sm font-semibold w-fit text-left line-clamp-1">
              {music.artist}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <p className="text-accent-foreground text-sm font-semibold w-fit text-left">{music.id}</p>
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
                setQueue((q) => {
                  if (q.find((item) => item.src === music.src)) return q;

                  const newQueue = [...q];
                  newQueue.splice(trackIndex + 1, 0, music);
                  toast.success("Added to queue", {
                    description: `${music.title} - ${music.artist}`,
                  });
                  return newQueue;
                });
              }}
            >
              {queueId.includes(music.id) ? (
                <>
                  <ListCheckIcon />
                  <span>Added to queue</span>
                </>
              ) : (
                <>
                  <ListMusicIcon />
                  <span>Add to queue</span>
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                downloadMusic();
              }}
            >
              <DownloadIcon />
              <span>Download</span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild onClick={(e) => e.stopPropagation()}>
              <Link
                href={`/music/${artistName.includes(artist[0].toLowerCase()) ? artist[0].toLowerCase().replaceAll(" ", "-") : "soundtrack"}`}
              >
                <UserRoundIcon />
                <span>Go to composer</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </button>
  );
};

export default TrackItem;

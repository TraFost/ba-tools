"use client";

import { type Track, useMusicContext } from "providers/music-providers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu";
import {
  DownloadIcon,
  EllipsisIcon,
  ListMusicIcon,
  PlayIcon,
  Share2Icon,
  UserRoundIcon,
} from "lucide-react";
import type { FC } from "react";

interface Props {
  musicList: Track[];
}

const MusicList: FC<Props> = (props) => {
  const { musicList } = props;

  const { setCurrentTrack, setTrackIndex, setPlaylist, currentTrack } = useMusicContext();

  const handlePlay = (music: Track, index: number) => {
    setCurrentTrack(music);
    setTrackIndex(index);
    setPlaylist(musicList);
  };

  return (
    <div className="mb-[100px]">
      {musicList?.map((music: Track, index: number) => (
        <button
          type="button"
          key={music.src}
          onClick={() => handlePlay(music, index)}
          className={`w-full text-accent cursor-pointer flex justify-between items-center rounded-xl px-3 py-3 hover:bg-primary/25 group ${currentTrack.title === music.title ? "bg-primary/25" : ""}`}
        >
          <div className="flex items-center gap-6">
            <div className="w-6 flex justify-center items-center max-lg:hidden">
              <p className="text-lg font-semibold group-hover:hidden">{index + 1}</p>
              <PlayIcon size={20} fill="#4c5b6d" className="hidden group-hover:block" />
            </div>
            <div className="flex items-center gap-2">
              <div className="shrink-0">
                <img
                  src={music.image}
                  alt={music.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              </div>
              <div>
                <p className="lg:text-lg font-bold max-lg:line-clamp-1 text-left">{music.title}</p>
                <p className="text-accent-foreground text-sm font-semibold w-fit text-left">
                  {music.artist}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-accent-foreground text-sm">2:37</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="hover:bg-black/10 rounded-full p-1.5">
                  <EllipsisIcon />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="font-semibold text-accent bg-white rounded-lg shadow-lg p-4">
                <DropdownMenuItem
                  onClick={(e) => {
                    setPlaylist((track) =>
                      track.find((item) => item.src === music.src) ? track : [...track, music],
                    );
                    e.stopPropagation();
                  }}
                >
                  <ListMusicIcon />
                  <span>Add to queue</span>
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
          </div>
        </button>
      ))}
    </div>
  );
};

export default MusicList;

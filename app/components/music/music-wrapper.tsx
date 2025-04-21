"use client";

import type { FC, ReactNode } from "react";
import { Disc3Icon, ListMusicIcon, MicVocalIcon, MusicIcon } from "lucide-react";
import AsideContent from "components/music/aside-content";
import { albums } from "@/app/data/dataMusic";
import AudioPlayer from "components/music/audio-player";
import MobileNav from "components/music/mobile/mobile-nav";
import { useMusicContext } from "providers/music-providers";

interface IAsideContent {
  text: string;
  icon: ReactNode;
}

const asideList = {
  discover: [
    {
      icon: <Disc3Icon size={20} />,
      text: "Music Archive",
    },
  ],
  library: [
    {
      icon: <MusicIcon size={20} />,
      text: "Songs",
    },
    {
      icon: <MicVocalIcon size={20} />,
      text: "Artists",
    },
  ],
};

interface Props {
  children: ReactNode;
}

const MusicWrapper: FC<Props> = (props) => {
  const { children } = props;
  const {
    audioRef,
    currentTrack,
    isShuffle,
    isRepeat,
    playlist,
    setCurrentTrack,
    setTrackIndex,
    trackIndex,
    setIsPlaying,
  } = useMusicContext();

  const handleNext = () => {
    setTrackIndex((prev) => {
      const newIndex = isShuffle
        ? Math.floor(Math.random() * playlist.length)
        : prev >= playlist.length - 1
          ? 0
          : prev + 1;
      setCurrentTrack(playlist[newIndex]);
      return newIndex;
    });
  };

  return (
    <div>
      {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
      <audio
        preload="metadata"
        key={currentTrack.src}
        src={`/music/${currentTrack.src}`}
        ref={audioRef}
        onEnded={() => {
          if (!isRepeat && playlist.length - 1 === trackIndex && !isShuffle) {
            audioRef.current?.pause();
            setIsPlaying(false);
          } else {
            handleNext();
          }
        }}
      />
      {/* Desktop */}
      <div className="text-secondary-foreground hidden lg:block">
        <div className="flex gap-4 min-h-full mt-7">
          <aside className="bg-secondary text-secondary-foreground rounded-xl font-bold w-1/4 min-w-[272px] h-[calc(100vh-220px)] sticky top-7 left-7 p-6 flex flex-col gap-4 overflow-y-auto">
            {Object.keys(asideList).map((val) => (
              <div key={val} className="flex flex-col gap-1">
                <h2 key={val} className="capitalize">
                  {val}
                </h2>
                <div className="flex flex-col gap-0.5">
                  {asideList[val].map((list: IAsideContent) => (
                    <AsideContent href="/music" text={list.text} key={list.text}>
                      {list.icon}
                    </AsideContent>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-1">
              <h2 className="capitalize">Playlist</h2>
              <div className="flex flex-col gap-0.5">
                {Object.entries(albums).map(([title]) => (
                  <AsideContent
                    href={`/music/${title}`}
                    text={title.replaceAll("-", " ")}
                    key={title}
                  >
                    <ListMusicIcon />
                  </AsideContent>
                ))}
              </div>
            </div>
          </aside>
          <main className="mx-7 px-4 mb-28 rounded-xl w-full">{children}</main>
        </div>
        <AudioPlayer />
      </div>

      {/* Mobile */}
      <div className="text-secondary-foreground lg:hidden">
        <main className="mx-2 mt-6 pb-44">{children}</main>
        <AudioPlayer />
        <MobileNav />
      </div>
    </div>
  );
};

export default MusicWrapper;

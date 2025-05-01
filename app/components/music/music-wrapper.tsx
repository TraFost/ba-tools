"use client";

import { useEffect, type FC, type ReactNode } from "react";
import AsideContent from "components/music/aside-content";
import AudioPlayer from "components/music/audio-player";
import MobileNav from "components/music/mobile/mobile-nav";
import { useMusicContext } from "providers/music-providers";
import type { IAlbum } from "@/app/type/music-type";

interface Props {
  children: ReactNode;
  albums: IAlbum[];
}

const MusicWrapper: FC<Props> = (props) => {
  const { children, albums } = props;
  const {
    audioRef,
    currentTrack,
    isShuffle,
    isRepeat,
    queue,
    setQueue,
    setCurrentTrack,
    setTrackIndex,
    trackIndex,
    setIsPlaying,
  } = useMusicContext();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (queue.length === 0 && albums.length > 0) {
      const randomIndex = Math.floor(Math.random() * albums.length);
      setQueue(albums[randomIndex].tracks);
      setCurrentTrack(albums[randomIndex].tracks[0]);
    }
  }, [albums]);

  const handleNext = () => {
    setTrackIndex((prev) => {
      const newIndex = isShuffle
        ? Math.floor(Math.random() * queue.length)
        : prev >= queue.length - 1
          ? 0
          : prev + 1;
      setCurrentTrack(queue[newIndex]);
      return newIndex;
    });
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div>
      {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
      <audio
        preload="none"
        key={currentTrack.src}
        src={currentTrack.src}
        ref={audioRef}
        onEnded={() => {
          if (!isRepeat && queue.length - 1 === trackIndex && !isShuffle) {
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
          <aside className="bg-secondary rounded-xl w-1/4 min-w-[272px] h-[calc(100vh-220px)] sticky top-7 left-7 p-6 flex flex-col gap-4 overflow-y-auto">
            <AsideContent albums={albums} />
          </aside>
          <main className="w-full overflow-x-hidden px-7 pb-28">{children}</main>
        </div>
        <AudioPlayer />
      </div>

      {/* Mobile */}
      <div className="text-secondary-foreground lg:hidden">
        <main className="mx-2 mt-6 pb-44">{children}</main>
        <AudioPlayer />
        <MobileNav albums={albums} />
      </div>
    </div>
  );
};

export default MusicWrapper;

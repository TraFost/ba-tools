"use client";

import { useEffect, type FC, type ReactNode } from "react";
import { Disc3Icon, ListMusicIcon, MicVocalIcon, MusicIcon } from "lucide-react";
import AsideContent from "components/music/aside-content";
import AudioPlayer from "components/music/audio-player";
import MobileNav from "components/music/mobile/mobile-nav";
import { useMusicContext } from "providers/music-providers";
import type { IAlbum } from "@/app/type/music-type";

interface IAsideContent {
  text: string;
  icon: ReactNode;
  href: string;
}

const asideList = {
  discover: [
    {
      icon: <Disc3Icon size={20} />,
      text: "Music Archive",
      href: "/music",
    },
  ],
  library: [
    {
      icon: <MusicIcon size={20} />,
      text: "Musics",
      href: "/music/tracklist",
    },
    {
      icon: <MicVocalIcon size={20} />,
      text: "Artists",
      href: "/music/artists",
    },
    {
      icon: <MicVocalIcon size={20} />,
      text: "Students",
      href: "/music/students",
    },
  ],
};

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
    const randomIndex = Math.floor(Math.random() * albums.length);
    setQueue(albums[randomIndex].tracks);
    setCurrentTrack(albums[randomIndex].tracks[0]);
  }, []);

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
        preload="metadata"
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
          <aside className="bg-secondary text-secondary-foreground rounded-xl font-bold w-1/4 min-w-[272px] h-[calc(100vh-220px)] sticky top-7 left-7 p-6 flex flex-col gap-4 overflow-y-auto">
            {Object.keys(asideList).map((val) => (
              <div key={val} className="flex flex-col gap-1">
                <h2 key={val} className="capitalize">
                  {val}
                </h2>
                <div className="flex flex-col gap-0.5">
                  {asideList[val].map((list: IAsideContent) => (
                    <AsideContent href={list.href} text={list.text} key={list.text}>
                      {list.icon}
                    </AsideContent>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-1">
              <h2 className="capitalize">Playlist</h2>
              <div className="flex flex-col gap-0.5">
                {albums.map((album) => (
                  <AsideContent
                    href={`/music/${album.title.replaceAll(" ", "-")}`}
                    text={album.title}
                    key={album.id}
                  >
                    <img
                      src={
                        album.image
                          ? `https://jyxwxdxjdshypymisxeo.supabase.co/storage/v1/object/public/music/images/${album.image}`
                          : "/icon.png"
                      }
                      alt={album.title}
                      className="w-8 h-8 rounded-md object-cover"
                    />
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

"use client";

import Image from "next/image";
import { useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "components/ui/drawer";
import { ListMusicIcon } from "lucide-react";
import VolumeControl from "components/music/audio-player/volume-control";
import NavDrawer from "components/music/nav-drawer";
import Controls from "components/music/audio-player/controls";
import { useMusicContext } from "providers/music-providers";
import ProgressBar from "components/music/audio-player/progress-bar";
import { Link } from "components/ui/link";
import { useMusicPlaybackContext } from "@/app/providers/music-playback-provider";
import QueueItem from "components/music/queue-item";
import MobilePlayer from "components/music/mobile/mobile-drawer-player";

const AudioPlayer = () => {
  const { audioRef, queue, currentTrack, setDuration, isPlaying, trackIndex } = useMusicContext();

  const { setCurrentTime, volume } = useMusicPlaybackContext();

  const artistPath = currentTrack.artist.toLowerCase().replaceAll(" ", "-");

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.currentTime = 0;
    setCurrentTime(0);

    if (isPlaying) {
      audio.play();
    }

    const handleMetadata = () => {
      if (!Number.isNaN(audio.duration)) setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", handleMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    const timeout = setTimeout(() => {
      if (audio.duration && !Number.isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    }, 0);

    return () => {
      audio.removeEventListener("loadedmetadata", handleMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      clearTimeout(timeout);
    };
  }, [trackIndex, currentTrack]);

  return (
    <>
      {/* Desktop */}
      <div className="grid grid-cols-3 justify-between items-center px-8 py-4 border-t-2 border-accent-foreground bg-white z-20 fixed bottom-0 w-full h-[100px]">
        <div className="ml-4 flex gap-4 items-center">
          <div className="w-16 shrink-0">
            <Image
              src={
                currentTrack.image
                  ? `https://jyxwxdxjdshypymisxeo.supabase.co/storage/v1/object/public/music/images/${currentTrack.image}`
                  : "/icon.png"
              }
              alt="alt"
              width={128}
              height={128}
              className="aspect-square object-cover rounded-lg"
            />
          </div>
          <div>
            <p className="font-bold text-xl line-clamp-1">{currentTrack.title}</p>
            <Link
              href={`/music/${artistPath !== "unknown-artist" ? artistPath : "/soundtrack"}`}
              className="text-accent-foreground font-semibold hover:underline"
            >
              {currentTrack.artist}
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center h-full gap-2">
          <Controls />
          <ProgressBar />
        </div>
        <div className="flex items-center justify-center gap-4 justify-self-end">
          <Drawer direction="right">
            <DrawerTrigger className="flex items-center justify-center p-2 rounded-lg hover:bg-accent-foreground/25 transition-colors duration-200 cursor-pointer">
              <ListMusicIcon />
            </DrawerTrigger>
            <DrawerContent className="w-[404px] right-2 top-2 bottom-2 mt-0 left-auto no-drawer-after px-4 text-secondary-foreground">
              <DrawerHeader>
                <DrawerTitle>Queue</DrawerTitle>
              </DrawerHeader>
              <div className="flex flex-col gap-2 overflow-y-auto">
                {queue.map((track, index) => (
                  <QueueItem
                    key={`${track.id}-${index}`}
                    title={track.title}
                    artist={track.artist}
                    music={track}
                    index={index}
                  />
                ))}
              </div>
            </DrawerContent>
          </Drawer>
          <VolumeControl />
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <NavDrawer
          title=""
          trigger={
            <div className="fixed bottom-[84px] z-20 bg-background w-full border-t-2 border-accent-foreground py-2 px-4 flex gap-4 items-center">
              <div className="w-16 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={
                    currentTrack.image
                      ? `https://jyxwxdxjdshypymisxeo.supabase.co/storage/v1/object/public/music/images/${currentTrack.image}`
                      : "/icon.png"
                  }
                  alt="alt"
                  width={64}
                  height={64}
                  className="aspect-square object-cover"
                  draggable={false}
                />
              </div>
              <div>
                <p className="text-xs text-accent-foreground font-semibold">Now Playing</p>
                <div>
                  <p className="font-bold text-xl line-clamp-1">{currentTrack.title}</p>
                  <p className="text-accent-foreground font-semibold">{currentTrack.artist}</p>
                </div>
              </div>
            </div>
          }
        >
          <MobilePlayer />
        </NavDrawer>
      </div>
    </>
  );
};

export default AudioPlayer;

import { useMusicContext } from "providers/music-providers";
import {
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  ShuffleIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "lucide-react";
import { useEffect } from "react";
import { sortTracksById } from "@/app/lib/music/sortTracks";

const Controls = () => {
  const {
    audioRef,
    trackIndex,
    setTrackIndex,
    currentTrack,
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
    queue,
    setQueue,
    isShuffle,
    setIsShuffle,
    isRepeat,
    setIsRepeat,
  } = useMusicContext();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || (e.target as HTMLElement)?.isContentEditable)
        return;

      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleShuffle = () => {
    const newValShuffle = !isShuffle;
    setIsShuffle(newValShuffle);

    if (newValShuffle) {
      const sliced = queue.filter((track) => track.id !== currentTrack.id);
      for (let i = sliced.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sliced[i], sliced[j]] = [sliced[j], sliced[i]];
      }
      const newQueue = [...sliced];
      newQueue.splice(trackIndex, 0, currentTrack);
      setQueue(newQueue);
    } else {
      const sorted = sortTracksById(queue);
      setQueue(sorted);

      const index = sorted.findIndex((track) => track.id === currentTrack.id);
      setTrackIndex(index !== -1 ? index : 0);
    }
  };

  const handleNext = () => {
    setTrackIndex((prev) => {
      const currentQueue = queue;
      if (currentQueue.length === 0) return prev;

      const newIndex = prev >= currentQueue.length - 1 ? 0 : prev + 1;

      const nextTrack = currentQueue[newIndex];
      setCurrentTrack(nextTrack);
      return newIndex;
    });
  };

  const handlePrev = () => {
    setTrackIndex((prev) => {
      const newIndex = prev === 0 ? queue.length - 1 : prev - 1;
      setCurrentTrack(queue[newIndex]);
      return newIndex;
    });
  };

  return (
    <div className="flex gap-4 lg:gap-2 items-center justify-center text-secondary-foreground">
      <button
        type="button"
        className={`p-2 cursor-pointer rounded-lg hover:bg-accent-foreground/25 transition-colors duration-200 ease-in-out ${isShuffle ? "bg-accent-foreground/25" : ""}`}
        onClick={handleShuffle}
      >
        <ShuffleIcon />
      </button>
      <button
        type="button"
        className="p-2 cursor-pointer rounded-lg hover:bg-accent-foreground/25 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-auto"
        onClick={handlePrev}
        disabled={queue.length === 0 || (!isRepeat && trackIndex === 0)}
      >
        <SkipBackIcon fill="#33445c" />
      </button>
      <button
        type="button"
        className="p-2 cursor-pointer rounded-full bg-primary hover:bg-primary/75 transition-colors duration-200 ease-in-out"
        onClick={togglePlay}
      >
        {isPlaying ? <PauseIcon fill="#33445c" /> : <PlayIcon fill="#33445c" />}
      </button>
      <button
        type="button"
        className="p-2 cursor-pointer rounded-lg hover:bg-accent-foreground/25 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-auto"
        onClick={handleNext}
        disabled={queue.length === 0 || (!isRepeat && trackIndex === queue.length - 1)}
      >
        <SkipForwardIcon fill="#33445c" />
      </button>
      <button
        type="button"
        className={`p-2 cursor-pointer rounded-lg hover:bg-accent-foreground/25 transition-colors duration-200 ease-in-out ${isRepeat ? "bg-accent-foreground/25" : ""}`}
        onClick={() => setIsRepeat((prev) => !prev)}
      >
        <RepeatIcon />
      </button>
    </div>
  );
};

export default Controls;

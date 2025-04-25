import { useMusicContext } from "providers/music-providers";
import {
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  ShuffleIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "lucide-react";

const Controls = () => {
  const {
    audioRef,
    setTrackIndex,
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
    queue,
    trackIndex,
    isShuffle,
    setIsShuffle,
    isRepeat,
    setIsRepeat,
  } = useMusicContext();

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

  const handleNext = () => {
    setTrackIndex((prev) => {
      const currentQueue = queue;
      if (currentQueue.length === 0) return prev;

      const newIndex = isShuffle
        ? Math.floor(Math.random() * currentQueue.length)
        : prev >= currentQueue.length - 1
          ? 0
          : prev + 1;

      const nextTrack = currentQueue[newIndex];
      setCurrentTrack(nextTrack);
      return newIndex;
    });
  };

  const handlePrev = () => {
    setTrackIndex((prev) => {
      const newIndex = isShuffle
        ? Math.floor(Math.random() * queue.length)
        : prev === 0
          ? queue.length - 1
          : prev - 1;
      setCurrentTrack(queue[newIndex]);
      return newIndex;
    });
  };

  return (
    <div className="flex gap-4 lg:gap-2 items-center justify-center text-secondary-foreground">
      <button
        type="button"
        className={`p-2 cursor-pointer rounded-lg hover:bg-accent-foreground/25 transition-colors duration-200 ease-in-out ${isShuffle ? "bg-accent-foreground/25" : ""}`}
        onClick={() => setIsShuffle((prev) => !prev)}
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            togglePlay();
          }
        }}
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

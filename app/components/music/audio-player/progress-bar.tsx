import { useMusicPlaybackContext } from "@/app/providers/music-playback-provider";
import { CustomSlider } from "components/ui/slider";
import { useMusicContext } from "providers/music-providers";

const ProgressBar = () => {
  const { duration, audioRef } = useMusicContext();
  const { currentTime, setCurrentTime } = useMusicPlaybackContext();

  const handleSeek = (value: number[]) => {
    if (audioRef.current && duration) {
      const newTime = (duration * value[0]) / 100;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      {/* Desktop */}
      <div className="w-full flex gap-2 items-center justify-center max-lg:hidden">
        <p>{formatTime(currentTime)}</p>
        <CustomSlider
          className="group"
          thumbClassName="opacity-0 group-hover:opacity-100"
          value={[duration ? (currentTime / duration) * 100 : 0]}
          onValueChange={handleSeek}
          max={100}
          min={0}
          step={0.1}
        />
        <p>{formatTime(duration)}</p>
      </div>

      {/* Mobile */}
      <div className="w-full flex flex-col gap-2 items-center justify-center lg:hidden">
        <CustomSlider
          className="group"
          thumbClassName="opacity-0 group-hover:opacity-100"
          value={[duration ? (currentTime / duration) * 100 : 0]}
          onValueChange={handleSeek}
          max={100}
          min={0}
          step={0.1}
        />
        <div className="flex items-center justify-between w-full">
          <p>{formatTime(currentTime)}</p>
          <p>{formatTime(duration)}</p>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;

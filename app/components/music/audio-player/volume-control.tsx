import { Volume1Icon, Volume2Icon, VolumeXIcon } from "lucide-react";
import { CustomSlider } from "components/ui/slider";
import { useMusicContext } from "providers/music-providers";
import { useEffect, useState } from "react";
import { useMusicPlaybackContext } from "@/app/providers/music-playback-provider";

const VolumeControl = () => {
  const { audioRef } = useMusicContext();
  const { volume, setVolume } = useMusicPlaybackContext();

  const [prevVolume, setPrevVolume] = useState<number>(1);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || (e.target as HTMLElement)?.isContentEditable)
        return;
      if (e.key === "M" || e.key === "m") {
        e.preventDefault();
        handleVolumeClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [volume]);

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  const handleVolumeClick = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
      if (audioRef.current) audioRef.current.volume = 0;
    } else {
      setVolume(prevVolume);
      if (audioRef.current) audioRef.current.volume = prevVolume;
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        type="button"
        onClick={handleVolumeClick}
        className="p-2 cursor-pointer rounded-lg hover:bg-accent-foreground/25 transition-colors duration-200 ease-in-out"
      >
        {volume > 0.5 ? (
          <Volume2Icon size={20} />
        ) : volume > 0 ? (
          <Volume1Icon size={20} />
        ) : (
          <VolumeXIcon size={20} />
        )}
      </button>
      <CustomSlider
        className="group w-[200px]"
        thumbClassName="opacity-0 group-hover:opacity-100"
        min={0}
        max={1}
        step={0.01}
        onValueChange={handleVolumeChange}
        value={[volume]}
      />
    </div>
  );
};

export default VolumeControl;

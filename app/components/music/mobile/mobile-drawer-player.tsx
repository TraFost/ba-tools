import { useMusicContext } from "@/app/providers/music-providers";
import Image from "next/image";
import ProgressBar from "components/music/audio-player/progress-bar";
import Controls from "components/music/audio-player/controls";

const MobilePlayer = () => {
  const { currentTrack } = useMusicContext();

  return (
    <div className="flex flex-col gap-4 mx-8">
      <Image
        src={
          currentTrack.image
            ? `https://jyxwxdxjdshypymisxeo.supabase.co/storage/v1/object/public/music/images/${currentTrack.image}`
            : "/icon.png"
        }
        alt="cover"
        width={256}
        height={256}
        className="aspect-square object-cover rounded-xl mx-auto"
        draggable={false}
      />
      <div>
        <p className="text-2xl font-bold line-clamp-1">{currentTrack.title}</p>
        <p className="text-xl font-semibold text-accent-foreground">{currentTrack.artist}</p>
      </div>
      <div>
        <ProgressBar />
        <Controls />
      </div>
    </div>
  );
};

export default MobilePlayer;

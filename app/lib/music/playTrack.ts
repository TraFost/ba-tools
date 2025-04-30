import type { ITrack } from "@/app/type/music-type";
import type { MusicContextType } from "@/app/providers/music-providers";

export const playTrack = (
  context: MusicContextType,
  music: ITrack,
  index: number,
  queue?: ITrack[],
) => {
  const { setCurrentTrack, setTrackIndex, setQueue, setIsPlaying, audioRef } = context;

  setCurrentTrack(music);
  setTrackIndex(index);
  if (queue) setQueue(queue);
  setIsPlaying(true);
  audioRef.current?.play();
};

"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useRef,
} from "react";
import type { ITrack } from "../type/music-type";

export interface MusicContextType {
  audioRef: React.RefObject<HTMLAudioElement>;
  currentTrack: ITrack;
  setCurrentTrack: Dispatch<SetStateAction<ITrack | null>>;
  trackIndex: number;
  setTrackIndex: Dispatch<SetStateAction<number>>;
  queue: ITrack[];
  setQueue: Dispatch<SetStateAction<ITrack[]>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
  isShuffle: boolean;
  setIsShuffle: Dispatch<SetStateAction<boolean>>;
  isRepeat: boolean;
  setIsRepeat: Dispatch<SetStateAction<boolean>>;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [queue, setQueue] = useState<ITrack[]>([]);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(true);

  const contextValue = {
    audioRef,
    queue,
    setQueue,
    currentTrack,
    setCurrentTrack,
    trackIndex,
    setTrackIndex,
    isPlaying,
    setIsPlaying,
    duration,
    setDuration,
    isShuffle,
    setIsShuffle,
    isRepeat,
    setIsRepeat,
  };

  return <MusicContext.Provider value={contextValue}>{children}</MusicContext.Provider>;
};

export const useMusicContext = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusicContext must be used within an MusicProvider");
  }
  return context;
};

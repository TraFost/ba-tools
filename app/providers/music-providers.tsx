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

import { songs } from "../data/dataMusic";

export interface Track {
  title: string;
  src: string;
  id: string;
  artist: string;
  image: string;
}

interface MusicContextType {
  audioRef: React.RefObject<HTMLAudioElement>;
  currentTrack: Track;
  setCurrentTrack: Dispatch<SetStateAction<Track | null>>;
  trackIndex: number;
  setTrackIndex: Dispatch<SetStateAction<number>>;
  playlist: Track[];
  setPlaylist: Dispatch<SetStateAction<Track[]>>;
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  currentTime: number;
  setCurrentTime: Dispatch<SetStateAction<number>>;
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
  const [playlist, setPlaylist] = useState<Track[]>(() => [...songs]);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(playlist[trackIndex]);
  const [volume, setVolume] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(true);

  const contextValue = {
    audioRef,
    playlist,
    setPlaylist,
    currentTrack,
    setCurrentTrack,
    trackIndex,
    setTrackIndex,
    volume,
    setVolume,
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
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

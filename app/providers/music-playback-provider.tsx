"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

interface MusicPlaybackContextType {
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
  currentTime: number;
  setCurrentTime: Dispatch<SetStateAction<number>>;
}

const MusicPlaybackContext = createContext<MusicPlaybackContextType | undefined>(undefined);

export const MusicPlaybackProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [volume, setVolume] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const contextValue = {
    volume,
    setVolume,
    currentTime,
    setCurrentTime,
  };

  return (
    <MusicPlaybackContext.Provider value={contextValue}>{children}</MusicPlaybackContext.Provider>
  );
};

export const useMusicPlaybackContext = (): MusicPlaybackContextType => {
  const context = useContext(MusicPlaybackContext);
  if (context === undefined) {
    throw new Error("useMusicContext must be used within an MusicPlaybackProvider");
  }
  return context;
};

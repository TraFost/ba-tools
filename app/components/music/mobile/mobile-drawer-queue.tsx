"use client";

import { useMusicContext } from "@/app/providers/music-providers";
import React from "react";
import QueueList from "../queue-list";

const MobileQueue = () => {
  const { queue } = useMusicContext();

  return (
    <div className="flex flex-col gap-2 overflow-y-auto">
      {queue.map((track, index) => (
        <QueueList
          key={`${track.id}-${index}`}
          title={track.title}
          artist={track.artist}
          music={track}
          index={index}
        />
      ))}
    </div>
  );
};

export default MobileQueue;

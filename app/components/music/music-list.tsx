"use client";

import { useRef, useState } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import TrackItem from "components/music/track-item";
import type { ITrack } from "@/app/type/music-type";
import { Input } from "components/ui/input";

interface Props {
  musicList: ITrack[];
}

const MusicList = ({ musicList }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState<string>("");
  const [filteredMusicList, setFilteredMusicList] = useState<ITrack[]>(musicList);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setFilteredMusicList(musicList);
      setSearch("");
      return;
    }

    setSearch(value);

    const filteredMusicList = musicList.filter(
      (music) =>
        music.title.toLowerCase().includes(value.toLowerCase()) ||
        music.artist.toLowerCase().includes(value.toLowerCase()),
    );

    setFilteredMusicList(filteredMusicList);
  };

  const virtualizer = useWindowVirtualizer({
    count: filteredMusicList.length,
    estimateSize: () => 72,
    overscan: 10,
  });

  return (
    <div ref={parentRef}>
      <Input
        type="search"
        placeholder="Search music..."
        value={search}
        onChange={handleSearch}
        className="w-96 max-w-full mb-4"
      />
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const music = filteredMusicList[virtualRow.index];

          return (
            <div
              key={music.src}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <TrackItem music={music} index={virtualRow.index} musicList={musicList} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MusicList;

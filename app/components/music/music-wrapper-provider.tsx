import type { FC } from "react";
import MusicWrapper from "components/music/music-wrapper";
import { getAlbums } from "@/app/lib/fetcher/get-album";
import { MusicProvider } from "@/app/providers/music-providers";
import { MusicPlaybackProvider } from "@/app/providers/music-playback-provider";

interface Props {
  children: React.ReactNode;
}

const MusicWrapperProvider: FC<Props> = async (props) => {
  const { children } = props;
  const albums = await getAlbums();

  return (
    <MusicProvider>
      <MusicPlaybackProvider>
        <MusicWrapper albums={albums}>{children}</MusicWrapper>
      </MusicPlaybackProvider>
    </MusicProvider>
  );
};

export default MusicWrapperProvider;

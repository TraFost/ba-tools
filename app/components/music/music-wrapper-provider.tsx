import MusicWrapper from "components/music/music-wrapper";
import type { FC } from "react";
import { getAlbums } from "@/app/lib/fetcher/get-album";

interface Props {
  children: React.ReactNode;
}

const MusicWrapperProvider: FC<Props> = async (props) => {
  const { children } = props;
  const albums = await getAlbums();

  return <MusicWrapper albums={albums}>{children}</MusicWrapper>;
};

export default MusicWrapperProvider;

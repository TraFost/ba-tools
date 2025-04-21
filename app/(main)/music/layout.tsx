import { MainLayout } from "components/layouts/main-layout";
import { BASE_URL } from "config/constants";
import { paths } from "config/paths";
import type { ReactNode } from "react";
import { MusicProvider } from "providers/music-providers";
import MusicWrapper from "components/music/music-wrapper";

export const metadata = {
  title: "Blue Archive Tools - Music Archive",
  description: "Tools for creating stickers using Blue Archive assets",
  keywords: ["Blue Archive", "Blue Archive tools", "Music Archive", "Blue Archive music"],
  openGraph: {
    type: "website",
    title: "Blue Archive Tools - Music Archive",
    description: "Tools for creating stickers using Blue Archive assets",
    url: `${BASE_URL}${paths.music.getHref()}`,
    images: [{ url: `${BASE_URL}/icon.png` }],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <MusicProvider>
      <MainLayout />
      <MusicWrapper>{children}</MusicWrapper>
    </MusicProvider>
  );
}

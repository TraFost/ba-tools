import { MainLayout } from "components/layouts/main-layout";
import { BASE_URL } from "config/constants";
import { paths } from "config/paths";
import type { ReactNode } from "react";
import MusicWrapperProvider from "components/music/music-wrapper-provider";
import { MusicIcon } from "lucide-react";

export const metadata = {
  title: "Blue Archive Tools - Music Archive",
  description: "Tools for listening to Blue Archive Soundtrack.",
  keywords: ["Blue Archive", "Blue Archive tools", "Music Archive", "Blue Archive music"],
  openGraph: {
    type: "website",
    title: "Blue Archive Tools - Music Archive",
    description: "Tools for listening to Blue Archive Soundtrack.",
    url: `${BASE_URL}${paths.music.getHref()}`,
    images: [{ url: `${BASE_URL}/ost.png` }],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <MainLayout titlePage="Music Archive" icon={<MusicIcon />} />
      <MusicWrapperProvider>{children}</MusicWrapperProvider>
    </>
  );
}

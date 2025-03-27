import AsideContent from "@/app/components/music/aside-content";
import { albums } from "@/app/data/dataMusic";
import { MainLayout } from "components/layouts/main-layout";
import { BASE_URL } from "config/constants";
import { paths } from "config/paths";
import { Disc3Icon, ListMusicIcon, MicVocalIcon, MusicIcon } from "lucide-react";
import type { ReactNode } from "react";

export const metadata = {
  title: "Blue Archive Tools - Sticker Maker",
  description: "Tools for creating stickers using Blue Archive assets",
  keywords: ["Blue Archive", "Blue Archive tools", "Sticker Maker"],
  openGraph: {
    type: "website",
    title: "Blue Archive Tools - Sticker Maker",
    description: "Tools for creating stickers using Blue Archive assets",
    url: `${BASE_URL}${paths.sticker.getHref()}`,
    images: [{ url: `${BASE_URL}/icon.png` }],
  },
};

const asideList = {
  discover: [
    {
      icon: <Disc3Icon size={20} />,
      text: "Music Archive",
    },
  ],
  library: [
    {
      icon: <MusicIcon size={20} />,
      text: "Songs",
    },
    {
      icon: <MicVocalIcon size={20} />,
      text: "Artists",
    },
  ],
};

interface IAsideContent {
  text: string;
  icon: ReactNode;
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <MainLayout />
      <div className="flex min-h-full">
        <aside className="bg-secondary text-secondary-foreground rounded-xl font-bold w-1/4 sticky top-7 mt-7 left-7 h-[calc(100vh-124px)] p-6 flex flex-col gap-4 overflow-y-auto">
          {Object.keys(asideList).map((val) => (
            <div key={val} className="flex flex-col gap-1">
              <h2 key={val} className="capitalize">
                {val}
              </h2>
              <div className="flex flex-col gap-0.5">
                {asideList[val].map((list: IAsideContent) => (
                  <AsideContent href="/music" text={list.text} key={list.text}>
                    {list.icon}
                  </AsideContent>
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-1">
            <h2 className="capitalize">Playlist</h2>
            <div className="flex flex-col gap-0.5">
              {Object.entries(albums).map(([title, album]) => (
                <AsideContent
                  href={`/music/${title}`}
                  text={title.replaceAll("-", " ")}
                  key={title}
                >
                  <ListMusicIcon />
                </AsideContent>
              ))}
            </div>
          </div>
        </aside>
        <main className="ml-7 px-4 py-7 w-full">{children}</main>
      </div>
    </div>
  );
}

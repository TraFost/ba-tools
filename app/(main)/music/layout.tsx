import AsideContent from "components/music/aside-content";
import { albums } from "@/app/data/dataMusic";
import { MainLayout } from "components/layouts/main-layout";
import { BASE_URL } from "config/constants";
import { paths } from "config/paths";
import {
  Disc3Icon,
  HomeIcon,
  LibraryIcon,
  ListMusicIcon,
  MicVocalIcon,
  MusicIcon,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";
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
      {/* Desktop */}
      <div className="text-secondary-foreground hidden lg:block">
        <div className="flex gap-4 min-h-full mt-7">
          <aside className="bg-secondary text-secondary-foreground rounded-xl font-bold w-1/4 min-w-[272px] h-[calc(100vh-200px)] sticky top-7 left-7 p-6 flex flex-col gap-4 overflow-y-auto">
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
          <main className="mx-7 px-4 pt-7 mb-28 rounded-xl">{children}</main>
        </div>
        <div className="flex justify-between px-8 pt-2 border-t-2 border-accent-foreground bg-white z-20 fixed bottom-0 w-full h-[80px]">
          <div className="mx-4">
            <p className="font-bold text-xl">Title</p>
            <p className="text-accent-foreground font-semibold">Composer</p>
          </div>
          <div>Player Control</div>
          <div>
            <p>Volume Control</p>
          </div>
        </div>
        <div className="bg-white fixed bottom-0 w-full h-[100px] z-10" />
      </div>

      {/* Mobile */}
      <div className="text-secondary-foreground lg:hidden">
        <main className="mx-6 mt-6 pb-20">{children}</main>
        <div className="grid grid-cols-4 justify-items-center items-center p-2 border-t-2 border-accent-foreground bg-white z-20 fixed bottom-0 w-full h-[84px]">
          <Link
            href={"/music"}
            className="flex flex-col items-center justify-center hover:bg-primary/50 px-4 py-2 w-full rounded-lg"
          >
            <HomeIcon />
            <p className="font-bold text-lg">Home</p>
          </Link>
          <Link
            href={"/music"}
            className="flex flex-col items-center justify-center hover:bg-primary/50 px-4 py-2 w-full rounded-lg"
          >
            <SearchIcon />
            <p className="font-bold text-lg">Search</p>
          </Link>
          <Link
            href={"/music"}
            className="flex flex-col items-center justify-center hover:bg-primary/50 px-4 py-2 w-full rounded-lg"
          >
            <LibraryIcon />
            <p className="font-bold text-lg">Library</p>
          </Link>
          <Link
            href={"/music"}
            className="flex flex-col items-center justify-center hover:bg-primary/50 px-4 py-2 w-full rounded-lg"
          >
            <ListMusicIcon />
            <p className="font-bold text-lg">Queue</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

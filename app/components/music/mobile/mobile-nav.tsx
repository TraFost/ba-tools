import { Link } from "components/ui/link";
import { DrawerClose } from "components/ui/drawer";
import NavDrawer from "components/music/nav-drawer";
import {
  Disc3Icon,
  HomeIcon,
  LibraryIcon,
  ListMusicIcon,
  MicVocalIcon,
  MusicIcon,
  SearchIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import AsideContent from "components/music/aside-content";
import { albums } from "@/app/data/dataMusic";
import MobileQueue from "./mobile-drawer-queue";

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

const MobileNav = () => {
  return (
    <div className="grid grid-cols-4 justify-items-center items-center p-2 border-t border-accent-foreground bg-white z-20 fixed bottom-0 w-full h-[84px]">
      <Link
        href={"/music"}
        className="flex flex-col items-center justify-center hover:bg-primary/50 px-4 py-2 w-full rounded-lg"
      >
        <HomeIcon />
        <p className="font-bold text-lg">Home</p>
      </Link>
      <NavDrawer
        trigger={
          <button
            className="flex flex-col items-center justify-center hover:bg-primary/50 px-4 py-2 w-full rounded-lg"
            type="button"
          >
            <SearchIcon />
            <p className="font-bold text-lg">Search</p>
          </button>
        }
        title="Search"
      >
        <div>
          <p>Search</p>
        </div>
      </NavDrawer>
      <NavDrawer
        trigger={
          <button
            className="flex flex-col items-center justify-center hover:bg-primary/50 px-4 py-2 w-full rounded-lg"
            type="button"
          >
            <LibraryIcon />
            <p className="font-bold text-lg">Library</p>
          </button>
        }
        title="Library"
      >
        <div className="flex flex-col gap-2">
          {Object.keys(asideList).map((val) => (
            <div key={val} className="flex flex-col gap-1 font-bold">
              <h2 key={val} className="capitalize">
                {val}
              </h2>
              <div className="flex flex-col gap-0.5">
                {asideList[val].map((list: IAsideContent) => (
                  <DrawerClose asChild key={list.text}>
                    <AsideContent href="/music" text={list.text}>
                      {list.icon}
                    </AsideContent>
                  </DrawerClose>
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-1 font-bold">
            <h2 className="capitalize">Playlist</h2>
            <div className="flex flex-col gap-0.5">
              {Object.entries(albums).map(([title, album]) => (
                <DrawerClose asChild key={title}>
                  <AsideContent href={`/music/${title}`} text={title.replaceAll("-", " ")}>
                    <ListMusicIcon />
                  </AsideContent>
                </DrawerClose>
              ))}
            </div>
          </div>
        </div>
      </NavDrawer>
      <NavDrawer
        trigger={
          <button
            className="flex flex-col items-center justify-center hover:bg-primary/50 px-4 py-2 w-full rounded-lg"
            type="button"
          >
            <ListMusicIcon />
            <p className="font-bold text-lg">Queue</p>
          </button>
        }
        title="Queue"
      >
        <MobileQueue />
      </NavDrawer>
    </div>
  );
};

export default MobileNav;

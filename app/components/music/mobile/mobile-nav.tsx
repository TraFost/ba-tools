import type { FC } from "react";
import { HomeIcon, LibraryIcon, ListMusicIcon } from "lucide-react";
import { Link } from "components/ui/link";
import NavDrawer from "components/music/nav-drawer";
import AsideContent from "components/music/aside-content";
import MobileQueue from "components/music/mobile/mobile-drawer-queue";
import type { IAlbum } from "@/app/type/music-type";

interface Props {
  albums: IAlbum[];
}

const MobileNav: FC<Props> = (props) => {
  const { albums } = props;

  return (
    <div className="grid grid-cols-3 justify-items-center items-center p-2 border-t border-accent-foreground bg-white z-20 fixed bottom-0 w-full h-[84px]">
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
            <LibraryIcon />
            <p className="font-bold text-lg">Library</p>
          </button>
        }
        title="Library"
      >
        <AsideContent albums={albums} />
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

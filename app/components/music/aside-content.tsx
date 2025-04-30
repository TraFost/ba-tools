import type { FC, ReactNode } from "react";
import { Link } from "components/ui/link";
import { Disc3Icon, MicVocalIcon, MusicIcon, UsersIcon } from "lucide-react";
import type { IAlbum } from "@/app/type/music-type";

interface Props {
  albums: IAlbum[];
}

interface IAsideContent {
  text: string;
  icon: ReactNode;
  href: string;
}

const asideList = {
  discover: [
    {
      icon: <Disc3Icon size={20} />,
      text: "Music Archive",
      href: "/music",
    },
  ],
  library: [
    {
      icon: <MusicIcon size={20} />,
      text: "Musics",
      href: "/music/soundtrack",
    },
    {
      icon: <MicVocalIcon size={20} />,
      text: "Artists",
      href: "/music/artists",
    },
    {
      icon: <UsersIcon size={20} />,
      text: "Students",
      href: "/music/students",
    },
  ],
};

const AsideContent: FC<Props> = (props) => {
  const { albums } = props;

  return (
    <div className="text-secondary-foreground font-bold">
      {Object.keys(asideList).map((val) => (
        <div key={val} className="flex flex-col gap-1">
          <h2 key={val} className="capitalize">
            {val}
          </h2>
          <div className="flex flex-col gap-0.5">
            {asideList[val].map((list: IAsideContent) => (
              <Link
                key={list.text}
                href={`${list.href}`}
                className="hover:bg-white/50 px-4 py-2 cursor-pointer rounded-lg transition-colors ease-in-out duration-200 flex gap-2 items-center"
              >
                {list.icon}
                <span className="capitalize line-clamp-1">{list.text}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-1">
        <h2 className="capitalize">Playlist</h2>
        <div className="flex flex-col gap-0.5">
          {albums.map((album) => (
            <Link
              key={album.id}
              href={`/music/${album.path}`}
              className="hover:bg-white/50 px-4 py-2 cursor-pointer rounded-lg transition-colors ease-in-out duration-200 flex gap-2 items-center"
            >
              <span className="shrink-0">
                <img
                  src={
                    album.image
                      ? `https://jyxwxdxjdshypymisxeo.supabase.co/storage/v1/object/public/music/images/${album.image}`
                      : "/icon.png"
                  }
                  alt={album.title}
                  className="w-8 h-8 rounded-md object-cover"
                />
              </span>
              <span className="capitalize line-clamp-1">{album.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AsideContent;

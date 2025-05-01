import { useMusicContext } from "providers/music-providers";
import { DownloadIcon, EllipsisIcon, Trash2Icon, UserRoundIcon } from "lucide-react";
import type { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu";
import type { ITrack } from "@/app/type/music-type";
import { Link } from "components/ui/link";
import { artistName } from "@/app/config/music";
import { playTrack } from "@/app/lib/music/playTrack";

interface Props {
  title: string;
  artist: string;
  music: ITrack;
  index: number;
}

const QueueItem: FC<Props> = (props) => {
  const { title, artist, music, index } = props;
  const context = useMusicContext();

  const { queue, setQueue, currentTrack } = context;

  const artists = music.artist.split(", ");

  const handleRemove = () => {
    setQueue((prev) => prev.filter((track) => track.title !== title));
  };

  return (
    <button
      type="button"
      onClick={() => playTrack(context, music, index)}
      className={`flex items-center justify-between gap-4 w-full cursor-pointer hover:bg-primary/25 rounded-xl p-4 text-left ${currentTrack.title === title ? "bg-primary/25" : ""}`}
    >
      <div>
        <p className="font-bold text-lg line-clamp-1">{title}</p>
        <p className="font-semibold line-clamp-1">{artist}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <p className="text-sm font-semibold text-accent-foreground line-clamp-1">{music.id}</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="hover:bg-black/10 rounded-full p-1.5">
              <EllipsisIcon />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="font-semibold text-accent bg-white rounded-lg shadow-lg p-4">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                if (queue.length === 1) return;
                handleRemove();
              }}
            >
              <Trash2Icon />
              <span>Remove from queue</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
              <DownloadIcon />
              <span>Download music</span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild onClick={(e) => e.stopPropagation()}>
              <Link
                href={`/music/${artistName.includes(artists[0].toLowerCase()) ? artists[0].toLowerCase().replaceAll(" ", "-") : "soundtrack"}`}
              >
                <UserRoundIcon />
                <span>Go to composer</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </button>
  );
};

export default QueueItem;

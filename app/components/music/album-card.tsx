import { PlayIcon } from "lucide-react";
import type { FC } from "react";
import { Link } from "components/ui/link";
import AlbumImage from "components/music/album-image";

interface Props {
  image: string;
  title: string;
  href: string;
}

const AlbumCard: FC<Props> = (props) => {
  const { image, title, href } = props;

  return (
    <Link
      href={`/music/${href}`}
      className="flex flex-col gap-2 hover:bg-primary/50 rounded-xl p-2 group transition-colors duration-200"
    >
      <AlbumImage src={image} alt={title} width={256} height={256}>
        <div className="absolute bottom-3 right-3 w-10 aspect-square bg-primary text-primary-foreground rounded-full p-2 flex items-center justify-center opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 hover:scale-125">
          <PlayIcon fill="#33445c" size={20} />
        </div>
      </AlbumImage>
      <div className="px-2 pb-2">
        <p className="font-bold capitalize">{title}</p>
      </div>
    </Link>
  );
};

export default AlbumCard;

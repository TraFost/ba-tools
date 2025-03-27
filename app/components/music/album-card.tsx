import { PlayIcon } from "lucide-react";
import Image from "next/image";
import React, { type FC } from "react";
import { Link } from "../ui/link";

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
      className="w-52 flex flex-col gap-2 hover:bg-black/10 rounded-xl p-2 group transition-colors ease-in-out duration-200"
    >
      <picture className="overflow-hidden rounded-lg relative">
        <Image
          src={image}
          alt="album"
          width={256}
          height={256}
          className="aspect-square object-cover object-center group-hover:scale-110 ease-in-out duration-200"
        />
        <div className="absolute bottom-3 right-3 w-10 aspect-square bg-primary text-primary-foreground rounded-full p-2 flex items-center justify-center opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
          <PlayIcon fill="#33445c" size={20} />
        </div>
      </picture>
      <div className="px-2 pb-2">
        <p className="font-bold text-accent capitalize">{title}</p>
      </div>
    </Link>
  );
};

export default AlbumCard;

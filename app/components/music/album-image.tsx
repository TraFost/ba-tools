import Image from "next/image";
import type { FC, ReactNode } from "react";

interface Props {
  src: string;
  alt: string;
  children: ReactNode;
  width: number;
  height: number;
}

const AlbumImage: FC<Props> = (props) => {
  const { src, alt, children, width, height } = props;

  return (
    <picture className="overflow-hidden rounded-lg relative">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="aspect-square object-cover object-center group-hover:scale-110 ease-in-out duration-200"
      />
      {children}
    </picture>
  );
};

export default AlbumImage;

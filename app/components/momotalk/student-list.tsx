import Image from "next/image";
import type { FC } from "react";

interface Props {
  icon: string;
  name: string;
  description: string;
}

const StudentList: FC<Props> = (props) => {
  const { icon, name, description } = props;

  return (
    <div className="flex items-center gap-4 border-b-[1px] border-accent-foreground px-4 py-2">
      <div className="w-[55px] h-[55px] shrink-0">
        <Image
          src={icon}
          alt={name}
          width={55}
          height={55}
          className="object-cover size-full rounded-full"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-accent font-bold text-lg">{name}</p>
        <p className="text-accent-foreground line-clamp-1 font-medium">{description}</p>
      </div>
    </div>
  );
};

export default StudentList;

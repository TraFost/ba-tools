import Image from "next/image";
import type { FC } from "react";

interface Props {
  icon?: string;
  name?: string;
  text: string;
  role: "student" | "sensei";
  isPrevious: boolean;
}

const ChatBubble: FC<Props> = (props) => {
  const { icon, name, text, role, isPrevious } = props;

  return (
    <div
      className={`flex items-center gap-4 px-4 ${role === "sensei" ? "justify-end" : ""} ${!isPrevious ? "mt-2" : ""}`}
    >
      {role !== "sensei" && !isPrevious ? (
        <div className="w-[55px] h-[55px] shrink-0 self-start mt-2">
          <Image
            src={icon}
            alt={name}
            width={55}
            height={55}
            className="object-cover size-full rounded-full"
          />
        </div>
      ) : (
        <div className="w-[55px]" />
      )}
      <div className="flex flex-col">
        {!isPrevious && <p className="text-black font-semibold text-lg">{name}</p>}
        <p
          className={`text-white ${role === "sensei" ? "bg-[#508DC8]" : "bg-accent"} py-0.5 px-2 rounded-lg font-medium text-lg min-w-fit max-w-96`}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default ChatBubble;

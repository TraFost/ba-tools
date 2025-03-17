import { Input } from "components/ui/input";
import Image from "next/image";
import SendButton from "public/Send Button.svg";

const ChatInput = () => {
  return (
    <div className="border-t border-momo bg-white sticky bottom-0 w-full rounded-ee-xl py-2.5 px-8 flex gap-4 justify-center items-center">
      <div className="w-[48px] h-[48px] shrink-0">
        <Image
          src={"/Haruna.png"}
          alt={"Haruna"}
          width={48}
          height={48}
          className="object-cover size-full rounded-full"
        />
      </div>
      <Input className="px-4 py-2 rounded-xl" placeholder="text..." />
      <Image src={SendButton} alt="Send Button" width={25} height={25} className="shrink-0" />
    </div>
  );
};

export default ChatInput;

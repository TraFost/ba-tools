import StickerWrapper from "components/sticker/sticker-wrapper";
import { Link } from "components/ui/link";
import { HomeIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sticker Maker | Blue Archive Tools",
  icons: "/icon.png",
  description: "Sticker maker for Blue Archive",
  keywords: ["Blue Archive", "Blue Archive tools", "sticker maker", "Blue Archive sticker maker"],
  openGraph: {
    type: "website",
    title: "Sticker Maker | Blue Archive Tools",
    description: "Sticker maker for Blue Archive",
    url: "https://ba-tools-plum.vercel.app/sticker",
    images: [
      {
        url: "https://ba-tools-plum.vercel.app/icon.png",
      },
    ],
  },
};

const StickerPage = () => {
  return (
    <div>
      <nav className="flex justify-between items-center bg-accent py-2 px-4 lg:px-8">
        <p className="text-2xl font-bold text-secondary">Sticker Maker</p>
        <Link
          href={"/"}
          className="text-accent bg-primary p-2 rounded-lg hover:outline-2 outline-primary outline-offset-[3px]"
        >
          <HomeIcon size={28} />
        </Link>
      </nav>
      <StickerWrapper />
    </div>
  );
};

export default StickerPage;

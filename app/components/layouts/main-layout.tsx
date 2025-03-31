"use client";

import MaintainerInfo from "components/maintainer-info";
import { Link } from "components/ui/link";
import { HomeIcon, StickerIcon } from "lucide-react";

export const MainLayout = () => (
  <nav className="relative overflow-hidden bg-accent py-3 px-4 lg:px-8 shadow-md">
    <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-primary/10 blur-xl" />
    <div className="absolute top-1/2 -right-8 w-16 h-16 rounded-full bg-primary/5 blur-lg" />

    <div className="flex justify-between items-center relative z-10">
      <div className="flex items-center gap-2">
        <div className="bg-primary text-accent p-2 rounded-lg rotate-6 shadow-sm">
          <StickerIcon size={24} />
        </div>
        <div>
          <p className="text-2xl font-bold text-secondary flex items-center">Blue Archive Tools</p>
          <p className="text-xs text-secondary/70 -mt-1">Sticker Maker</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <MaintainerInfo triggerClassName="text-secondary hover:bg-primary/20" />
        <Link
          href="/"
          className="text-accent bg-primary p-2 rounded-lg hover:bg-primary/90 hover:shadow-lg transition-all duration-200 flex items-center gap-2"
        >
          <HomeIcon size={20} />
        </Link>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
  </nav>
);

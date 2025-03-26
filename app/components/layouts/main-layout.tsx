"use client";

import { Link } from "components/ui/link";
import { HomeIcon } from "lucide-react";

export const MainLayout = () => (
  <nav className="flex justify-between items-center bg-accent py-2 px-4 lg:px-8">
    <p className="text-2xl font-bold text-secondary">Sticker Maker</p>
    <Link
      href="/"
      className="text-accent bg-primary p-2 rounded-lg hover:outline-2 outline-primary outline-offset-[3px]"
    >
      <HomeIcon size={28} />
    </Link>
  </nav>
);

import { MainLayout } from "components/layouts/main-layout";
import { BASE_URL } from "config/constants";
import { paths } from "config/paths";
import { Balsamiq_Sans } from "next/font/google";
import type { ReactNode } from "react";

export const metadata = {
  title: "Blue Archive Tools - Sticker Maker",
  description: "Tools for creating stickers using Blue Archive assets",
  keywords: ["Blue Archive", "Blue Archive tools", "Sticker Maker"],
  openGraph: {
    type: "website",
    title: "Blue Archive Tools - Sticker Maker",
    description: "Tools for creating stickers using Blue Archive assets",
    url: `${BASE_URL}${paths.sticker.getHref()}`,
    images: [{ url: `${BASE_URL}/icon.png` }],
  },
};

const balsamiq_sans = Balsamiq_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <MainLayout />

      {children}
    </>
  );
}

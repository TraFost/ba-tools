import { CommonProviders } from "providers/common-providers";

import "./styles/globals.css";
import { Balsamiq_Sans, Open_Sans } from "next/font/google";
import type { Metadata } from "next";

const open_sans = Open_Sans({
  subsets: ["latin"],
});

const balsamiq_sans = Balsamiq_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Blue Archive Tools",
  icons: "/icon.png",
  description: "Tools for Blue Archive",
  keywords: ["Blue Archive", "Blue Archive tools"],
  openGraph: {
    type: "website",
    title: "Blue Archive Tools",
    description: "Tools for Blue Archive",
    url: "https://ba-tools-plum.vercel.app/",
    images: [
      {
        url: "https://ba-tools-plum.vercel.app/icon.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CommonProviders />
        <main className={`min-h-full h-dvh min-w-full ${open_sans.className}`}>{children}</main>
      </body>
    </html>
  );
}

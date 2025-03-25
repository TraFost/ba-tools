import { BASE_URL } from "config/constants";
import { cn } from "lib/utils";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { CommonProviders } from "providers/common-providers";

import "./styles/globals.css";

const open_sans = Open_Sans({
  subsets: ["latin"],
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
    url: BASE_URL,
    images: [{ url: `${BASE_URL}/icon.png` }],
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
        <main className={cn`min-h-full h-dvh min-w-full ${open_sans.className}`}>{children}</main>
      </body>
    </html>
  );
}

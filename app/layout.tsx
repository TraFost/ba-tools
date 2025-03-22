import { CommonProviders } from "providers/common-providers";

import "./styles/globals.css";
import { Balsamiq_Sans, Open_Sans } from "next/font/google";

const open_sans = Open_Sans({
  subsets: ["latin"],
});

const balsamiq_sans = Balsamiq_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

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

import { CommonProviders } from "providers/common-providers";

import "./styles/globals.css";
import { Open_Sans } from "next/font/google";

const open_sans = Open_Sans({
  subsets: ["latin"],
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

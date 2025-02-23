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
        <main
          className={`min-h-full h-dvh min-w-full ${open_sans.className} bg-cover bg-center bg-[url(/hexa_back_01.png)]`}
        >
          {children}
        </main>
      </body>
    </html>
  );
}

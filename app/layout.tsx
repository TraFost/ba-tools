import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex items-center justify-center min-h-full h-dvh">{children}</main>
      </body>
    </html>
  );
}

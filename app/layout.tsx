import "./styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-full h-dvh min-w-full">{children}</main>
      </body>
    </html>
  );
}

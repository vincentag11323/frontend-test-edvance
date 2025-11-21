import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cinema App",
  description: "Discover our movies!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

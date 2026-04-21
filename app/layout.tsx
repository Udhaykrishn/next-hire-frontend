import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Next Hire | Elite Fintech & Crypto Careers",
  description:
    "Experience the future of hiring. Kraken-inspired precision meeting global fintech recruitment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body>
        {children}
      </body>
    </html>
  );
}

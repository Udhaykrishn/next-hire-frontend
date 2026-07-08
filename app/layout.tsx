import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

// Editorial slab-serif display face (DESIGN.md). Self-hosted at build time by
// next/font, so it needs no external host and no CSP allowance.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next Hire | AI-Powered Career Ecosystem",
  description:
    "The intelligent platform for job seekers and recruiters. AI-driven screening, automated workflows, and career growth management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-canvas text-ink">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

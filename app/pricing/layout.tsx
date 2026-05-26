import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | NextHire",
  description: "NextHire Pricing Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

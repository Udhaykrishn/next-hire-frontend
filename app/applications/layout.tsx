import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applications | NextHire",
  description: "NextHire Applications Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

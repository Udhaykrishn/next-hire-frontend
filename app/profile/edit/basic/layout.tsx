import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Edit Basic | NextHire",
  description: "NextHire Profile Edit Basic Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

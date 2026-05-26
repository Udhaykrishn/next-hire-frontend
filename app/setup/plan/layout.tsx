import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setup Plan | NextHire",
  description: "NextHire Setup Plan Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

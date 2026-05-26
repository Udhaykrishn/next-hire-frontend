import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs Status | NextHire",
  description: "NextHire Jobs Status Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

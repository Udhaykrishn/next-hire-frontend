import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruiter Setup Plan | NextHire",
  description: "NextHire Recruiter Setup Plan Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

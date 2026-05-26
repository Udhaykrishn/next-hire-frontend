import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruiter Profile | NextHire",
  description: "NextHire Recruiter Profile Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruiter Plan | NextHire",
  description: "NextHire Recruiter Plan Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruiter Jobs | NextHire",
  description: "NextHire Recruiter Jobs Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

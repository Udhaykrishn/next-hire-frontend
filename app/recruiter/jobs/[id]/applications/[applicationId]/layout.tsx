import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruiter Jobs Applications | NextHire",
  description: "NextHire Recruiter Jobs Applications Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

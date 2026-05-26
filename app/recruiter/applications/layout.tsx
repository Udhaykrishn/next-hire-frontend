import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruiter Applications | NextHire",
  description: "NextHire Recruiter Applications Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

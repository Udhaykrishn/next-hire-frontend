import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | NextHire",
  description: "NextHire Contact Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

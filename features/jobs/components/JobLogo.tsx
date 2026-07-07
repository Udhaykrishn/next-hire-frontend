"use client";

import { useState } from "react";
import Image from "next/image";

interface JobLogoProps {
  logoUrl?: string | null;
  companyName: string;
  fallbackClassName?: string;
}

export function JobLogo({
  logoUrl,
  companyName,
  fallbackClassName,
}: JobLogoProps) {
  const [error, setError] = useState(false);

  if (!logoUrl || error) {
    return (
      <span
        className={
          fallbackClassName ||
          "text-xl font-black text-gray-400 group-hover:text-wise-green transition-colors"
        }
      >
        {companyName?.[0] || "J"}
      </span>
    );
  }

  return (
    <Image
      unoptimized
      src={logoUrl}
      alt={companyName}
      fill
      className="object-cover"
      onError={() => setError(true)}
    />
  );
}

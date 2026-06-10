"use client";

import { Building, Check, ChevronDown, Plus, Settings } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCompany } from "@/context/company-context";
import { cn } from "@/lib/utils";

export const CompanySwitcher = () => {
  const { activeCompany, companies, setActiveCompany } = useCompany();
  const router = useRouter();

  if (companies.length === 0) {
    return null; // or empty state
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 py-1.5 px-3 rounded-lg border border-gray-100 bg-gray-50/30 hover:bg-gray-100/50 transition-colors focus:outline-none">
        <div className="w-6 h-6 relative rounded-md bg-near-black flex items-center justify-center text-white overflow-hidden">
          {activeCompany?.logo_url ? (
            <Image
              unoptimized
              src={activeCompany.logo_url}
              alt={activeCompany.name}
              fill
              className="object-cover"
            />
          ) : (
            <Building className="w-3.5 h-3.5" />
          )}
        </div>
        <span className="text-[13px] font-bold text-near-black truncate max-w-[120px]">
          {activeCompany?.name || "Select Company"}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {companies.map((company) => (
          <DropdownMenuItem
            key={company._id}
            onClick={() => setActiveCompany(company)}
            className="flex items-center justify-between cursor-pointer py-2"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 relative rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                {company.logo_url ? (
                  <Image
                    unoptimized
                    src={company.logo_url}
                    alt={company.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Building className="w-3 h-3 text-gray-500" />
                )}
              </div>
              <span
                className={cn(
                  "text-[13px] font-medium",
                  activeCompany?._id === company._id
                    ? "text-near-black font-bold"
                    : "text-gray-600",
                )}
              >
                {company.name}
              </span>
            </div>
            {activeCompany?._id === company._id && (
              <Check className="w-4 h-4 text-wise-green" />
            )}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => router.push("/recruiter/companies/create")}
          className="flex items-center gap-2 cursor-pointer py-2 text-wise-green hover:bg-wise-green/10 focus:bg-wise-green/10"
        >
          <div className="w-5 h-5 rounded flex items-center justify-center bg-wise-green/10">
            <Plus className="w-3.5 h-3.5" />
          </div>
          <span className="text-[13px] font-bold">Add New Company</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/recruiter/companies")}
          className="flex items-center gap-2 cursor-pointer py-2"
        >
          <div className="w-5 h-5 rounded flex items-center justify-center bg-gray-100">
            <Settings className="w-3.5 h-3.5 text-gray-500" />
          </div>
          <span className="text-[13px] font-bold text-near-black">
            Manage Companies
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

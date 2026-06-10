"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Company } from "@/features/company/types/company.types";

interface CompanyContextType {
  activeCompany: Company | null;
  setActiveCompany: (company: Company) => void;
  companies: Company[];
  setCompanies: (companies: Company[]) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
  const [activeCompany, setActiveCompanyState] = useState<Company | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);

  // Sync active company to localStorage
  useEffect(() => {
    const storedCompanyId = localStorage.getItem("activeCompanyId");
    if (companies.length > 0) {
      let found = null;
      if (storedCompanyId) {
        found = companies.find((c) => c._id === storedCompanyId);
      }
      if (found) {
        setActiveCompanyState(found);
      } else {
        setActiveCompanyState(companies[0]);
        localStorage.setItem("activeCompanyId", companies[0]._id);
      }
    }
  }, [companies]);

  const setActiveCompany = (company: Company) => {
    setActiveCompanyState(company);
    localStorage.setItem("activeCompanyId", company._id);
  };

  return (
    <CompanyContext.Provider
      value={{ activeCompany, setActiveCompany, companies, setCompanies }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
};

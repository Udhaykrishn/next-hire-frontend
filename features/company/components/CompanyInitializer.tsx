"use client";

import { useEffect } from "react";
import { useCompanyQuery } from "../hooks/useCompanyQuery";
import { useCompany } from "../../../context/company-context";
import { useAuthContext } from "@/features/auth/context/auth-context";

export const CompanyInitializer = () => {
  const { isAuthenticated } = useAuthContext();
  // Only fetch if authenticated
  const { data, isLoading } = useCompanyQuery();
  const { setCompanies } = useCompany();

  useEffect(() => {
    if (data?.data) {
      setCompanies(data.data);
    }
  }, [data, setCompanies]);

  return null;
};

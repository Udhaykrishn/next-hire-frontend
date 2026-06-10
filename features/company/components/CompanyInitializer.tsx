"use client";

import { useEffect } from "react";
import { useCompany } from "../../../context/company-context";
import { useCompanyQuery } from "../hooks/useCompanyQuery";

export const CompanyInitializer = () => {
  // Only fetch if authenticated
  const { data } = useCompanyQuery();
  const { setCompanies } = useCompany();

  useEffect(() => {
    if (data?.data) {
      setCompanies(data.data);
    }
  }, [data, setCompanies]);

  return null;
};

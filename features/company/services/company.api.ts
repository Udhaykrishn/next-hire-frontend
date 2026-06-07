import { api } from "@/lib/api";
import { Company, CreateCompanyDto } from "../types/company.types";

export const getCompanies = async (): Promise<{ data: Company[] }> => {
  const response = await api.get("/recruiter/company");
  return response.data;
};

export const createCompany = async (
  dto: CreateCompanyDto,
): Promise<{ data: Company }> => {
  const response = await api.post("/recruiter/company", dto);
  return response.data;
};

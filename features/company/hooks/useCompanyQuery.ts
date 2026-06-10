import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createCompany, getCompanies } from "../services/company.api";
import type { CreateCompanyDto } from "../types/company.types";

export const useCompanyQuery = () => {
  return useSuspenseQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });
};

export const useCompanyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateCompanyDto) => createCompany(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
};

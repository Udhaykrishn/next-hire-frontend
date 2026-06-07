import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { getCompanies, createCompany } from "../services/company.api";
import { CreateCompanyDto } from "../types/company.types";

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

import { useQuery } from "@tanstack/react-query";
import { getAdminForms } from "../services/forms.api";

export const useAdminForms = () => {
  const { data: forms = [], isLoading } = useQuery({
    queryKey: ["admin-forms"],
    queryFn: getAdminForms,
  });

  return { forms, isLoading };
};

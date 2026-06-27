import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getFormByKey, updateForm } from "../services/forms.api";
import type { FormField } from "../types/form.types";

export const useFormBuilder = (formKey: string) => {
  const queryClient = useQueryClient();

  const {
    data: config,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["form-config", formKey],
    queryFn: () => getFormByKey(formKey),
    enabled: Boolean(formKey),
  });

  const saveMutation = useMutation({
    mutationFn: (fields: FormField[]) => updateForm(formKey, fields),
    onSuccess: (updated) => {
      queryClient.setQueryData(["form-config", formKey], updated);
      queryClient.invalidateQueries({ queryKey: ["admin-forms"] });
      toast.success("Form saved");
    },
    onError: () => {
      toast.error("Couldn't save the form. Please try again.");
    },
  });

  return {
    config,
    isLoading,
    isError,
    save: saveMutation.mutate,
    isSaving: saveMutation.isPending,
  };
};

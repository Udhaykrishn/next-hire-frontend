import { useQuery } from "@tanstack/react-query";
import { getFormByKey } from "../services/forms.api";
import type { FormField } from "../types/form.types";

/**
 * Read a form's config for a LIVE form. Returns the enabled fields in order.
 * Failures resolve to `null` so callers can fall back to their hardcoded form.
 */
export const useFormConfig = (formKey: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["form-config", formKey],
    queryFn: () => getFormByKey(formKey),
    enabled: Boolean(formKey),
    retry: 1,
  });

  const fields: FormField[] | null = data
    ? [...data.fields]
        .filter((field) => field.enabled)
        .sort((a, b) => a.order - b.order)
    : null;

  return { fields, isLoading };
};

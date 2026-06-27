import { apiClient } from "@/lib/api-client";
import type { FormConfig, FormField } from "../types/form.types";

/** Admin: list every configurable form. */
export const getAdminForms = async (): Promise<FormConfig[]> => {
  const response = await apiClient.get<FormConfig[]>("/forms");
  return response.data;
};

/** Public: read a single form's config (used by the admin builder and live forms). */
export const getFormByKey = async (key: string): Promise<FormConfig> => {
  const response = await apiClient.get<FormConfig>(`/forms/${key}`);
  return response.data;
};

/** Admin: replace a form's field list. */
export const updateForm = async (
  key: string,
  fields: FormField[],
): Promise<FormConfig> => {
  const response = await apiClient.put<FormConfig>(`/forms/${key}`, { fields });
  return response.data;
};

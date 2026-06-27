export type FormFieldType =
  | "text"
  | "email"
  | "tel"
  | "url"
  | "password"
  | "textarea"
  | "select"
  | "number"
  | "date";

export type FormAudience = "candidate" | "recruiter" | "auth";

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormField {
  key: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required: boolean;
  enabled: boolean;
  /** System field — admin may relabel/reorder but not disable, retype, or delete. */
  locked: boolean;
  /** Admin-added field. */
  custom: boolean;
  order: number;
  options?: FormFieldOption[];
  /** Minimum character length (optional rule). */
  minLength?: number;
  /** Regex source the value must match (optional rule). */
  pattern?: string;
  /** Custom message shown for any failed rule on this field. */
  errorMessage?: string;
}

export interface FormConfig {
  id?: string;
  formKey: string;
  name: string;
  audience: FormAudience;
  fields: FormField[];
  createdAt?: string;
  updatedAt?: string;
}

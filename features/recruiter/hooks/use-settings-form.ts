import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuthContext } from "@/features/auth/context/auth-context";
import {
  type ChangePasswordValues,
  changePasswordSchema,
} from "../schemas/settings.schema";
import { useRecruiterChangePasswordMutation } from "./use-recruiter-query";

export function useSettingsForm() {
  const { user, logout } = useAuthContext();
  const changePasswordMutation = useRecruiterChangePasswordMutation();

  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = (data: ChangePasswordValues) => {
    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }

    changePasswordMutation.mutate(
      { id: user.id, data },
      {
        onSuccess: () => {
          toast.success("Password changed successfully");
          form.reset();
        },
        onError: (error: unknown) => {
          let errorMessage = "Failed to change password";
          if (error instanceof Error) {
            errorMessage = error.message;
          } else if (typeof error === "object" && error !== null) {
            const errObj = error as Record<string, unknown>;
            if (
              errObj.response &&
              typeof errObj.response === "object" &&
              errObj.response !== null
            ) {
              const response = errObj.response as Record<string, unknown>;
              if (
                response.data &&
                typeof response.data === "object" &&
                response.data !== null
              ) {
                const data = response.data as Record<string, unknown>;
                if (typeof data.message === "string") {
                  errorMessage = data.message;
                } else if (
                  data.error &&
                  typeof data.error === "object" &&
                  data.error !== null
                ) {
                  const dataError = data.error as Record<string, unknown>;
                  if (typeof dataError.message === "string") {
                    errorMessage = dataError.message;
                  }
                }
              }
            }
          }
          toast.error(errorMessage);
        },
      },
    );
  };

  const handleResetPassword = async () => {
    await logout("/recruiter/forgot-password");
  };

  return {
    form,
    onSubmit,
    handleResetPassword,
    isPending: changePasswordMutation.isPending,
  };
}

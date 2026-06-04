import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../services/admin.api";

export const useRevokeCompanyVerification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      adminService.revokeCompanyVerification(id, reason),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: ["recruiter-details", variables.id],
      });
    },
  });
};

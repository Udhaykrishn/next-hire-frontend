import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminService } from "../services/admin.api";

export const useRestrictRecruiter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, description }: { id: string; description?: string }) =>
      adminService.updateRecruiterStatus(id, "", description),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["recruiter-details", variables.id],
      });
      queryClient.invalidateQueries({ queryKey: ["recruiters"] });
      toast.success("Recruiter status updated successfully");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update recruiter status",
      );
    },
  });
};

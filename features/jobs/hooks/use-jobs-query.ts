import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJob } from "../services/job.api";

export const useCreateJobMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiter", "jobs"] });
    },
  });
};

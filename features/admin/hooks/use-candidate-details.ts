import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { adminService } from "../services/admin.api";

export const useCandidateDetails = (id: string) => {
  const queryClient = useQueryClient();

  const { data, isPending: isCandidatePending } = useQuery({
    queryKey: ["candidate-details", id],
    queryFn: () => adminService.getCandidateById(id),
    enabled: !!id,
  });

  const [eduQuery, expQuery, certQuery] = useQueries({
    queries: [
      {
        queryKey: ["candidate-education", id],
        queryFn: () => adminService.getCandidateEducation(id),
        enabled: !!id,
      },
      {
        queryKey: ["candidate-experience", id],
        queryFn: () => adminService.getCandidateExperiences(id),
        enabled: !!id,
      },
      {
        queryKey: ["candidate-certificates", id],
        queryFn: () => adminService.getCandidateCertificates(id),
        enabled: !!id,
      },
    ],
  });

  const statusMutation = useMutation({
    mutationFn: ({
      status,
      description,
    }: {
      status: string;
      description: string;
    }) => adminService.updateCandidateStatus(id, status, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidate-details", id] });
      queryClient.invalidateQueries({ queryKey: ["admin-candidates"] });
      queryClient.invalidateQueries({ queryKey: ["candidate-education", id] });
      queryClient.invalidateQueries({ queryKey: ["candidate-experience", id] });
      queryClient.invalidateQueries({
        queryKey: ["candidate-certificates", id],
      });
      toast.success("Candidate status updated successfully");
    },
  });

  const isPending =
    isCandidatePending ||
    eduQuery.isPending ||
    expQuery.isPending ||
    certQuery.isPending;

  return {
    data,
    education: eduQuery.data || [],
    experience: expQuery.data || [],
    certificates: certQuery.data || [],
    isPending,
    statusMutation,
  };
};

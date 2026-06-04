import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

export interface RecruiterJobApplication {
  id: string;
  jobId: string;
  status: string;
  matchScore: number;
  matchBreakdown?: { keywords: string[]; notes: string };
  createdAt: string;
  updatedAt: string;
  candidate: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    profileImage: string | null;
    resume: string | null;
    bio?: string | null;
    experience?: string | null;
    skills?: string[];
  };
}

export function useRecruiterJobApplicationsQuery(jobId: string, page = 1, limit = 10, search = "", status = "") {
  return useQuery({
    queryKey: ["recruiter-job-applications", jobId, page, limit, search, status],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (search) params.append("search", search);
      if (status && status !== "ALL") params.append("status", status);

      const { data } = await apiClient.get<{ data: RecruiterJobApplication[]; total: number }>(
        `/job/${jobId}/applications?${params.toString()}`
      );
      return data;
    },
  });
}

export function useUpdateApplicationStatusMutation(jobId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ applicationId, status }: { applicationId: string; status: string }) => {
      const { data } = await apiClient.patch(`/job/application/${applicationId}/status`, { status });
      return data;
    },
    onSuccess: (_, variables) => {
      toast.success(`Application status updated to ${variables.status.replace("_", " ")}`);
      queryClient.invalidateQueries({ queryKey: ["recruiter-job-applications", jobId] });
      queryClient.invalidateQueries({ queryKey: ["jobStats", jobId] });
    },
    onError: (error) => {
      toast.error("Failed to update application status");
      console.error(error);
    },
  });
}

export function useRecruiterCandidateDetailsQuery(candidateId: string) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["recruiter-candidate-details", candidateId],
    queryFn: async () => {
      const [userRes, eduRes, expRes, certRes] = await Promise.all([
        apiClient.get(`/user/${candidateId}`),
        apiClient.get(`/education?userId=${candidateId}`),
        apiClient.get(`/project?userId=${candidateId}`),
        apiClient.get(`/certificate?userId=${candidateId}`),
      ]);

      return {
        user: (userRes)?.data || userRes,
        education: (eduRes)?.data || eduRes || [],
        experience: (expRes)?.data || expRes || [],
        certificates: (certRes)?.data || certRes || [],
      };
    },
    enabled: !!candidateId,
  });

  return {
    data: data?.user,
    education: data?.education || [],
    experience: data?.experience || [],
    certificates: data?.certificates || [],
    isPending,
    isError,
    error,
  };
}

export function useCalculateMatchScoreMutation() {
  return useMutation({
    mutationFn: async ({ jobId, candidateId, retry }: { jobId: string; candidateId: string; retry?: boolean }) => {
      const params = retry ? { retry: "true" } : undefined;
      const { data } = await apiClient.get(`/job/${jobId}/candidates/${candidateId}/match-score`, { params });
      return data;
    },
    onError: (error) => {
      toast.error("Failed to calculate match score");
      console.error(error);
    },
  });
}

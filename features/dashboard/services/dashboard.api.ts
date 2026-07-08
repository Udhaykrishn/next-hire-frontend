import { apiClient } from "@/lib/api-client";

export interface DashboardMetrics {
  applicationsTrendData: { name: string; applicants: number }[];
  hiringFunnelData: { stage: string; count: number }[];
  kpis: {
    activeJobs: number;
    activeJobsTrend: number;
    totalApplicants: number;
    totalApplicantsTrend: number;
    newApplicantsToday: number;
    newApplicantsTrend: number;
    candidatesToReview: number;
    interviewsToday: number;
    offersPending: number;
    hiredThisMonth: number;
    avgTimeToHireDays: number;
  };
  matrix: {
    pipeline: { label: string; value: string }[];
    source: { label: string; value: string }[];
    advanced: { label: string; value: string }[];
    recruitmentStatus: { label: string; value: string }[];
    hiringMetrics: { label: string; value: string }[];
    recruiterProductivity: { label: string; value: string }[];
    candidateFunnel: { label: string; value: string }[];
    interviewAnalytics: { label: string; value: string }[];
    qualityIndicators: { label: string; value: string }[];
    pendingTasks: { label: string; value: string; alert?: boolean }[];
    communication: { label: string; value: string; alert?: boolean }[];
  };
}

export const getDashboardMetrics = async (range: string = "Month"): Promise<DashboardMetrics> => {
  const response = await apiClient.get<DashboardMetrics>(`/stats/overview?range=${range}`);
  // Assuming the API returns { data: DashboardMetrics, success: boolean, ... }
  // Our apiClient usually extracts the response object depending on interceptors,
  // If your apiClient returns the raw axios response, it would be `response.data.data`
  // Here we use type coercion to match whatever unwrapping apiClient does natively.
  return (response as any).data || response;
};

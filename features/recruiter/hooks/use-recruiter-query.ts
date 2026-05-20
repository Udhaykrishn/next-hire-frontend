import { useQuery } from "@tanstack/react-query";
import {
  getRecruiterCandidates,
  getRecruiterJobListings,
  getRecruiterStats,
} from "../services/recruiter.api";

export const useRecruiterStatsQuery = () => {
  return useQuery({
    queryKey: ["recruiter", "stats"],
    queryFn: getRecruiterStats,
  });
};

export const useRecruiterCandidatesQuery = () => {
  return useQuery({
    queryKey: ["recruiter", "candidates"],
    queryFn: getRecruiterCandidates,
  });
};

export const useRecruiterJobsQuery = () => {
  return useQuery({
    queryKey: ["recruiter", "jobs"],
    queryFn: getRecruiterJobListings,
  });
};

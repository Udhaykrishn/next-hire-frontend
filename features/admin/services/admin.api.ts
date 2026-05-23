import type {
  ApiResponse,
  Certificate,
  Education,
  Experience,
} from "@/features/profile/types/profile.types";
import { apiClient } from "@/lib/api-client";
import type {
  AdminJobDetail,
  BackendJob,
  BackendRecruiter,
  BackendUser,
  CandidateDetail,
  PaginatedResponse,
  RecruiterDetail,
} from "../types/admin.types";

interface BackendResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: {
    took: number;
  };
}

interface BackendPaginationResponse<T> {
  data: T[];
  page: number;
  total: number;
}

const mapStatusToBackend = (status: string) => {
  if (!status) return "";
  const s = status.toLowerCase();
  if (s === "blocked") return "block";
  return s;
};

const mapStatusToFrontend = (status: string) => {
  if (!status) return "Pending";
  const s = status.toLowerCase();
  if (s === "active") return "Active";
  if (s === "pending") return "Pending";
  if (s === "block" || s === "blocked") return "Blocked";
  return status;
};

export const adminService = {
  getRecruiters: async (
    page = 1,
    limit = 10,
    search = "",
    status = "",
  ): Promise<PaginatedResponse<RecruiterDetail>> => {
    const response = await apiClient.get<
      BackendResponse<BackendPaginationResponse<BackendRecruiter>>
    >("/recruiter", {
      params: { page, limit, search, status: mapStatusToBackend(status) },
    });

    const paginated = response as unknown as BackendResponse<
      BackendPaginationResponse<BackendRecruiter>
    >;
    const { data, total } = paginated.data;

    return {
      data: data.map((r: BackendRecruiter) => ({
        id: r.id,
        name: r.name,
        company: r.company_name || "N/A",
        email: r.email,
        phone: r.phone || "N/A",
        status: mapStatusToFrontend(r.status),
        joined: new Date(r.createdAt).toLocaleDateString(),
        location: "Remote",
        about: r.description || "",
        jobs: [],
        activity: [],
      })),
      total,
    };
  },

  getCandidates: async (
    page = 1,
    limit = 10,
    search = "",
    status = "",
  ): Promise<PaginatedResponse<CandidateDetail>> => {
    const response = await apiClient.get<
      BackendResponse<BackendPaginationResponse<BackendUser>>
    >("/user", {
      params: { page, limit, search, status: mapStatusToBackend(status) },
    });

    const paginated = response as unknown as BackendResponse<
      BackendPaginationResponse<BackendUser>
    >;
    const { data, total } = paginated.data;

    return {
      data: data.map((c: BackendUser) => ({
        id: c.id,
        name: c.name,
        role: c.role_of_title || "Candidate",
        email: c.email,
        phone: c.phone || "N/A",
        status: mapStatusToFrontend(c.status),
        joined: new Date(c.createdAt).toLocaleDateString(),
        location: "Remote",
        experience: c.experience || "0 Years",
        skills: c.skills || [],
        education: "N/A",
        about: c.bio || "",
        documents: [],
        applications: [],
        block_description: c.block_description,
      })),
      total,
    };
  },

  getJobs: async (
    page = 1,
    limit = 10,
    search = "",
    status = "",
  ): Promise<PaginatedResponse<AdminJobDetail>> => {
    const response = await apiClient.get<
      BackendResponse<BackendPaginationResponse<BackendJob>>
    >("/job/all", {
      params: { page, limit, search, status },
    });

    const paginated = response as unknown as BackendResponse<
      BackendPaginationResponse<BackendJob>
    >;
    const { data, total } = paginated.data;

    return {
      data: data.map((j: BackendJob) => ({
        id: j._id,
        jobTitle: j.jobTitle || "Untitled Job",
        hiringCompany: j.hiringCompany || "N/A",
        jobType: j.jobType || "N/A",
        locationType: j.locationType || "N/A",
        minSalary: j.minSalary || "0",
        maxSalary: j.maxSalary || "0",
        posted: new Date(j.createdAt).toLocaleDateString(),
        status: j.status || "OPEN",
        experience: j.experience || "N/A",
        skills: j.skills || [],
        description: j.description || "",
        belongingCompany: j.belongingCompany || "N/A",
      })),
      total,
    };
  },

  getRecruiterById: async (id: string): Promise<RecruiterDetail> => {
    const response = await apiClient.get<BackendResponse<BackendRecruiter>>(
      `/recruiter/${id}`,
    );
    const paginated = response as unknown as BackendResponse<BackendRecruiter>;
    const r = paginated.data;

    return {
      id: r.id,
      name: r.name,
      company: r.company_name || "N/A",
      email: r.email,
      phone: r.phone || "N/A",
      status: mapStatusToFrontend(r.status),
      joined: new Date(r.createdAt).toLocaleDateString(),
      location: "Remote",
      about: r.description || "",
      GSTIN: r.GSTIN || undefined,
      CIN: r.CIN || undefined,
      website_link: r.website_link || undefined,
      category: r.category || undefined,
      company_role: r.company_role || undefined,
      is_verified_company: r.is_verified_company,
      admin_approved: r.admin_approved,
      verification_revoked_reason: r.verification_revoked_reason || "",
      subscription: r.subscription,
      activity: [
        {
          type: "account_created",
          description: "Company account registered",
          date: new Date(r.createdAt).toLocaleDateString(),
        },
      ],
    };
  },

  getRecruiterJobs: async (id: string): Promise<AdminJobDetail[]> => {
    const response = await apiClient.get<BackendResponse<BackendJob[]>>(
      `/job/recruiter/${id}`,
    );
    const paginated = response as unknown as BackendResponse<BackendJob[]>;
    const jobs = paginated.data;

    return jobs.map((j) => ({
      id: j._id,
      jobTitle: j.jobTitle || "Untitled Job",
      hiringCompany: j.hiringCompany || "N/A",
      jobType: j.jobType || "N/A",
      locationType: j.locationType || "N/A",
      minSalary: j.minSalary || "0",
      maxSalary: j.maxSalary || "0",
      posted: new Date(j.createdAt).toLocaleDateString(),
      status: j.status || "OPEN",
      experience: j.experience || "N/A",
      skills: j.skills || [],
      description: j.description || "",
      belongingCompany: j.belongingCompany || "N/A",
    }));
  },

  getCandidateById: async (id: string): Promise<CandidateDetail> => {
    const response = await apiClient.get<BackendResponse<BackendUser>>(
      `/user/${id}`,
    );
    const paginated = response as unknown as BackendResponse<BackendUser>;
    const c = paginated.data;

    return {
      id: c.id,
      name: c.name,
      role: c.role_of_title || "Candidate",
      email: c.email,
      phone: c.phone || "N/A",
      status: mapStatusToFrontend(c.status),
      joined: new Date(c.createdAt).toLocaleDateString(),
      location: "Remote",
      experience: c.experience || "0 Years",
      skills: c.skills || [],
      education: "N/A",
      about: c.bio || "",
      documents: c.resume_url
        ? [
            {
              name: "Resume",
              type: "PDF",
              size: "N/A",
              date: new Date(c.createdAt).toLocaleDateString(),
              url: c.resume_url.url,
            },
          ]
        : [],
      applications: [],
      block_description: c.block_description,
    };
  },

  updateRecruiterStatus: async (
    id: string,
    _status: string,
    description?: string,
  ): Promise<void> => {
    await apiClient.patch(`/recruiter/${id}/block`, { description });
  },

  revokeCompanyVerification: async (
    id: string,
    reason: string,
  ): Promise<void> => {
    await apiClient.patch(`/recruiter/${id}/revoke-verification`, { reason });
  },

  updateCandidateStatus: async (
    id: string,
    _status: string,
    description?: string,
  ): Promise<void> => {
    await apiClient.patch(`/user/${id}/block`, { description });
  },

  updateJobStatus: async (
    id: string,
    _status: string,
    description?: string,
  ): Promise<void> => {
    await apiClient.patch(`/job/block/${id}`, { description });
  },

  getCandidateEducation: async (userId: string): Promise<Education[]> => {
    const response = (await apiClient.get("/education", {
      params: { userId },
    })) as ApiResponse<Education[]>;
    return response.data;
  },

  getCandidateExperiences: async (userId: string): Promise<Experience[]> => {
    const response = (await apiClient.get("/project", {
      params: { userId },
    })) as ApiResponse<Experience[]>;
    return response.data;
  },

  getCandidateCertificates: async (userId: string): Promise<Certificate[]> => {
    const response = (await apiClient.get("/certificate", {
      params: { userId },
    })) as ApiResponse<Certificate[]>;
    return response.data;
  },
};

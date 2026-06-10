import { ApiAdminRoutes, ApiUserRoutes } from "@/constants/api-routes";
import type {
  ApiResponse,
  Certificate,
  Education,
  Experience,
} from "@/features/profile/types/profile.types";
import { apiClient } from "@/lib/api-client";
import type {
  AdminJobApplication,
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
    >(ApiAdminRoutes.RECRUITERS, {
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
    >(ApiAdminRoutes.CANDIDATES, {
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
    >(ApiAdminRoutes.JOBS, {
      params: { page, limit, search, status },
    });

    const paginated = response as unknown as BackendResponse<
      BackendPaginationResponse<BackendJob>
    >;
    const { data, total } = paginated.data;

    return {
      data: data.map((j: BackendJob) => {
        const createdDate =
          j.createdAt || j.created_at
            ? new Date((j.createdAt || j.created_at) as string)
            : new Date();
        const expireDate = new Date(
          createdDate.getTime() + 15 * 24 * 60 * 60 * 1000,
        );

        return {
          id: j.id,
          jobTitle: j.jobTitle,
          hiringCompany: j.hiringCompany || "N/A",
          jobType: j.jobType || "N/A",
          locationType: j.locationType || "N/A",
          minSalary: j.minSalary || "0",
          maxSalary: j.maxSalary || "0",
          posted: createdDate.toLocaleDateString(),
          expireIn: expireDate.toLocaleDateString(),
          status: j.status || "OPEN",
          experience: j.experience || "N/A",
          skills: j.skills || [],
          description: j.description || "",
          belongingCompany: j.belongingCompany || "N/A",
        };
      }),
      total,
    };
  },

  getRecruiterById: async (id: string): Promise<RecruiterDetail> => {
    const response = await apiClient.get<BackendResponse<BackendRecruiter>>(
      `${ApiAdminRoutes.RECRUITERS}/${id}`,
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

  getJobById: async (id: string): Promise<AdminJobDetail> => {
    const response = await apiClient.get<BackendResponse<BackendJob>>(
      `${ApiUserRoutes.JOBS}/${id}`,
    );
    const j = (response as unknown as BackendResponse<BackendJob>).data;
    const createdDate = j.createdAt
      ? new Date(j.createdAt as string)
      : new Date();
    const expireDate = new Date(
      createdDate.getTime() + 15 * 24 * 60 * 60 * 1000,
    );

    return {
      id: j.id,
      jobTitle: j.jobTitle || "Untitled Job",
      hiringCompany: j.hiringCompany || "N/A",
      jobType: j.jobType || "N/A",
      locationType: j.locationType || "N/A",
      minSalary: j.minSalary || "0",
      maxSalary: j.maxSalary || "0",
      posted: createdDate.toLocaleDateString(),
      expireIn: expireDate.toLocaleDateString(),
      status: j.status || "OPEN",
      experience: j.experience || "N/A",
      skills: j.skills || [],
      description: j.description || "",
      jobDescription: j.jobDescription,
      belongingCompany: j.belongingCompany || "N/A",
      companyLogo: j.companyLogo,
      experienceType: j.experienceType,
      jobCategory: j.jobCategory,
      isNightShift: j.isNightShift,
      officeAddress: j.officeAddress,
      fieldArea: j.fieldArea,
      jobCity: j.jobCity,
      floorDetails: j.floorDetails,
      showFloorDetails: j.showFloorDetails,
      industry: j.industry,
      payType: j.payType,
      incentiveAmount: j.incentiveAmount,
      perks: j.perks,
      hasJoiningFee: j.hasJoiningFee,
      feeAmount: j.feeAmount,
      feeReason: j.feeReason,
      feeDetails: j.feeDetails,
      feePaymentTiming: j.feePaymentTiming,
      gender: j.gender,
      minAge: j.minAge,
      maxAge: j.maxAge,
      education: j.education,
      degreeSpecialization: j.degreeSpecialization,
      regionalLanguages: j.regionalLanguages,
      englishLevel: j.englishLevel,
      minExperience: j.minExperience,
      isWalkIn: j.isWalkIn,
      interviewAddress: j.interviewAddress,
      walkInStartDate: j.walkInStartDate,
      walkInEndDate: j.walkInEndDate,
      walkInStartTime: j.walkInStartTime,
      walkInEndTime: j.walkInEndTime,
      interviewInstructions: j.interviewInstructions,
      contactPreference: j.contactPreference,
      hrName: j.hrName,
      hrPhone: j.hrPhone,
      hrEmail: j.hrEmail,
      otherRecruiterName: j.otherRecruiterName,
      otherRecruiterWhatsapp: j.otherRecruiterWhatsapp,
      otherRecruiterEmail: j.otherRecruiterEmail,
      canCandidateContact: j.canCandidateContact,
      whatsappAlerts: j.whatsappAlerts,
      selectedPlan: j.selectedPlan,
      company_id: j.company_id,
      posted_by: j.posted_by,
      is_published: j.is_published,
      stats: j.stats,
    };
  },

  getJobStats: async (
    id: string,
  ): Promise<{
    total: number;
    reviewing: number;
    interviews: number;
    offers: number;
  }> => {
    const response = await apiClient.get<
      BackendResponse<{
        total: number;
        reviewing: number;
        interviews: number;
        offers: number;
      }>
    >(`${ApiUserRoutes.JOBS}/${id}/stats`);
    return (
      response as unknown as BackendResponse<{
        total: number;
        reviewing: number;
        interviews: number;
        offers: number;
      }>
    ).data;
  },

  getJobApplications: async (
    id: string,
    page = 1,
    limit = 10,
    search?: string,
    status?: string,
  ): Promise<{ data: AdminJobApplication[]; total: number }> => {
    const params: Record<string, string | number | undefined> = { page, limit };
    if (search) params.search = search;
    if (status && status !== "ALL") params.status = status;

    const response = await apiClient.get<
      BackendResponse<{ data: AdminJobApplication[]; total: number }>
    >(`${ApiUserRoutes.JOBS}/${id}/applications`, {
      params,
    });
    return (
      response as unknown as BackendResponse<{
        data: AdminJobApplication[];
        total: number;
      }>
    ).data;
  },

  getRecruiterJobs: async (id: string): Promise<AdminJobDetail[]> => {
    const response = await apiClient.get<BackendResponse<BackendJob[]>>(
      `${ApiUserRoutes.JOBS}/recruiter/${id}`,
    );
    const paginated = response as unknown as BackendResponse<BackendJob[]>;
    const jobs = paginated.data;

    return jobs.map((j) => {
      const createdDate = j.createdAt
        ? new Date(j.createdAt as string)
        : new Date();
      const expireDate = new Date(
        createdDate.getTime() + 15 * 24 * 60 * 60 * 1000,
      );

      return {
        id: j.id,
        jobTitle: j.jobTitle || "Untitled Job",
        hiringCompany: j.hiringCompany || "N/A",
        jobType: j.jobType || "N/A",
        locationType: j.locationType || "N/A",
        minSalary: j.minSalary || "0",
        maxSalary: j.maxSalary || "0",
        posted: createdDate.toLocaleDateString(),
        expireIn: expireDate.toLocaleDateString(),
        status: j.status || "OPEN",
        experience: j.experience || "N/A",
        skills: j.skills || [],
        description: j.description || "",
        belongingCompany: j.belongingCompany || "N/A",
      };
    });
  },

  getCandidateById: async (id: string): Promise<CandidateDetail> => {
    const response = await apiClient.get<BackendResponse<BackendUser>>(
      `${ApiAdminRoutes.CANDIDATES}/${id}`,
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
    await apiClient.patch(`${ApiAdminRoutes.RECRUITERS}/${id}/block`, {
      description,
    });
  },

  revokeCompanyVerification: async (
    id: string,
    reason: string,
  ): Promise<void> => {
    await apiClient.patch(
      `${ApiAdminRoutes.RECRUITERS}/${id}/revoke-verification`,
      { reason },
    );
  },

  updateCandidateStatus: async (
    id: string,
    _status: string,
    description?: string,
  ): Promise<void> => {
    await apiClient.patch(`${ApiAdminRoutes.CANDIDATES}/${id}/block`, {
      description,
    });
  },

  updateJobStatus: async (
    id: string,
    _status: string,
    description?: string,
  ): Promise<void> => {
    await apiClient.patch(`${ApiUserRoutes.JOBS}/block/${id}`, { description });
  },

  getCandidateEducation: async (userId: string): Promise<Education[]> => {
    const response = (await apiClient.get(ApiUserRoutes.EDUCATION, {
      params: { userId },
    })) as ApiResponse<Education[]>;
    return response.data;
  },

  getCandidateExperiences: async (userId: string): Promise<Experience[]> => {
    const response = (await apiClient.get(ApiUserRoutes.PROJECT, {
      params: { userId },
    })) as ApiResponse<Experience[]>;
    return response.data;
  },

  getCandidateCertificates: async (userId: string): Promise<Certificate[]> => {
    const response = (await apiClient.get(ApiUserRoutes.CERTIFICATE, {
      params: { userId },
    })) as ApiResponse<Certificate[]>;
    return response.data;
  },
};

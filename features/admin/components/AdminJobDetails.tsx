"use client";

import {
  Ban,
  Briefcase,
  Clock,
  DollarSign,
  Eye,
  ListChecks,
  MapPin,
  Unlock,
  ArrowLeft,
  Users,
  FileText,
  UserCheck,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { ConfirmationModal } from "@/components/shared/confirmation-modal";
import { formatSalaryAmount } from "@/lib/salary";
import { useAdminJobDetails } from "../hooks/use-admin-job-details";
import { useAdminJobStats } from "../hooks/use-admin-job-stats";
import { useAdminJobs } from "../hooks/use-admin-jobs";

import { AdminJobApplicationsList } from "./AdminJobApplicationsList";

export const AdminJobDetails = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data: job } = useAdminJobDetails(id);
  const { data: statsData } = useAdminJobStats(id);
  const { handleConfirmBlock } = useAdminJobs();

  const [dialogType, setDialogType] = useState<"block" | "unblock" | null>(null);

  const handleAction = (action: "block" | "unblock") => {
    setDialogType(action);
  };

  const closeDialog = () => {
    setDialogType(null);
  };

  const handleConfirmAction = () => {
    if (job) {
      handleConfirmBlock(job.id);
    }
    closeDialog();
  };

  if (!job) return null;

  const stats = statsData || { total: 0, reviewing: 0, interviews: 0, offers: 0 };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="text-gray-500 hover:text-near-black flex items-center gap-2 px-0"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Jobs
      </Button>

      {/* Main Header Card */}
      <div className="bg-white border border-gray-200/60 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="p-8 sm:p-10 flex flex-col sm:flex-row sm:items-start justify-between gap-6 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-wise-green/5 rounded-bl-[100px] pointer-events-none" />
          <div className="flex items-start sm:items-center gap-6 relative z-10">
            <div className="w-20 h-20 bg-wise-green/10 rounded-3xl flex items-center justify-center shrink-0 border border-wise-green/20">
              <Briefcase className="w-10 h-10 text-wise-green" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-black text-near-black tracking-tight">
                  {job.jobTitle}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm ${
                    job.status === "OPEN"
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}
                >
                  {job.status}
                </span>
              </div>
              <p className="text-gray-500 font-medium flex items-center gap-2 text-sm">
                <span className="text-near-black font-semibold">{job.hiringCompany}</span>
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                <span>{job.jobType}</span>
                {job.belongingCompany && job.belongingCompany !== job.hiringCompany && (
                  <>
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                    <span className="text-gray-400">Via: {job.belongingCompany}</span>
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="relative z-10 shrink-0">
            {job.status === "OPEN" ? (
              <button
                onClick={() => handleAction("block")}
                className="group flex items-center gap-2 px-5 py-3 bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-2xl transition-all shadow-sm font-semibold text-sm"
                title="Block Job Post"
              >
                <Ban className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Block Job</span>
              </button>
            ) : (
              <button
                onClick={() => handleAction("unblock")}
                className="group flex items-center gap-2 px-5 py-3 bg-white border border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 rounded-2xl transition-all shadow-sm font-semibold text-sm"
                title="Activate Job Post"
              >
                <Unlock className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Activate Job</span>
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100 border-t border-gray-100 bg-gray-50/30">
          <div className="p-6 flex flex-col items-center justify-center text-center">
            <DollarSign className="w-6 h-6 text-gray-400 mb-2" />
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Salary Range</p>
            <p className="text-[15px] font-black text-near-black">
              {formatSalaryAmount(job.minSalary, "INR", "full")} - {formatSalaryAmount(job.maxSalary, "INR", "full")}
            </p>
          </div>
          <div className="p-6 flex flex-col items-center justify-center text-center">
            <MapPin className="w-6 h-6 text-gray-400 mb-2" />
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Location Type</p>
            <p className="text-[15px] font-black text-near-black">{job.locationType}</p>
          </div>
          <div className="p-6 flex flex-col items-center justify-center text-center">
            <Clock className="w-6 h-6 text-gray-400 mb-2" />
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Posted On</p>
            <p className="text-[15px] font-black text-near-black">{job.posted}</p>
          </div>
          <div className="p-6 flex flex-col items-center justify-center text-center">
            <Clock className="w-6 h-6 text-red-400 mb-2" />
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Expires On</p>
            <p className="text-[15px] font-black text-red-600">{job.expireIn}</p>
          </div>
        </div>
      </div>

      {/* Application Insights Section */}
      <div>
        <h2 className="text-xl font-black text-near-black mb-4 flex items-center gap-2">
          <Users className="w-6 h-6 text-wise-green" />
          Application Insights
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-[100px] transition-transform group-hover:scale-110" />
            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500">Total Applications</p>
                <p className="text-3xl font-black text-near-black mt-1">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-[100px] transition-transform group-hover:scale-110" />
            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500">In Review</p>
                <p className="text-3xl font-black text-near-black mt-1">{stats.reviewing}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50/50 rounded-bl-[100px] transition-transform group-hover:scale-110" />
            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500">Interviewing</p>
                <p className="text-3xl font-black text-near-black mt-1">{stats.interviews}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-wise-green/10 rounded-bl-[100px] transition-transform group-hover:scale-110" />
            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="w-12 h-12 bg-wise-green/10 rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-wise-green" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500">Offers Extended</p>
                <p className="text-3xl font-black text-near-black mt-1">{stats.offers}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdminJobApplicationsList jobId={id} />

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-5 mb-5">
              <div className="w-10 h-10 bg-wise-green/10 rounded-2xl flex items-center justify-center">
                <ListChecks className="w-5 h-5 text-wise-green" />
              </div>
              <h4 className="font-black text-lg text-near-black tracking-tight">
                Job Description
              </h4>
            </div>
            {job.description ? (
              <div
                className="text-gray-600 font-medium leading-relaxed prose prose-sm max-w-none prose-p:mb-4 prose-ul:list-disc prose-ul:pl-4"
                dangerouslySetInnerHTML={{
                  __html: job.description,
                }}
              />
            ) : (
              <p className="text-gray-400 font-medium italic bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200">
                No description provided by the recruiter.
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
            <h4 className="font-black text-lg text-near-black tracking-tight mb-5">
              Requirements
            </h4>
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Required Experience</span>
                <span className="inline-block text-sm font-black text-near-black bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">{job.experience}</span>
              </div>
              
              {job.skills.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Core Skills</span>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-wise-green/5 border border-wise-green/20 rounded-xl text-xs font-bold text-dark-green transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={dialogType === "block"}
        onClose={closeDialog}
        title="Flag Job as Threat / Scam?"
        description={`Are you sure you want to block "${job.jobTitle}"? This will hide the post from candidates.`}
        onConfirm={handleConfirmAction}
        variant="destructive"
        confirmText="Confirm Block"
      />

      <ConfirmationModal
        isOpen={dialogType === "unblock"}
        onClose={closeDialog}
        title="Activate Job Listing?"
        description={`Are you sure you want to reactivate the job post "${job.jobTitle}"?`}
        onConfirm={handleConfirmAction}
        variant="success"
        confirmText="Activate"
      />
    </div>
  );
};

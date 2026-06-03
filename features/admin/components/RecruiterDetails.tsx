"use client";

import {
  Briefcase,
  Clock,
  Eye,
  Mail,
  Phone,
  PlusCircle,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { ConfirmationModal } from "@/components/shared/confirmation-modal";
import { cn } from "@/lib/utils";
import { useRecruiterDetails } from "../hooks/use-recruiter-details";
import { useRecruiterJobs } from "../hooks/use-recruiter-jobs";
import { useRestrictRecruiter } from "../hooks/use-restrict-recruiter";

const ActivityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "job_created":
      return <PlusCircle className="w-4 h-4 text-wise-green" />;
    case "view_details":
      return <Eye className="w-4 h-4 text-wise-green" />;
    case "settings_update":
      return <Settings className="w-4 h-4 text-gray-400" />;
    case "job_status":
      return <Briefcase className="w-4 h-4 text-orange-500" />;
    default:
      return <Clock className="w-4 h-4 text-gray-300" />;
  }
};

interface RecruiterDetailsProps {
  id: string;
}

export const RecruiterDetails = ({ id }: RecruiterDetailsProps) => {
  const { data: recruiter } = useRecruiterDetails(id);
  const { mutate: restrictRecruiter, isPending: isRestricting } =
    useRestrictRecruiter();
  const { data: jobs = [], isLoading: isJobsLoading } = useRecruiterJobs(id);
  const [isBlocking, setIsBlocking] = useState(false);

  if (!recruiter) return null;

  const handleConfirm = () => {
    restrictRecruiter({ id });
    setIsBlocking(false);
  };

  return (
    <div className="space-y-12">
      {/* Profile Identity */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-10">
        <div className="relative group">
          <div className="w-40 h-40 rounded-[3rem] bg-near-black flex items-center justify-center text-5xl font-black text-wise-green shadow-2xl shadow-near-black/20 group-hover:rotate-6 transition-transform">
            {recruiter.name.charAt(0)}
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-50">
            <div className="w-3 h-3 rounded-full bg-wise-green shadow-[0_0_10px_rgba(159,232,112,0.8)]" />
          </div>
        </div>

        <div className="flex-1 space-y-4 text-center md:text-left">
          <div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-2">
              <h1 className="text-5xl font-black text-near-black tracking-tighter uppercase">
                {recruiter.name}
              </h1>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-bold text-gray-400">
              <span className="text-near-black">{recruiter.company}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
              Joined {recruiter.joined}
              <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest",
                  recruiter.status === "Active"
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600",
                )}
              >
                {recruiter.status}
              </span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-3">
            <a
              href={`mailto:${recruiter.email}`}
              className="h-12 px-6 bg-white hover:bg-wise-green/5 rounded-2xl flex items-center gap-2 text-sm font-bold text-near-black transition-all border border-gray-100 hover:border-wise-green/30"
            >
              <Mail className="w-4 h-4 text-wise-green" />
              {recruiter.email}
            </a>
            <a
              href={`tel:${recruiter.phone}`}
              className="h-12 px-6 bg-white hover:bg-wise-green/5 rounded-2xl flex items-center gap-2 text-sm font-bold text-near-black transition-all border border-gray-100 hover:border-wise-green/30"
            >
              <Phone className="w-4 h-4 text-wise-green" />
              {recruiter.phone}
            </a>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="text-[10px] font-black text-near-black uppercase tracking-[0.4em] flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-wise-green shadow-[0_0_10px_rgba(159,232,112,0.8)]" />
                Company Details
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Company Role
                </p>
                <p className="text-sm font-bold text-near-black">
                  {recruiter.company_role || "N/A"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Category
                </p>
                <p className="text-sm font-bold text-near-black">
                  {recruiter.category || "N/A"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  GSTIN
                </p>
                <p className="text-sm font-bold text-near-black">
                  {recruiter.GSTIN || "N/A"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  CIN
                </p>
                <p className="text-sm font-bold text-near-black">
                  {recruiter.CIN || "N/A"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Website
                </p>
                {recruiter.website_link ? (
                  <a
                    href={recruiter.website_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-wise-green hover:underline"
                  >
                    {recruiter.website_link}
                  </a>
                ) : (
                  <p className="text-sm font-bold text-near-black">N/A</p>
                )}
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Verification Status
                </p>
                <p className="text-sm font-bold text-near-black">
                  {recruiter.is_verified_company ? "Verified" : "Unverified"} /{" "}
                  {recruiter.admin_approved
                    ? "Admin Approved"
                    : "Pending Approval"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl md:col-span-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Subscription Plan
                </p>
                <p className="text-sm font-bold text-near-black">
                  {recruiter.subscription?.current_plan || "Free"}{" "}
                  {recruiter.subscription?.is_subscribed
                    ? "(Active)"
                    : "(Inactive)"}
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
            <div className="text-xs font-black text-near-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-wise-green" />
              User Activity
            </div>
            <div className="space-y-8">
              {recruiter.activity.map((act, idx) => (
                <div
                  key={idx}
                  className="relative pl-8 border-l-2 border-gray-50 last:border-0 pb-2"
                >
                  <div className="absolute top-0 -left-[11px] w-5 h-5 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center shadow-sm">
                    <ActivityIcon type={act.type} />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <p className="text-[15px] font-bold text-near-black leading-tight">
                      {act.description}
                    </p>
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest whitespace-nowrap">
                      {act.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="text-[10px] font-black text-near-black uppercase tracking-[0.4em] flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-wise-green shadow-[0_0_10px_rgba(159,232,112,0.8)]" />
                Jobs Created
              </div>
              <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                {isJobsLoading ? "..." : jobs.length} Postings
              </span>
            </div>

            <div className="space-y-4">
              {isJobsLoading ? (
                <div className="p-6 text-center text-gray-400 text-sm font-bold">
                  Loading jobs...
                </div>
              ) : jobs.length === 0 ? (
                <div className="p-6 text-center text-gray-400 text-sm font-bold">
                  No jobs created yet.
                </div>
              ) : (
                jobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-6 bg-white border border-gray-100 rounded-2xl flex items-center justify-between group hover:border-wise-green/30 transition-all hover:shadow-sm"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-near-black mb-1">
                        {job.jobTitle}
                      </h4>
                      <div className="flex items-center gap-3 text-[11px] font-bold text-gray-400">
                        <span className="uppercase tracking-widest">
                          {job.jobType}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-200" />
                        <span className="uppercase tracking-widest">
                          {job.locationType}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-gray-300 uppercase tracking-widest">
                        {job.posted}
                      </span>
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          job.status === "OPEN" || job.status === "PUBLISHED"
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-500",
                        )}
                      >
                        {job.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
            <div className="text-xs font-black text-near-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Users className="w-4 h-4 text-wise-green" />
              About
            </div>
            <p className="text-sm font-medium text-gray-500 leading-relaxed italic">
              "{recruiter.about}"
            </p>
          </section>

          <section className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-8">
            <h3 className="text-[10px] font-black text-near-black uppercase tracking-widest mb-6">
              Moderator Tools
            </h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                onClick={() => setIsBlocking(true)}
                disabled={isRestricting}
                className={cn(
                  "w-full h-12 rounded-xl justify-start text-xs font-black uppercase tracking-widest transition-colors",
                  recruiter.status === "Blocked"
                    ? "border-green-100 text-green-500 hover:bg-green-50 hover:border-green-200"
                    : "border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200",
                )}
              >
                {recruiter.status === "Blocked"
                  ? "Restore Partner Access"
                  : "Restrict Partner Access"}
              </Button>
            </div>
          </section>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isBlocking}
        onClose={() => setIsBlocking(false)}
        onConfirm={handleConfirm}
        title={
          recruiter.status === "Blocked"
            ? "Restore Recruiter Access"
            : "Restrict Recruiter Access"
        }
        description={
          recruiter.status === "Blocked"
            ? "This will restore account access and enable all active job postings for this company."
            : "This will immediately revoke account access and disable all active job postings for this company."
        }
        confirmText={
          recruiter.status === "Blocked"
            ? "Confirm Restore"
            : "Confirm Restriction"
        }
        variant={recruiter.status === "Blocked" ? "info" : "danger"}
      />
    </div>
  );
};

"use client";
import { domAnimation, LazyMotion, m } from "framer-motion";
import {
  Briefcase,
  Clock,
  Info,
  Navigation,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { JobCreationModal } from "@/components/recruiter/modals";
import { ConfirmationModal } from "@/components/shared/confirmation-modal";
import { Button } from "@/components/ui/button";
import { RecruiterJobStats } from "@/features/jobs/components/recruiter-job-stats";
import { useUpdateJobMutation } from "@/features/jobs/hooks/use-jobs-query";
import { type JobListing, useRecruiter } from "@/hooks/use-recruiter";

export default function RecruiterDashboard() {
  const { push } = useRouter();
  const { jobs, isLoading, isJobModalOpen, setIsJobModalOpen } = useRecruiter();
  const [publishingJob, setPublishingJob] = useState<string | null>(null);
  const { mutateAsync: updateJob } = useUpdateJobMutation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="size-8 border-4 border-wise-green/10 border-t-wise-green rounded-full animate-spin" />
          <p className="text-gray-300 font-black text-[9px] uppercase tracking-widest animate-pulse">
            Synchronizing Jobs
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="gap-y-6 animate-in fade-in duration-700">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-black text-near-black tracking-tight">
          All Jobs <span className="text-gray-300 ml-1">({jobs.length})</span>
        </h1>
        <Button
          onClick={() => push("/recruiter/jobs/create")}
          className="h-10 px-5 bg-wise-green text-near-black hover:bg-near-black hover:text-white transition-all rounded-xl font-black text-[13px] shadow-lg shadow-wise-green/10 group"
        >
          <Plus className="size-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          Post a new job
        </Button>
      </div>

      {/* Jobs List - Compact Satoshi Style */}
      <div className="gap-y-4">
        {jobs.map((job: JobListing) => (
          <m.div
            key={job.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[1.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group"
          >
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-8">
              {/* Left Column: Job Primary Info */}
              <div className="flex-1 gap-y-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-[18px] font-black text-near-black group-hover:text-wise-green transition-colors leading-none tracking-tight">
                    {job.title}
                  </h2>
                  <div
                    className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${!job.isPublished ? "bg-yellow-50 text-yellow-600 border-yellow-100" : "bg-green-50 text-green-600 border-green-100"}`}
                  >
                    {!job.isPublished ? "Draft" : "Active"}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
                  {job.location && (
                    <div className="flex items-center gap-1.5 text-gray-400 text-[12px] font-medium">
                      <Navigation className="size-3.5 text-wise-green/40" />
                      {job.location}
                    </div>
                  )}
                  {job.posted && (
                    <div className="flex items-center gap-1.5 text-gray-400 text-[12px] font-medium">
                      <Clock className="size-3.5 text-wise-green/40" />
                      Posted: {job.posted}
                    </div>
                  )}
                </div>

                {!job.isPublished && (
                  <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gray-50/50 border border-gray-100/50 text-[12px] font-medium text-gray-400">
                    <Info className="size-3.5 text-wise-green" />
                    Publish job to start receiving candidates
                  </div>
                )}
              </div>

              {/* Middle Column: Stats Display */}
              <div
                className="cursor-pointer hover:bg-gray-50/80 transition-colors rounded-xl"
                onClick={() =>
                  push(`/recruiter/jobs/${job.id}/applications`)
                }
              >
                <RecruiterJobStats jobId={job.id} />
              </div>

              <div className="flex items-center gap-3">
                {!job.isPublished ? (
                  <Button
                    onClick={() => setPublishingJob(job.id)}
                    variant="outline"
                    className="h-10 px-6 rounded-full border-gray-100 font-black text-[13px] text-near-black hover:border-wise-green hover:bg-wise-green/5 transition-all"
                  >
                    Publish
                  </Button>
                ) : job.expiresIn ? (
                  <div className="flex flex-col items-end pr-4">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Expires In
                    </span>
                    <span className="text-[13px] font-black text-orange-500">
                      {job.expiresIn}
                    </span>
                  </div>
                ) : null}

                <Button
                  onClick={() => push(`/recruiter/jobs/edit/${job.id}`)}
                  variant="ghost"
                  size="icon"
                  className="size-10 rounded-full text-slate-500 hover:text-near-black hover:bg-slate-50 transition-all"
                >
                  <Pencil className="size-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="size-10 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          </m.div>
        ))}

        {/* Empty State */}
        {jobs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-[2rem] border border-dashed border-gray-200">
            <div className="size-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
              <Briefcase className="size-8 text-gray-100" />
            </div>
            <h3 className="text-[18px] font-black text-near-black mb-1">
              No active listings
            </h3>
            <p className="text-gray-400 font-medium text-[13px] mb-6 text-center">
              Deploy your first role to start <br />
              matching with elite talent.
            </p>
            <Button
              onClick={() => push("/recruiter/jobs/create")}
              className="h-12 px-8 bg-wise-green text-near-black hover:bg-near-black hover:text-white transition-all rounded-full font-black text-sm shadow-xl shadow-wise-green/10"
            >
              Initialize Deployment
            </Button>
          </div>
        )}
      </div>

      {/* Modals */}
      <JobCreationModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
      />
      <ConfirmationModal
        isOpen={!!publishingJob}
        onClose={() => setPublishingJob(null)}
        title="Publish Job"
        description="Are you sure you want to publish this job? Once published, candidates will be able to view and apply for this position."
        onConfirm={async () => {
          if (publishingJob) {
            await updateJob({
              jobId: publishingJob,
              data: { is_published: true },
            });
          }
          setPublishingJob(null);
        }}
        confirmText="Publish"
        cancelText="Cancel"
        variant="success"
      />
    </div>
  );
}

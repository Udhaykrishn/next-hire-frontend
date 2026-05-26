"use client";

import { format } from "date-fns";
import { Briefcase, Plus } from "lucide-react";
import Link from "next/link";
import { useRecruiterJobsQuery } from "@/features/jobs/hooks/use-jobs-query";
import type { JobResponse } from "@/features/jobs/types/job.types";

export default function RecruiterJobsPage() {
  const { data: jobs, isLoading, error } = useRecruiterJobsQuery();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-near-black tracking-tight">
            Your Jobs
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Manage your job postings and view applications.
          </p>
        </div>
        <Link
          href="/recruiter/jobs/create/new"
          className="bg-wise-green text-near-black px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-wise-green/90 transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
        >
          <Plus className="w-5 h-5" />
          Post New Job
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wise-green"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-500 p-4 rounded-xl border border-red-100">
          Failed to load jobs. Please try again.
        </div>
      ) : jobs && jobs.length > 0 ? (
        <div className="grid gap-4">
          {jobs.map((job: JobResponse) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-wise-green/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-wise-green/10 transition-colors">
                  <Briefcase className="w-6 h-6 text-slate-400 group-hover:text-wise-green transition-colors" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-near-black">
                      {job.jobTitle}
                    </h3>
                    <span
                      className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-black rounded-full ${job.status === "OPEN" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}
                    >
                      {job.status}
                    </span>
                    {!job.is_published && (
                      <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-black rounded-full bg-yellow-100 text-yellow-700">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 font-medium mt-1">
                    {job.hiringCompany} • {job.jobType} • {job.locationType}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-400 font-medium">
                    <span>
                      Posted{" "}
                      {format(
                        new Date(job.created_at || Date.now()),
                        "MMM d, yyyy",
                      )}
                    </span>
                    <span>•</span>
                    <span className="text-wise-green/80 font-bold">
                      0 Applications
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/recruiter/jobs/edit/${job.id}`}
                  className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-near-black transition-colors rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200"
                >
                  Edit Job
                </Link>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-bold text-near-black bg-slate-50 hover:bg-slate-100 transition-colors rounded-full border border-slate-200"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Briefcase className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-near-black mb-2">
            No jobs posted yet
          </h3>
          <p className="text-slate-500 mb-6 max-w-sm mx-auto">
            You haven't created any job listings. Post your first job to start
            receiving applications.
          </p>
          <Link
            href="/recruiter/jobs/create/new"
            className="inline-flex items-center gap-2 bg-white border border-slate-200 text-near-black px-6 py-3 rounded-full font-bold hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Create First Job
          </Link>
        </div>
      )}
    </div>
  );
}

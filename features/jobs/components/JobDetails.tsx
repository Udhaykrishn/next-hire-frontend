"use client";

import {
  AlertTriangle,
  ArrowRight,
  Bookmark,
  Building,
  CheckCircle,
  ChevronLeft,
  Clock,
  DollarSign,
  Loader2,
  MapPin,
  Share2,
  ShieldCheck,
  Target,
  Zap,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { LandingFooter } from "@/components/landing-footer";
import { LandingNavbar } from "@/components/landing-navbar";
import { useJobDetails } from "../hooks/use-job-details";

export default function JobDetails() {
  const {
    job,
    formattedSalary,
    formattedDate,
    handleBack,
    handleApply,
    isApplying,
    hasApplied,
    isProfileComplete,
    missingFields,
    isCandidate,
    isAuthenticated,
    handleShare,
    showSuccessModal,
    setShowSuccessModal,
  } = useJobDetails();

  if (!job) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-satoshi selection:bg-wise-green selection:text-dark-green">
      <LandingNavbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center mb-10">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-[14px] font-black text-gray-500 hover:text-wise-green transition-colors uppercase tracking-widest"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Search
            </button>
            <div className="flex gap-4">
              <button onClick={handleShare} className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Share2 className="w-4 h-4 text-gray-600" />
              </button>
              <button className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Bookmark className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {/* Header Card */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
                <div className="flex gap-4 md:gap-6 mb-6">
                  <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center font-bold text-2xl text-gray-500 shadow-sm shrink-0">
                    {job.hiringCompany?.[0] || "C"}
                  </div>
                  <div>
                    <h1 className="text-[22px] font-bold text-gray-900 mb-1 leading-tight">
                      {job.jobTitle}
                    </h1>
                    <p className="text-[15px] text-gray-500 font-medium">
                      {job.hiringCompany}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-600 text-[14px]">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{job.jobCity || "Remote"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-[14px]">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span>{formattedSalary}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 rounded text-[13px] font-medium border border-gray-100">
                    <Building className="w-3.5 h-3.5 text-gray-400" />
                    Office
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 rounded text-[13px] font-medium border border-gray-100">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {job.jobType}
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 rounded text-[13px] font-medium border border-gray-100">
                    <Target className="w-3.5 h-3.5 text-gray-400" />
                    {job.minExperience ? `Min. ${job.minExperience} year(s)` : "Fresher"}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 hidden lg:flex">
                  <Button
                    onClick={handleApply}
                    disabled={isApplying || hasApplied || job.status !== "OPEN"}
                    className={`flex-1 h-12 rounded-lg text-[15px] font-semibold transition-all flex items-center justify-center gap-2 ${hasApplied || job.status !== "OPEN"
                        ? "bg-gray-100 text-gray-500 cursor-default"
                        : "bg-[#258265] text-white hover:bg-[#1f6b53]"
                      }`}
                  >
                    {isApplying ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Applying...</>
                    ) : hasApplied ? (
                      <><CheckCircle className="w-4 h-4" /> Applied</>
                    ) : job.status !== "OPEN" ? (
                      "Job Unavailable"
                    ) : (
                      "Apply on NextHire"
                    )}
                  </Button>
                  <button onClick={handleShare} className="h-12 px-6 rounded-lg border border-[#258265] text-[#258265] font-medium flex items-center justify-center gap-2 hover:bg-[#258265]/5 transition-colors">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
              </div>

              {/* Details Card */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm space-y-8">
                <section>
                  <h2 className="text-[18px] font-bold text-gray-900 mb-4">
                    Job Description
                  </h2>
                  <div
                    className="text-[14px] text-gray-800 font-medium leading-[1.6] [&>p]:mb-4 last:[&>p]:mb-0 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ul>li]:mb-1.5 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>ol>li]:mb-1.5 [&>h1]:text-xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mb-4 [&>h2]:text-lg [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mb-3 [&>h3]:text-base [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mb-2 [&_strong]:font-bold [&_strong]:text-gray-900 [&_u]:underline"
                    dangerouslySetInnerHTML={{ __html: job.jobDescription || job.description || "" }}
                  />
                </section>

                <hr className="border-gray-100" />

                <section>
                  <h2 className="text-[18px] font-bold text-gray-900 mb-6">
                    Job role
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                    <div className="flex gap-3">
                      <Building className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[13px] text-gray-500 mb-0.5">Work location</p>
                        <p className="text-[14px] font-medium text-gray-900">{job.jobCity || "Remote"}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Target className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[13px] text-gray-500 mb-0.5">Department</p>
                        <p className="text-[14px] font-medium text-gray-900">{job.industry?.join(", ") || "Not specified"}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Clock className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[13px] text-gray-500 mb-0.5">Employment type</p>
                        <p className="text-[14px] font-medium text-gray-900">{job.jobType}</p>
                      </div>
                    </div>
                  </div>
                </section>

                <hr className="border-gray-100" />

                <section>
                  <h2 className="text-[18px] font-bold text-gray-900 mb-6">
                    Job requirements
                  </h2>
                  <div className="flex gap-3">
                    <Target className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[13px] text-gray-500 mb-0.5">Experience</p>
                      <p className="text-[14px] font-medium text-gray-900">
                        {job.minExperience ? `Min. ${job.minExperience} year` : "Not specified"}
                      </p>
                    </div>
                  </div>
                </section>

                <hr className="border-gray-100" />

                <section>
                  <h2 className="text-[18px] font-bold text-gray-900 mb-6">
                    About company
                  </h2>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm shrink-0 overflow-hidden">
                      {job.companyLogo ? (
                        <img src={job.companyLogo} alt={job.hiringCompany} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl font-black text-gray-400">
                          {job.hiringCompany?.[0] || "C"}
                        </span>
                      )}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-[13px] text-gray-500 mb-0.5">Name</p>
                        <p className="text-[15px] font-bold text-gray-900">
                          {job.hiringCompany}
                        </p>
                        {job.belongingCompany && job.belongingCompany !== job.hiringCompany && (
                          <p className="text-[13px] text-gray-600 mt-0.5">
                            Part of {job.belongingCompany}
                          </p>
                        )}
                      </div>

                      {job.officeAddress && (
                        <div>
                          <p className="text-[13px] text-gray-500 mb-0.5">Address</p>
                          <p className="text-[14px] font-medium text-gray-800 leading-relaxed">
                            {job.officeAddress}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Right Sidebar (4 cols) */}
            <aside className="lg:col-span-4 space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[2.5rem] p-8 relative overflow-hidden border border-gray-100 shadow-xl shadow-wise-green/5"
              >
                {/* Decorative Background Elements - Light Version */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-wise-green/5 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />

                <div className="relative z-10">


                  {isAuthenticated && isCandidate && !isProfileComplete && (
                    <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100 mb-6 space-y-4 text-left">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-[14px] font-black text-amber-900 leading-tight">
                            Profile Incomplete
                          </h4>
                          <p className="text-[12px] text-amber-700 font-medium leading-normal">
                            You must complete your profile and upload a resume
                            before you can apply to this job.
                          </p>
                        </div>
                      </div>

                      <div className="pl-11 space-y-2">
                        <p className="text-[11px] font-black text-amber-800 uppercase tracking-wider">
                          Missing Fields:
                        </p>
                        <ul className="grid grid-cols-1 gap-1.5">
                          {missingFields.map((field) => (
                            <li
                              key={field}
                              className="flex items-center gap-2 text-[12px] text-amber-700 font-bold"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                              {field}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pl-11 pt-2">
                        <Link
                          href="/profile"
                          className="inline-flex items-center gap-1.5 text-[12px] font-black text-amber-900 hover:text-black uppercase tracking-wider transition-colors group/link"
                        >
                          Complete Profile Now
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleApply}
                    disabled={
                      isApplying ||
                      hasApplied ||
                      job.status !== "OPEN"
                    }
                    className={`w-full h-14 rounded-2xl text-[15px] font-black transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 ${hasApplied || job.status !== "OPEN"
                        ? "bg-gray-100 text-gray-500 cursor-default shadow-none pointer-events-none"
                        : "bg-[#258265] text-white hover:bg-[#1f6b53] shadow-[#258265]/20"
                      }`}
                  >
                    {isApplying ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Applying...
                      </>
                    ) : hasApplied ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-dark-green fill-current" />
                        Applied for Job
                      </>
                    ) : job.status !== "OPEN" ? (
                      "Job Unavailable"
                    ) : (
                      "Apply on Now"
                    )}
                  </Button>
                </div>
              </motion.div>

              {/* Safety/Verification Widget */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-5 h-5 text-blue-500" />
                  <h4 className="text-[14px] font-black text-gray-900 uppercase tracking-widest">
                    Verified Employer
                  </h4>
                </div>
                <p className="text-[13px] text-gray-500 font-medium leading-relaxed mb-6">
                  {job.hiringCompany} has a verified presence on Next Hire.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Success Modal Overlay */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-md rounded-[2rem] p-8 relative shadow-2xl"
          >
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center text-center mt-4">
              <div className="w-20 h-20 bg-[#258265]/10 text-[#258265] rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 fill-current text-[#258265] opacity-20" />
                <CheckCircle className="w-10 h-10 absolute" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Applied successfully
              </h2>
              <p className="text-gray-500 font-medium mb-8 text-[15px]">
                Your application is successfully sent to HR
              </p>

              <div className="w-full bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-6 text-left">
                <h3 className="text-[16px] font-bold text-gray-900 mb-1">
                  Find out next steps
                </h3>
                <p className="text-[13px] text-gray-500 mb-5">
                  Track the status of this job in your dashboard
                </p>
                <Link
                  href="/applications"
                  className="flex w-full h-12 rounded-xl text-[14px] font-bold text-[#258265] bg-white border border-gray-200 hover:bg-gray-50 items-center justify-center transition-colors shadow-sm"
                >
                  View My Applications
                </Link>
              </div>

              <Link
                href="/jobs"
                className="w-full h-14 rounded-2xl text-[15px] font-bold bg-[#258265] text-white hover:bg-[#1f6b53] flex items-center justify-center transition-all shadow-md shadow-[#258265]/20"
              >
                Explore similar jobs
              </Link>
            </div>
          </motion.div>
        </div>
      )}

      <LandingFooter />
    </div>
  );
}

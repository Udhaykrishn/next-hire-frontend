"use client";

import {
  ArrowRight,
  Bookmark,
  Building,
  ChevronLeft,
  Clock,
  DollarSign,
  MapPin,
  Share2,
  ShieldCheck,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle,
  Loader2,
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
              <button className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Share2 className="w-4 h-4 text-gray-600" />
              </button>
              <button className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Bookmark className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 bg-gray-50 rounded-[1.5rem] border border-gray-100 flex items-center justify-center font-black text-2xl text-gray-400">
                      {job.hiringCompany?.[0] || "J"}
                    </div>
                    <div>
                      <h1 className="text-[32px] font-black text-gray-900 leading-[40px] mb-2">
                        {job.jobTitle}
                      </h1>
                      <div className="flex flex-wrap items-center gap-4 text-[14px] font-bold text-gray-500">
                        <span className="flex items-center gap-1.5 hover:text-wise-green transition-colors cursor-pointer">
                          <Building className="w-4 h-4 text-wise-green" />{" "}
                          {job.hiringCompany}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-wise-green" />{" "}
                          {job.jobCity || "Remote"}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-wise-green" />{" "}
                          {formattedDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-wise-green/10 text-dark-green rounded-xl border border-wise-green/20 shrink-0 self-start md:self-auto">
                    <DollarSign className="w-4 h-4 text-wise-green" />
                    <span className="text-[15px] font-black">
                      {formattedSalary}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12 border-y border-gray-50 py-8">
                  <div className="space-y-1">
                    <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest">
                      Industry
                    </p>
                    <p className="text-[16px] font-bold text-gray-900">
                      {job.industry?.join(", ") || "Not Specified"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest">
                      Job Type
                    </p>
                    <p className="text-[16px] font-bold text-gray-900">
                      {job.jobType}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest">
                      Experience
                    </p>
                    <p className="text-[16px] font-bold text-gray-900">
                      {job.minExperience
                        ? `${job.minExperience} Year(s) min`
                        : "No limit"}
                    </p>
                  </div>
                </div>

                <div className="space-y-10">
                  {job.belongingCompany && (
                    <section>
                      <h3 className="text-[20px] font-black text-gray-900 mb-4 leading-[23px]">
                        About the Company
                      </h3>
                      <p className="text-[15px] text-gray-600 font-medium leading-[23px] mb-6">
                        {job.belongingCompany}
                      </p>
                    </section>
                  )}
                  <section>
                    <h3 className="text-[20px] font-black text-gray-900 mb-4 leading-[23px]">
                      Job Description
                    </h3>
                    <p className="text-[15px] text-gray-600 font-medium leading-[23px] whitespace-pre-line">
                      {job.jobDescription || job.description}
                    </p>
                  </section>

                  {job.skills && job.skills.length > 0 && (
                    <section>
                      <h3 className="text-[20px] font-black text-gray-900 mb-4 leading-[23px]">
                        Required Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-4 py-2 rounded-full bg-gray-50 text-[13px] font-bold text-gray-600 border border-gray-100"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {job.regionalLanguages &&
                    job.regionalLanguages.length > 0 && (
                      <section>
                        <h3 className="text-[20px] font-black text-gray-900 mb-4 leading-[23px]">
                          Languages Needed
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {job.regionalLanguages.map((lang) => (
                            <span
                              key={lang}
                              className="px-4 py-2 rounded-full bg-gray-50 text-[13px] font-bold text-gray-600 border border-gray-100"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </section>
                    )}

                  <section>
                    <div className="relative mt-4 group">
                      <div className="relative p-6 rounded-[2rem] bg-gray-50/50 border border-gray-100 flex items-center gap-6 group-hover:border-wise-green/30 transition-all duration-300">
                        <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shrink-0 relative">
                          <MapPin className="w-7 h-7 text-wise-green drop-shadow-sm" />
                          <div className="absolute -top-1.5 -right-1.5 px-2 py-0.5 bg-dark-green text-white text-[8px] font-black uppercase tracking-widest rounded-md shadow-md">
                            HQ
                          </div>
                        </div>

                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-[15px] font-black text-gray-900">
                              Job Location / Office Address
                            </h4>
                            <span className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-tighter rounded-md border border-blue-100">
                              <ShieldCheck className="w-2.5 h-2.5" /> Verified
                            </span>
                          </div>
                          <p className="text-[14px] text-gray-500 font-bold leading-tight line-clamp-1">
                            {job.officeAddress || job.jobCity || "Remote"}
                          </p>
                          <button className="flex items-center gap-1.5 text-[11px] font-black text-wise-green hover:text-dark-green transition-colors uppercase tracking-widest pt-0.5 group/btn">
                            Get Directions{" "}
                            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
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
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-wise-green text-dark-green rounded-xl flex items-center justify-center shadow-lg shadow-wise-green/20">
                        <Zap className="w-5 h-5 fill-current" />
                      </div>
                      <div>
                        <h3 className="text-[16px] font-black leading-tight tracking-tight uppercase text-gray-900">
                          AI Matching
                        </h3>
                        <p className="text-[10px] font-black text-wise-green uppercase tracking-[0.2em]">
                          Analysis Engine v2.0
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* High-Fidelity Radial Gauge - Light Theme */}
                  <div className="relative flex justify-center mb-10 group">
                    <div className="relative w-48 h-48 flex items-center justify-center">
                      {/* Outer Rings */}
                      <div className="absolute inset-0 rounded-full border border-gray-50" />
                      <div className="absolute inset-2 rounded-full border border-gray-50" />

                      <svg className="w-full h-full -rotate-90">
                        <circle
                          cx="96"
                          cy="96"
                          r="82"
                          stroke="currentColor"
                          strokeWidth="1"
                          fill="transparent"
                          className="text-gray-100"
                        />
                        <circle
                          cx="96"
                          cy="96"
                          r="76"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          className="text-gray-50"
                        />
                        <motion.circle
                          cx="96"
                          cy="96"
                          r="76"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray="478"
                          initial={{ strokeDashoffset: 478 }}
                          animate={{
                            strokeDashoffset:
                              478 - (478 * (job.matchScore ?? 0)) / 100,
                          }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="text-wise-green stroke-round drop-shadow-[0_0_8px_rgba(159,232,112,0.4)]"
                        />
                      </svg>

                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 }}
                          className="text-[44px] font-black leading-none tracking-tighter text-gray-900"
                        >
                          {job.matchScore ?? 0}
                          <span className="text-[20px] text-wise-green ml-0.5">
                            %
                          </span>
                        </motion.span>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                          Match Confidence
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 mb-10">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Target className="w-3 h-3 text-blue-600" />
                      </div>
                      <p className="text-[12px] text-gray-500 font-medium leading-relaxed">
                        This match score is computed in real-time based on your
                        skills, experience, and language preferences.
                      </p>
                    </div>
                  </div>

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
                            You must complete your profile and upload a resume before you can apply to this job.
                          </p>
                        </div>
                      </div>

                      <div className="pl-11 space-y-2">
                        <p className="text-[11px] font-black text-amber-800 uppercase tracking-wider">
                          Missing Fields:
                        </p>
                        <ul className="grid grid-cols-1 gap-1.5">
                          {missingFields.map((field) => (
                            <li key={field} className="flex items-center gap-2 text-[12px] text-amber-700 font-bold">
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
                    disabled={isApplying || hasApplied || (isAuthenticated && isCandidate && !isProfileComplete)}
                    className={`w-full h-14 rounded-2xl text-[15px] font-black transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 ${
                      hasApplied
                        ? "bg-wise-green/20 text-dark-green border border-wise-green/30 cursor-default shadow-none pointer-events-none"
                        : isAuthenticated && isCandidate && !isProfileComplete
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none border border-gray-200 pointer-events-none"
                          : "bg-wise-green text-dark-green hover:bg-wise-green/90 shadow-wise-green/20"
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
                    ) : (
                      "Apply with 1-Click"
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

      <LandingFooter />
    </div>
  );
}

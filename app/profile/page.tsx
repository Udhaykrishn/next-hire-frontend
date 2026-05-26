"use client";

import {
  Award,
  Briefcase,
  CheckCircle2,
  Edit2,
  Globe,
  GraduationCap,
  Plus,
  ShieldCheck,
  Target,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { LandingFooter } from "@/components/landing-footer";
import { LandingNavbar } from "@/components/landing-navbar";
import {
  ProfileItemCard,
  ProfileSection,
} from "@/components/profile/profile-components";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import { useProfile } from "@/hooks/use-profile";
import { formatSalaryAmount } from "@/lib/salary";

export default function ProfilePage() {
  const {
    skills,
    experience,
    education,
    certificates,
    basicInfo,
    socialLinks,
    jobPreferences,
    languages,
    handleDeleteExperience,
    handleDeleteEducation,
    handleDeleteCertificate,
    handleDeleteLanguage,
    handleClearJobPreferences,
    handleAddSkill,
    handleDeleteSkill,
    isLoading,
  } = useProfile();

  const [newSkill, setNewSkill] = useState("");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-satoshi">
        <div className="animate-spin rounded-full size-12 border-b-2 border-wise-green"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-satoshi selection:bg-wise-green selection:text-dark-green">
      <LandingNavbar />

      <main className="flex-1 pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-8">
          <ProfileSidebar basicInfo={basicInfo} socialLinks={socialLinks} />

          <div className="lg:col-span-8 space-y-10">
            <ProfileSection
              title="Professional Experience"
              icon={<Briefcase className="size-6" />}
              href="/profile/experience/add"
            >
              {experience.map((exp) => (
                <ProfileItemCard
                  key={exp.id}
                  title={exp.title}
                  subtitle={exp.company}
                  period={exp.period}
                  logo={exp.logo}
                  description={exp.description}
                  location={exp.location}
                  industry={exp.industry}
                  role={exp.role}
                  isCurrent={exp.currentlyWorking}
                  editHref={`/profile/experience/edit/${exp.id}`}
                  onDeleteClick={() => handleDeleteExperience(exp.id)}
                />
              ))}
            </ProfileSection>

            {/* Job Preference Settings */}
            <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm relative group overflow-hidden">
              <div className="absolute top-0 right-0 size-64 bg-wise-green/[0.02] rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-wise-green/[0.04] transition-colors duration-700" />

              <div className="relative">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-wise-green/5 text-wise-green flex items-center justify-center border border-wise-green/10">
                      <Target className="size-6" />
                    </div>
                    <div>
                      <h2 className="text-[20px] font-black text-gray-900 tracking-tight">
                        Job Preferences
                      </h2>
                      <p className="text-[12px] font-bold text-gray-400">
                        Target roles and compensation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {jobPreferences.roles.length > 0 && (
                      <button
                        type="button"
                        onClick={handleClearJobPreferences}
                        className="h-10 px-4 rounded-xl bg-white text-red-500 hover:bg-red-50 transition-all text-[12px] font-black flex items-center gap-2 border border-gray-100 hover:border-red-100"
                      >
                        <Trash2 className="size-3.5" />
                        Clear
                      </button>
                    )}
                    <Link
                      href="/profile/job-preferences/edit"
                      className="h-10 px-5 rounded-xl bg-gray-900 text-white hover:bg-black transition-all text-[12px] font-black flex items-center gap-2 shadow-lg shadow-gray-900/10"
                    >
                      <Edit2 className="size-3.5" />
                      Edit Preferences
                    </Link>
                  </div>
                </div>

                {jobPreferences.roles.length > 0 ? (
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="size-1.5 rounded-full bg-wise-green" />
                          <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">
                            Preferred Job Types
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {jobPreferences.jobTypes.map((type: string) => (
                            <span
                              key={type}
                              className="px-4 py-2 bg-wise-green/5 border border-wise-green/10 rounded-xl text-[13px] font-bold text-wise-green"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="size-1.5 rounded-full bg-gray-300" />
                          <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">
                            Target Roles
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {jobPreferences.roles.map((role: string) => (
                            <span
                              key={role}
                              className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[13px] font-bold text-gray-600 capitalize"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {jobPreferences.minSalary && jobPreferences.maxSalary && (
                      <div className="pt-6 border-t border-gray-50">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="size-1.5 rounded-full bg-wise-green shadow-[0_0_8px_rgba(151,232,123,0.8)]" />
                          <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">
                            Expected Salary
                          </h4>
                        </div>
                        <div className="bg-wise-green/[0.03] rounded-[2rem] p-8 md:p-10 relative overflow-hidden group/salary border border-wise-green/10">
                          <div className="absolute top-0 right-0 size-64 bg-wise-green/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover/salary:bg-wise-green/20 transition-colors duration-700" />
                          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div>
                              <p className="text-[12px] font-black text-wise-green uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="size-2 rounded-full bg-wise-green animate-pulse" />
                                {jobPreferences.salaryFrequency === "hour"
                                  ? "Hourly Compensation Range"
                                  : jobPreferences.salaryFrequency === "month"
                                    ? "Monthly Compensation Range"
                                    : "Annual Compensation Range"}
                              </p>
                              <div className="flex items-baseline gap-3">
                                <span className="text-xl md:text-2xl font-black text-gray-900 tracking-tighter">
                                  {formatSalaryAmount(
                                    jobPreferences.minSalary,
                                    jobPreferences.currency || "USD",
                                    jobPreferences.salaryFormat || "compact",
                                  )}
                                </span>
                                <span className="text-xl md:text-2xl font-black text-gray-400">
                                  to
                                </span>
                                <span className="text-xl md:text-2xl font-black text-gray-900 tracking-tighter">
                                  {formatSalaryAmount(
                                    jobPreferences.maxSalary,
                                    jobPreferences.currency || "USD",
                                    jobPreferences.salaryFormat || "compact",
                                  )}
                                </span>
                                <span className="text-gray-400 font-bold ml-2">
                                  / {jobPreferences.salaryFrequency || "year"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center relative overflow-hidden">
                    {/* Decorative Background Glows */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-32 bg-wise-green/5 rounded-full blur-[40px] pointer-events-none" />

                    <div className="relative group/empty-state">
                      <div className="size-14 rounded-xl bg-gray-50 flex items-center justify-center mb-4 border border-gray-100 relative shadow-sm group-hover/empty-state:border-wise-green/30 transition-all duration-500">
                        <div className="absolute inset-0 bg-wise-green/10 rounded-xl blur-xl opacity-0 group-hover/empty-state:opacity-100 transition-opacity duration-500" />
                        <Target className="size-6 text-gray-300 relative z-10 group-hover/empty-state:text-wise-green group-hover/empty-state:scale-110 transition-all duration-500" />
                      </div>
                    </div>

                    <div className="space-y-1.5 relative z-10 mb-6 max-w-[380px]">
                      <h3 className="text-[16px] font-black text-gray-900 tracking-tight">
                        Personalize Your Journey
                      </h3>
                      <p className="text-[13px] font-bold text-gray-500 leading-relaxed">
                        Define your ideal role and style for better matches.
                      </p>
                    </div>

                    <Link
                      href="/profile/job-preferences/edit"
                      className="group relative"
                    >
                      <div className="relative h-10 px-6 rounded-xl bg-wise-green text-dark-green text-[13px] font-black hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg shadow-wise-green/10">
                        <Plus className="size-3.5" />
                        Setup Preferences
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </section>

            {/* Skills & Expertise */}
            <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm relative group overflow-hidden">
              <div className="absolute top-0 right-0 size-64 bg-wise-green/[0.02] rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-wise-green/[0.04] transition-colors duration-700" />
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-wise-green/5 text-wise-green flex items-center justify-center border border-wise-green/10 group-hover:border-wise-green/30 transition-colors">
                      <Award className="size-6" />
                    </div>
                    <div>
                      <h2 className="text-[20px] font-black text-gray-900 tracking-tight">
                        Skills & Expertise
                      </h2>
                      <p className="text-[12px] font-bold text-gray-400">
                        Technical proficiencies and tools
                      </p>
                    </div>
                  </div>
                  <span className="text-[12px] font-black text-wise-green bg-wise-green/5 px-5 py-2 rounded-full border border-wise-green/10 shadow-sm">
                    {skills.length} Skills
                  </span>
                </div>

                <div className="space-y-8">
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill) => (
                      <div
                        key={skill}
                        className="group/skill flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl hover:border-wise-green/30 hover:bg-wise-green/[0.02] transition-all"
                      >
                        <span className="text-[14px] font-bold text-gray-600 group-hover/skill:text-gray-900">
                          {skill}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteSkill(skill)}
                          className="p-0.5 rounded-md hover:bg-red-50 text-gray-300 hover:text-red-500 transition-all opacity-0 group-hover/skill:opacity-100"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-gray-50">
                    <div className="flex gap-3">
                      <div className="relative flex-1 group">
                        <input
                          type="text"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddSkill(newSkill);
                              setNewSkill("");
                            }
                          }}
                          placeholder="Add a new skill (e.g. Docker, GraphQL)"
                          className="w-full h-12 bg-gray-50 rounded-xl border border-gray-100 px-5 text-[14px] font-bold focus:outline-none focus:border-wise-green transition-colors"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          handleAddSkill(newSkill);
                          setNewSkill("");
                        }}
                        disabled={!newSkill.trim()}
                        className="h-12 px-6 bg-dark-green text-white rounded-xl text-[14px] font-black hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <Plus className="size-4" />
                        Add Skill
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Language Mastery */}
            <ProfileSection
              title="Language Mastery"
              icon={<Globe className="size-6" />}
              href="/profile/language/add"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {languages.map((lang) => (
                  <div
                    key={lang.id}
                    className="p-5 bg-gray-50 border border-gray-100 rounded-[2rem] flex items-center justify-between group hover:border-wise-green/20 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-[18px]">
                        🌐
                      </div>
                      <div>
                        <h4 className="text-[15px] font-black text-gray-900">
                          {lang.name}
                        </h4>
                        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">
                          {lang.level} Proficiency
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/profile/language/edit/${lang.id}`}
                        className="p-2 rounded-xl hover:bg-wise-green/10 text-gray-400 hover:text-wise-green transition-colors"
                      >
                        <Edit2 className="size-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDeleteLanguage(lang.id)}
                        className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </ProfileSection>

            {/* Education History */}
            <ProfileSection
              title="Education"
              icon={<GraduationCap className="size-6" />}
              href="/profile/education/add"
            >
              {education.map((edu) => (
                <ProfileItemCard
                  key={edu.id}
                  title={edu.degree}
                  subtitle={`${edu.school} • ${edu.level}`}
                  period={edu.year}
                  description={edu.specialisation}
                  logo={edu.logo}
                  editHref={`/profile/education/edit/${edu.id}`}
                  onDeleteClick={() => handleDeleteEducation(edu.id)}
                />
              ))}
            </ProfileSection>

            {/* Professional Certifications */}
            <ProfileSection
              title="Certifications"
              icon={<Award className="size-6" />}
              href="/profile/certificate/add"
            >
              {certificates.map((cert) => (
                <ProfileItemCard
                  key={cert.id}
                  title={cert.name}
                  subtitle={cert.issuer}
                  period={cert.date}
                  logo={cert.name.charAt(0)}
                  editHref={`/profile/certificate/edit/${cert.id}`}
                  onDeleteClick={() => handleDeleteCertificate(cert.id)}
                />
              ))}
            </ProfileSection>

            {/* Profile Integrity & Settings */}
            <div className="grid md:grid-cols-2 gap-6">
              <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm group cursor-pointer hover:border-wise-green/30 transition-all md:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="size-12 rounded-2xl bg-wise-green/5 text-wise-green flex items-center justify-center border border-wise-green/10">
                    <ShieldCheck className="size-6" />
                  </div>
                  <h3 className="text-[17px] font-black text-gray-900 tracking-tight">
                    Identity Verification
                  </h3>
                </div>
                <p className="text-[13px] font-bold text-gray-500 leading-relaxed mb-6">
                  Verify your credentials to gain a trusted badge and increase
                  visibility by 3x. Your information is securely encrypted and
                  never shared without consent.
                </p>
                <div className="flex items-center text-wise-green font-black text-[13px] gap-2">
                  Complete Verification <CheckCircle2 className="size-4" />
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}

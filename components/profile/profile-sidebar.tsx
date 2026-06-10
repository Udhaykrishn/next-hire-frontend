"use client";

import {
  Briefcase,
  ChevronRight,
  Edit2,
  ExternalLink,
  FileText,
  GitBranch,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type {
  BasicInfo,
  SocialLinks,
} from "@/features/profile/types/profile-context.types";
import { useProfile } from "@/hooks/use-profile";
import { ProfileAvatarModal } from "./profile-avatar-modal";
import { ResumeUpload } from "./resume-upload";

export const ProfileSidebar = ({
  basicInfo,
  socialLinks,
}: {
  basicInfo: BasicInfo;
  socialLinks: SocialLinks;
}) => {
  const {
    handleUploadAvatar,
    handleDeleteAvatar,
    isUploadingAvatar,
    isDeletingAvatar,
  } = useProfile();

  return (
    <aside className="lg:col-span-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-wise-green/20 to-transparent" />

          <Link
            href="/profile/edit/basic"
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-wise-green text-near-black hover:bg-near-black hover:text-wise-green flex items-center justify-center shadow-lg shadow-wise-green/20 transition-all hover:scale-110 z-20 group/edit"
            title="Edit Profile"
          >
            <Edit2 className="w-4 h-4 group-hover/edit:rotate-12 transition-transform" />
          </Link>

          <div className="relative pt-4">
            <div className="w-24 h-24 rounded-[2rem] bg-gray-100 mx-auto border-4 border-white shadow-xl flex items-center justify-center overflow-hidden mb-6 relative">
              {isUploadingAvatar || isDeletingAvatar ? (
                <div className="absolute inset-0 bg-black/45 flex items-center justify-center z-10 backdrop-blur-[1px]">
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </div>
              ) : null}
              {basicInfo.avatar ? (
                <Image
                  unoptimized
                  src={basicInfo.avatar}
                  alt={basicInfo.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-wise-green/10 text-wise-green text-3xl font-black flex items-center justify-center">
                  {basicInfo.name
                    ? basicInfo.name.charAt(0).toUpperCase()
                    : "U"}
                </div>
              )}
            </div>
            <h2 className="text-[24px] font-black text-gray-900 leading-none mb-2">
              {basicInfo.name}
            </h2>
            <p className="text-[14px] font-bold text-wise-green mb-4">
              {basicInfo.tagline}
            </p>
            <div className="flex items-center justify-center gap-2 text-[12px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 w-fit mx-auto px-4 py-1.5 rounded-full border border-gray-100">
              <MapPin className="w-3.5 h-3.5" />
              {basicInfo.location}
            </div>
            {basicInfo.bio && (
              <p className="mt-3 text-[12px] font-medium text-gray-500 leading-relaxed line-clamp-3 px-2">
                {basicInfo.bio}
              </p>
            )}
            <ProfileAvatarModal
              avatarUrl={basicInfo.avatar}
              name={basicInfo.name}
              handleUploadAvatar={handleUploadAvatar}
              handleDeleteAvatar={handleDeleteAvatar}
              isUploading={isUploadingAvatar}
              isDeleting={isDeletingAvatar}
            />
          </div>
        </div>

        {/* Contact & Social Quick Info */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm space-y-8 mt-6">
          <div className="space-y-4">
            <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-widest">
              Direct Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[14px] font-bold text-gray-600 bg-gray-50 p-3 rounded-2xl border border-gray-50">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-gray-100">
                  <Mail className="w-4 h-4 text-wise-green" />
                </div>
                <span className="truncate">
                  {basicInfo.email || "No email set"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[14px] font-bold text-gray-600 bg-gray-50 p-3 rounded-2xl border border-gray-50">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-gray-100">
                  <Phone className="w-4 h-4 text-wise-green" />
                </div>
                <span>{basicInfo.phone || "No phone set"}</span>
              </div>
              {basicInfo.experience && (
                <div className="flex items-start gap-3 text-[14px] font-bold text-gray-600 bg-gray-50 p-3 rounded-2xl border border-gray-50">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-gray-100 shrink-0">
                    <Briefcase className="w-4 h-4 text-wise-green" />
                  </div>
                  <span className="text-[13px] leading-snug">
                    {basicInfo.experience}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-widest">
              Professional Links
            </h4>
            <div className="grid grid-cols-1 gap-3">
              <a
                href={socialLinks.linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-50 transition-all group ${socialLinks.linkedin ? "hover:border-wise-green/30 hover:bg-wise-green/5" : "opacity-50 cursor-not-allowed"}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-gray-100 group-hover:border-wise-green/20">
                    <ExternalLink className="w-4 h-4 text-wise-green" />
                  </div>
                  <span className="text-[14px] font-bold text-gray-700">
                    LinkedIn Profile
                  </span>
                </div>
                {socialLinks.linkedin && (
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:translate-x-0.5 transition-transform" />
                )}
              </a>
              <a
                href={socialLinks.portfolio || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-50 transition-all group ${socialLinks.portfolio ? "hover:border-wise-green/30 hover:bg-wise-green/5" : "opacity-50 cursor-not-allowed"}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-gray-100 group-hover:border-wise-green/20">
                    <Globe className="w-4 h-4 text-wise-green" />
                  </div>
                  <span className="text-[14px] font-bold text-gray-700">
                    Personal Portfolio
                  </span>
                </div>
                {socialLinks.portfolio && (
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:translate-x-0.5 transition-transform" />
                )}
              </a>
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-50 transition-all group hover:border-wise-green/30 hover:bg-wise-green/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-gray-100 group-hover:border-wise-green/20">
                      <GitBranch className="w-4 h-4 text-wise-green" />
                    </div>
                    <span className="text-[14px] font-bold text-gray-700">
                      GitHub Profile
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Resume Vault Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm relative overflow-hidden group"
      >
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-wise-green/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-wise-green/5 flex items-center justify-center border border-wise-green/10">
              <FileText className="w-6 h-6 text-wise-green" />
            </div>
            <span className="text-[11px] font-black text-wise-green bg-wise-green/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Active
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-[18px] font-black text-gray-900 tracking-tight">
              Resume Vault
            </h3>
            <p className="text-[13px] font-bold text-gray-400 leading-relaxed">
              Your resume is stored securely and ready for recruiter review.
            </p>
          </div>

          <ResumeUpload />
        </div>
      </motion.div>
    </aside>
  );
};

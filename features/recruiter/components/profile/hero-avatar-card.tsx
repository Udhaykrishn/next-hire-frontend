import { motion } from "framer-motion";
import { Mail, Phone, ShieldCheck } from "lucide-react";
import type { RecruiterFormValues } from "@/features/recruiter/hooks/use-recruiter-profile";
import type { RecruiterProfile } from "@/features/recruiter/types/recruiter.types";
import { ProfileAvatarModal } from "@/components/profile/profile-avatar-modal";

export function HeroAvatarCard({
  formData,
  recruiterProfile,
  isUploadingAvatar,
  handleUploadAvatar,
  isDeletingAvatar,
  handleDeleteAvatar,
}: {
  formData: RecruiterFormValues;
  recruiterProfile: RecruiterProfile | null;
  isUploadingAvatar: boolean;
  handleUploadAvatar: (file: File) => Promise<void>;
  isDeletingAvatar: boolean;
  handleDeleteAvatar: () => Promise<void>;
}) {
  const avatarUrl = recruiterProfile?.profile_url?.url || "";
  const initials = (formData.name || "R")
    .split(" ")
    .map((w: string) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-7 flex flex-col sm:flex-row items-center sm:items-start gap-6"
    >
      <div className="relative group shrink-0 flex flex-col items-center">
        <div className="w-24 h-24 rounded-[1.5rem] bg-near-black text-white flex items-center justify-center font-black text-3xl overflow-hidden border-4 border-white shadow-xl ring-2 ring-gray-100">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={formData.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <div className="-mt-1">
          <ProfileAvatarModal
            avatarUrl={avatarUrl}
            name={formData.name || "Recruiter"}
            handleUploadAvatar={handleUploadAvatar}
            handleDeleteAvatar={handleDeleteAvatar}
            isUploading={isUploadingAvatar}
            isDeleting={isDeletingAvatar}
          />
        </div>
      </div>

      <div className="flex-1 text-center sm:text-left flex flex-col justify-center">
        <h2 className="text-[26px] font-black text-near-black tracking-tight leading-none">
          {formData.name || "Your Name"}
        </h2>
        <p className="text-[14px] font-bold text-wise-green mt-1">
          {formData.companyRole || "Recruiter"}
        </p>
        <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
          {formData.email && (
            <span className="flex items-center gap-1.5 text-[12px] font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <Mail className="w-3 h-3" />
              {formData.email}
            </span>
          )}
          {formData.phone && (
            <span className="flex items-center gap-1.5 text-[12px] font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <Phone className="w-3 h-3" />
              {formData.phone}
            </span>
          )}
          {recruiterProfile?.is_verified_company && (
            <span className="flex items-center gap-1.5 text-[12px] font-black text-wise-green bg-wise-green/10 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-3 h-3" />
              Verified
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

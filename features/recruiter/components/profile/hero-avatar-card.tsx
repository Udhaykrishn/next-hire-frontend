import { motion } from "framer-motion";
import { Camera, Loader2, Mail, Phone, ShieldCheck } from "lucide-react";
import { useRef } from "react";
import type { RecruiterFormValues } from "@/features/recruiter/hooks/use-recruiter-profile";
import type { RecruiterProfile } from "@/features/recruiter/types/recruiter.types";

export function HeroAvatarCard({
  formData,
  recruiterProfile,
  isUploadingAvatar,
  handleUploadAvatar,
}: {
  formData: RecruiterFormValues;
  recruiterProfile: RecruiterProfile | null;
  isUploadingAvatar: boolean;
  handleUploadAvatar: (file: File) => void;
}) {
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const avatarUrl = recruiterProfile?.profile_url?.url;
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
      <div className="relative group shrink-0">
        <div className="w-24 h-24 rounded-[1.5rem] bg-near-black text-white flex items-center justify-center font-black text-3xl overflow-hidden border-4 border-white shadow-xl ring-2 ring-gray-100">
          {isUploadingAvatar ? (
            <Loader2 className="w-6 h-6 animate-spin text-wise-green" />
          ) : avatarUrl ? (
            <img
              src={avatarUrl}
              alt={formData.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <button
          type="button"
          onClick={() => avatarInputRef.current?.click()}
          disabled={isUploadingAvatar}
          className="absolute -bottom-2 -right-2 w-8 h-8 bg-wise-green text-near-black rounded-full flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform disabled:opacity-50"
          title="Change photo"
        >
          <Camera className="w-3.5 h-3.5" />
        </button>
        <input
          ref={avatarInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUploadAvatar(file);
            e.target.value = "";
          }}
        />
      </div>

      <div className="flex-1 text-center sm:text-left">
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

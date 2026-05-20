import {
  Camera,
  ChevronRight,
  Edit2,
  ExternalLink,
  FileText,
  Globe,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ResumeUpload } from "./resume-upload";

export const ProfileSidebar = ({
  basicInfo,
  socialLinks,
}: {
  basicInfo: {
    name: string;
    location: string;
    tagline: string;
    avatar: string;
    email: string;
    phone: string;
  };
  socialLinks: { linkedin: string; portfolio: string; github: string };
}) => {
  const _handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`Uploading ${file.name}... (Simulated)`);
    }
  };

  return (
    <aside className="lg:col-span-4 space-y-6">
      {/* Core Profile Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-wise-green/20 to-transparent" />
          <div className="relative pt-4">
            <div className="w-24 h-24 rounded-[2rem] bg-gray-100 mx-auto border-4 border-white shadow-xl flex items-center justify-center overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-500 relative cursor-pointer">
              <Avatar className="w-full h-full rounded-none">
                <AvatarImage
                  src={basicInfo.avatar}
                  alt={basicInfo.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-wise-green/10 text-wise-green text-xl font-black">
                  {basicInfo.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <Link
              href="/profile/edit/basic"
              className="absolute top-4 right-0 px-4 py-2 rounded-2xl bg-white/80 backdrop-blur-md border border-white/20 shadow-sm text-[12px] font-black text-gray-400 hover:text-wise-green flex items-center gap-2 transition-all group/edit"
            >
              <Edit2 className="w-3.5 h-3.5 group-hover/edit:rotate-12 transition-transform" />
              Edit Profile
            </Link>
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

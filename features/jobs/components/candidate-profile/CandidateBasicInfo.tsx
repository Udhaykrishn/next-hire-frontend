import {
  Briefcase,
  CheckCircle,
  GitBranch,
  Globe,
  Link,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import Image from "next/image";

export interface CandidateProfileData {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  experience?: string;
  badge?: boolean;
  role_of_title?: string;
  social_link?: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  languages?: Array<{ name: string; proficiency: string }>;
  bio?: string;
  about?: string;
  skills?: string[];
}

interface CandidateBasicInfoProps {
  profile: CandidateProfileData;
  profileImage: string | null;
}

export function CandidateBasicInfo({
  profile,
  profileImage,
}: CandidateBasicInfoProps) {
  return (
    <div className="bg-[#ffffff] p-8 rounded-[20px] border border-[rgba(14,15,12,0.08)] shadow-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-[#054d28]/5 to-[#054d28]/10"></div>

      <div className="flex flex-col items-center text-center relative z-10 pt-4">
        <div className="size-32 rounded-full bg-[#f4f6f3] overflow-hidden border-4 border-[#ffffff] shadow-md mb-5">
          {profileImage ? (
            <Image
              src={profileImage}
              alt={profile.name || "Profile"}
              width={128}
              height={128}
              unoptimized
              className="size-full object-cover"
            />
          ) : (
            <div className="size-full flex items-center justify-center text-[#868685]">
              <User className="size-12" />
            </div>
          )}
        </div>
        <div className="flex items-center justify-center gap-2 mb-1">
          <h1 className="text-[26px] font-[800] text-[#0e0f0c]">
            {profile.name}
          </h1>
          {profile.badge && (
            <CheckCircle className="size-5 text-[#054d28] fill-[#054d28]/10" />
          )}
        </div>
        <p className="text-[16px] font-[500] text-[#054d28] mb-6 px-4 py-1 bg-[#054d28]/5 rounded-full inline-block">
          {profile.role_of_title || "Candidate"}
        </p>

        <div className="w-full flex flex-col gap-3 text-left border-t border-[rgba(14,15,12,0.08)] pt-6">
          <div className="flex items-center gap-3 text-[14px] font-[500] text-[#454745] group">
            <div className="size-8 rounded-full bg-[#f4f6f3] flex items-center justify-center group-hover:bg-[#054d28]/10 transition-colors">
              <Mail className="size-4 text-[#868685] group-hover:text-[#054d28]" />
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="truncate hover:text-[#054d28] transition-colors"
            >
              {profile.email}
            </a>
          </div>

          {profile.phone && (
            <div className="flex items-center gap-3 text-[14px] font-[500] text-[#454745] group">
              <div className="size-8 rounded-full bg-[#f4f6f3] flex items-center justify-center group-hover:bg-[#054d28]/10 transition-colors">
                <Phone className="size-4 text-[#868685] group-hover:text-[#054d28]" />
              </div>
              <a
                href={`tel:${profile.phone}`}
                className="hover:text-[#054d28] transition-colors"
              >
                {profile.phone}
              </a>
            </div>
          )}

          {profile.location && (
            <div className="flex items-center gap-3 text-[14px] font-[500] text-[#454745] group">
              <div className="size-8 rounded-full bg-[#f4f6f3] flex items-center justify-center group-hover:bg-[#054d28]/10 transition-colors">
                <MapPin className="size-4 text-[#868685] group-hover:text-[#054d28]" />
              </div>
              <span className="truncate">{profile.location}</span>
            </div>
          )}

          {profile.experience && (
            <div className="flex items-center gap-3 text-[14px] font-[500] text-[#454745] group">
              <div className="size-8 rounded-full bg-[#f4f6f3] flex items-center justify-center group-hover:bg-[#054d28]/10 transition-colors">
                <Briefcase className="size-4 text-[#868685] group-hover:text-[#054d28]" />
              </div>
              <span className="truncate">{profile.experience} Experience</span>
            </div>
          )}
        </div>

        {profile.social_link &&
          (profile.social_link.linkedin ||
            profile.social_link.github ||
            profile.social_link.portfolio) && (
            <div className="w-full flex justify-center gap-4 mt-6 pt-6 border-t border-[rgba(14,15,12,0.08)]">
              {profile.social_link.linkedin && (
                <a
                  href={profile.social_link.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="size-10 rounded-full bg-[#f4f6f3] flex items-center justify-center hover:bg-[#054d28] hover:text-white text-[#868685] transition-all"
                >
                  <Link className="size-5" />
                </a>
              )}
              {profile.social_link.github && (
                <a
                  href={profile.social_link.github}
                  target="_blank"
                  rel="noreferrer"
                  className="size-10 rounded-full bg-[#f4f6f3] flex items-center justify-center hover:bg-[#054d28] hover:text-white text-[#868685] transition-all"
                >
                  <GitBranch className="size-5" />
                </a>
              )}
              {profile.social_link.portfolio && (
                <a
                  href={profile.social_link.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="size-10 rounded-full bg-[#f4f6f3] flex items-center justify-center hover:bg-[#054d28] hover:text-white text-[#868685] transition-all"
                >
                  <Globe className="size-5" />
                </a>
              )}
            </div>
          )}
      </div>
    </div>
  );
}

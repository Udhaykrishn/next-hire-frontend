export type ProfileExperience = {
  id: string;
  title: string;
  role?: string;
  company: string;
  period: string;
  startDate?: Date;
  endDate?: Date;
  description: string;
  logo: string;
  location?: string;
  skills?: string[];
  industry?: string;
  employmentType?: string;
  noticePeriod?: string;
  currentlyWorking?: boolean;
};

export type ProfileEducation = {
  id: string;
  level: string;
  degree: string;
  specialisation: string;
  school: string;
  year: string;
  startDate?: Date;
  endDate?: Date;
  logo: string;
};

export type ProfileCertificate = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  issueDate?: Date;
};

export type ProfileLanguage = {
  id: string;
  name: string;
  level: string;
};

export type BasicInfo = {
  name: string;
  location: string;
  tagline: string;
  avatar: string;
  email: string;
  phone: string;
  cinNumber?: string;
  isCompanyVerified?: boolean;
};

export type SocialLinks = {
  linkedin: string;
  portfolio: string;
  github: string;
};

export type JobPreferences = {
  jobTypes: string[];
  roles: string[];
  workStyles: string[];
  minSalary: string;
  maxSalary: string;
};

export interface ProfileContextType {
  skills: string[];
  experience: ProfileExperience[];
  education: ProfileEducation[];
  certificates: ProfileCertificate[];
  basicInfo: BasicInfo;
  socialLinks: SocialLinks;
  jobPreferences: JobPreferences;
  languages: ProfileLanguage[];
  isLoading: boolean;
  handleAddExperience: (
    data: FormData,
    startDate: Date | undefined,
    endDate?: Date | undefined,
  ) => void;
  handleUpdateExperience: (
    id: string,
    data: FormData,
    startDate: Date | undefined,
    endDate?: Date | undefined,
  ) => void;
  handleDeleteExperience: (id: string) => void;
  handleAddEducation: (
    data: FormData,
    start: Date | undefined,
    end: Date | undefined,
  ) => void;
  handleUpdateEducation: (
    id: string,
    data: FormData,
    start: Date | undefined,
    end: Date | undefined,
  ) => void;
  handleDeleteEducation: (id: string) => void;
  handleAddCertificate: (data: FormData, date: Date | undefined) => void;
  handleUpdateCertificate: (
    id: string,
    data: FormData,
    date: Date | undefined,
  ) => void;
  handleDeleteCertificate: (id: string) => void;
  handleUpdateProfile: (data: FormData) => void;
  handleUpdateJobPreferences: (data: FormData) => void;
  handleClearJobPreferences: () => void;
  handleAddLanguage: (data: FormData) => void;
  handleUpdateLanguage: (id: string, data: FormData) => void;
  handleDeleteLanguage: (id: string) => void;
  handleAddSkill: (skill: string) => void;
  handleDeleteSkill: (skill: string) => void;
  handleUpdateCin: (cin: string) => void;
}

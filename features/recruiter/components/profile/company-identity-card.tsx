import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { Briefcase, Building2, Globe, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type {
  EditSection,
  RecruiterFormValues,
} from "@/features/recruiter/hooks/use-recruiter-profile";
import { FieldView } from "./field-view";
import { SectionCard } from "./section-card";

export function CompanyIdentityCard({
  formData,
  setFormData,
  isEditingCompany,
  editSection,
  startEdit,
}: {
  formData: RecruiterFormValues;
  setFormData: React.Dispatch<React.SetStateAction<RecruiterFormValues>>;
  isEditingCompany: boolean;
  editSection: EditSection;
  startEdit: (section: EditSection) => void;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <SectionCard
        title="Company Identity"
        subtitle="Public branding and corporate information"
        icon={<Building2 className="size-5" />}
        sectionKey="company"
        editSection={editSection}
        onEdit={startEdit}
        isActive={isEditingCompany}
      >
        <AnimatePresence mode="wait">
          {isEditingCompany ? (
            <m.div
              key="company-edit"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Company Role / Title
                  </Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <Input
                      id="recruiter-role-input"
                      value={formData.companyRole}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          companyRole: e.target.value,
                        }))
                      }
                      className="h-12 bg-gray-50 border-gray-200 rounded-xl font-bold text-[15px] pl-10 focus-visible:ring-wise-green focus-visible:border-wise-green"
                      placeholder="e.g. HR Manager"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Company Website
                  </Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <Input
                      id="recruiter-website-input"
                      value={formData.websiteLink}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          websiteLink: e.target.value,
                        }))
                      }
                      className="h-12 bg-gray-50 border-gray-200 rounded-xl font-bold text-[15px] pl-10 focus-visible:ring-wise-green focus-visible:border-wise-green"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Industry / Category
                </Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <Input
                    id="recruiter-category-input"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        category: e.target.value,
                      }))
                    }
                    className="h-12 bg-gray-50 border-gray-200 rounded-xl font-bold text-[15px] pl-10 focus-visible:ring-wise-green focus-visible:border-wise-green"
                    placeholder="e.g. Technology, FinTech"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Company Description
                </Label>
                <Textarea
                  id="recruiter-description-input"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                  className="bg-gray-50 border-gray-200 rounded-xl font-bold text-[15px] min-h-[110px] resize-none focus-visible:ring-wise-green focus-visible:border-wise-green"
                  placeholder="Brief summary of your company, vision, and products…"
                />
              </div>
            </m.div>
          ) : (
            <m.div
              key="company-view"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FieldView
                  label="Company Role"
                  value={formData.companyRole}
                  icon={<Briefcase className="size-4" />}
                  placeholder="Not set"
                />
                <FieldView
                  label="Website"
                  value={formData.websiteLink}
                  icon={<Globe className="size-4" />}
                  placeholder="Not set"
                />
                <FieldView
                  label="Industry"
                  value={formData.category}
                  icon={<Tag className="size-4" />}
                  placeholder="Not set"
                />
              </div>
              {formData.description && (
                <div className="space-y-1.5 pt-1 border-t border-gray-50">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-3">
                    Description
                  </p>
                  <p className="text-[14px] font-medium text-gray-600 leading-relaxed">
                    {formData.description}
                  </p>
                </div>
              )}
              {!formData.companyRole &&
                !formData.websiteLink &&
                !formData.category &&
                !formData.description && (
                  <p className="text-[13px] font-bold text-gray-300 italic text-center py-3">
                    No company details added yet — click Edit to get started.
                  </p>
                )}
            </m.div>
          )}
        </AnimatePresence>
      </SectionCard>
    </m.div>
  );
}

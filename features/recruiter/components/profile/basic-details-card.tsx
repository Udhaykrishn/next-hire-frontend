import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type {
  EditSection,
  RecruiterFormValues,
} from "@/features/recruiter/hooks/use-recruiter-profile";
import { FieldView } from "./field-view";
import { SectionCard } from "./section-card";

export function BasicDetailsCard({
  formData,
  setFormData,
  isEditingBasic,
  editSection,
  startEdit,
}: {
  formData: RecruiterFormValues;
  setFormData: React.Dispatch<React.SetStateAction<RecruiterFormValues>>;
  isEditingBasic: boolean;
  editSection: EditSection;
  startEdit: (section: EditSection) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <SectionCard
        title="Basic Details"
        subtitle="Personal identification information"
        icon={<User className="w-5 h-5" />}
        sectionKey="basic"
        editSection={editSection}
        onEdit={startEdit}
        isActive={isEditingBasic}
      >
        <AnimatePresence mode="wait">
          {isEditingBasic ? (
            <motion.div
              key="basic-edit"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Full Name *
                </Label>
                <Input
                  id="recruiter-name-input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
                  className="h-12 bg-gray-50 border-gray-200 rounded-xl font-bold text-[15px] focus-visible:ring-wise-green focus-visible:border-wise-green"
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Email Address
                </Label>
                <Input
                  value={formData.email}
                  disabled
                  className="h-12 bg-gray-50 border-gray-100 rounded-xl font-bold text-[15px] opacity-50 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Mobile Contact *
                </Label>
                <div className="flex gap-2">
                  <div className="h-12 px-4 bg-gray-100 flex items-center rounded-xl font-black text-gray-400 text-[13px] border border-gray-100 shrink-0">
                    +91
                  </div>
                  <Input
                    id="recruiter-phone-input"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        phone: e.target.value,
                      }))
                    }
                    className="h-12 bg-gray-50 border-gray-200 rounded-xl font-bold text-[15px] flex-1 focus-visible:ring-wise-green focus-visible:border-wise-green"
                    placeholder="9876543210"
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="basic-view"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <FieldView label="Full Name" value={formData.name} />
              <FieldView
                label="Email Address"
                value={formData.email}
                icon={<Mail className="w-4 h-4" />}
              />
              <FieldView
                label="Mobile Contact"
                value={formData.phone ? `+91 ${formData.phone}` : null}
                icon={<Phone className="w-4 h-4" />}
                placeholder="Not provided"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </SectionCard>
    </motion.div>
  );
}

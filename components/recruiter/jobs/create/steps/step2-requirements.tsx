"use client";

import { m } from "framer-motion";
import { Info, Plus, X } from "lucide-react";
import type React from "react";
import {
  DEGREE_OPTIONS,
  INDUSTRY_OPTIONS,
  REGIONAL_LANGUAGES,
} from "@/app/recruiter/jobs/create/new/constants";
import type { JobFormData } from "@/app/recruiter/jobs/create/new/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/ui/rich-text-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FieldError } from "../ui/field-error";
import { MultiSelectField } from "../ui/multi-select-field";

interface Step2RequirementsProps {
  formData: JobFormData;
  setFormData: React.Dispatch<React.SetStateAction<JobFormData>>;
  errors: Record<string, string>;
  activeRequirementTab: string;
  setActiveRequirementTab: (tab: string) => void;
}

export const Step2Requirements = ({
  formData,
  setFormData,
  errors,
  activeRequirementTab,
  setActiveRequirementTab,
}: Step2RequirementsProps) => {
  return (
    <m.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="gap-y-10"
    >
      <div className="gap-y-1 text-center">
        <p className="text-gray-400 text-[14px] font-medium">
          Define candidate requirements and narrative.
        </p>
      </div>
      <div className="gap-y-10">
        <div className="bg-white rounded-[24px] border border-gray-200 overflow-hidden shadow-sm">
          <div className="bg-slate-50 border-b border-gray-200 px-8 py-5">
            <h3 className="text-[16px] font-black text-near-black">
              Basic Requirements
            </h3>
            <p className="text-[13px] font-medium text-gray-500 mt-1">
              We'll use these requirement details to make your job visible to
              the right candidates.
            </p>
          </div>

          <div className="p-8 gap-y-8">
            <div className="gap-y-4" id="field-education">
              <Label className="text-[14px] font-black text-near-black">
                Minimum Education <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.education}
                onValueChange={(v) =>
                  setFormData((prev) => ({ ...prev, education: v || "" }))
                }
              >
                <SelectTrigger className="w-full h-12 rounded-xl border-gray-100 bg-white shadow-sm font-bold text-[14px]">
                  <SelectValue placeholder="Select education" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "10th Or Below 10th",
                    "12th Pass",
                    "Diploma",
                    "Graduate",
                    "Post Graduate",
                  ].map((e) => (
                    <SelectItem key={e} value={e} className="font-bold">
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError name="education" errors={errors} />
            </div>

            <div className="gap-y-4" id="field-englishLevel">
              <Label className="text-[14px] font-black text-near-black">
                English level required <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.englishLevel}
                onValueChange={(v) =>
                  setFormData((prev) => ({ ...prev, englishLevel: v || "" }))
                }
              >
                <SelectTrigger className="w-full h-12 rounded-xl border-gray-100 bg-white shadow-sm font-bold text-[14px]">
                  <SelectValue placeholder="Select English level" />
                </SelectTrigger>
                <SelectContent>
                  {["No English", "Basic English", "Good English"].map((e) => (
                    <SelectItem key={e} value={e} className="font-bold">
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError name="englishLevel" errors={errors} />
            </div>

            <div className="gap-y-4" id="field-experienceType">
              <Label className="text-[14px] font-black text-near-black">
                Total experience required{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.experience}
                onValueChange={(v) =>
                  setFormData((prev) => ({
                    ...prev,
                    experience: v || "",
                    experienceType: v || "",
                  }))
                }
              >
                <SelectTrigger className="w-full h-12 rounded-xl border-gray-100 bg-white shadow-sm font-bold text-[14px]">
                  <SelectValue placeholder="Select experience type" />
                </SelectTrigger>
                <SelectContent>
                  {["Fresher", "Experienced Only", "Both"].map((e) => (
                    <SelectItem key={e} value={e} className="font-bold">
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError name="experience" errors={errors} />
            </div>

            {formData.experience === "Experienced Only" && (
              <div
                className="gap-y-4 pt-4 border-t border-gray-100"
                id="field-minExperience"
              >
                <Label className="text-[14px] font-black text-near-black">
                  Minimum experience <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.minExperience}
                  onValueChange={(v) =>
                    setFormData((prev) => ({ ...prev, minExperience: v || "" }))
                  }
                >
                  <SelectTrigger className="w-full h-12 rounded-xl border-gray-100 bg-white shadow-sm font-bold text-[14px]">
                    <SelectValue placeholder="Select min experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "6 Months",
                      "1 Year",
                      "2 Years",
                      "3 Years",
                      "5 Years",
                      "10 Years",
                    ].map((e) => (
                      <SelectItem key={e} value={e} className="font-bold">
                        {e}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError name="minExperience" errors={errors} />
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-[24px] border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-8 gap-y-8">
            <div className="gap-y-3">
              <h3 className="text-[16px] font-black text-near-black">
                Additional Requirements (Optional)
              </h3>
              <p className="text-[13px] font-medium text-gray-500">
                Add additional requirement so that we can help you find the
                right candidates.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                {[
                  "Industry",
                  formData.education === "Diploma" ||
                  formData.education === "Graduate" ||
                  formData.education === "Post Graduate"
                    ? "Degree / Specialization"
                    : null,
                  "Gender",
                  "Age",
                  "Regional Languages",
                  "Skills",
                ]
                  .filter(Boolean)
                  .map((tab) => (
                    <button
                      key={tab as string}
                      type="button"
                      onClick={() =>
                        setActiveRequirementTab(
                          activeRequirementTab === tab ? "" : (tab as string),
                        )
                      }
                      className={cn(
                        "px-4 py-2 rounded-full text-[13px] font-bold border transition-all flex items-center gap-2",
                        activeRequirementTab === tab
                          ? "bg-wise-green text-near-black border-wise-green shadow-sm"
                          : "bg-white border-gray-300 text-gray-600 hover:border-gray-400",
                      )}
                    >
                      {tab}
                      {activeRequirementTab === tab ? (
                        <X className="size-3.5" />
                      ) : (
                        <Plus className="size-3.5" />
                      )}
                    </button>
                  ))}
              </div>
            </div>

            <div
              className={cn(
                "transition-all duration-500 ease-in-out overflow-hidden",
                activeRequirementTab
                  ? "min-h-[400px] opacity-100"
                  : "min-h-0 opacity-0",
              )}
            >
              {activeRequirementTab === "Industry" && (
                <div className="gap-y-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[14px] font-black text-near-black flex items-center gap-2">
                      Previous industry experience
                    </h4>
                    <button
                      type="button"
                      onClick={() => setActiveRequirementTab("")}
                    >
                      <X className="size-4 text-gray-400" />
                    </button>
                  </div>
                  <p className="text-[12px] font-medium text-gray-500 -mt-4">
                    Add industries in which candidates should have prior
                    experience. Max 10.
                  </p>
                  <MultiSelectField
                    options={INDUSTRY_OPTIONS}
                    selected={formData.industry || []}
                    onChange={(vals) =>
                      setFormData((prev) => ({ ...prev, industry: vals }))
                    }
                    placeholder="Select industry..."
                    label="Industry Experience"
                  />
                </div>
              )}

              {activeRequirementTab === "Degree / Specialization" && (
                <div className="gap-y-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[14px] font-black text-near-black flex items-center gap-2">
                      Degree / specialization
                    </h4>
                    <button
                      type="button"
                      onClick={() => setActiveRequirementTab("")}
                    >
                      <X className="size-4 text-gray-400" />
                    </button>
                  </div>
                  <p className="text-[12px] font-medium text-gray-500 -mt-4">
                    Specify the educational background needed. Max 10.
                  </p>
                  <MultiSelectField
                    options={DEGREE_OPTIONS}
                    selected={formData.degreeSpecialization || []}
                    onChange={(vals) =>
                      setFormData((prev) => ({
                        ...prev,
                        degreeSpecialization: vals,
                      }))
                    }
                    placeholder="Select degree or specialization..."
                    label="Degree Preference"
                  />
                </div>
              )}

              {activeRequirementTab === "Gender" && (
                <div className="gap-y-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[14px] font-black text-near-black flex items-center gap-2">
                      Gender <Info className="size-3.5 text-gray-400" />
                    </h4>
                    <button
                      type="button"
                      onClick={() => setActiveRequirementTab("")}
                    >
                      <X className="size-4 text-gray-400" />
                    </button>
                  </div>
                  <div className="gap-y-4" id="field-gender">
                    <Label className="text-[14px] font-black text-near-black">
                      Gender preference <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(v) =>
                        setFormData((prev) => ({ ...prev, gender: v || "" }))
                      }
                    >
                      <SelectTrigger
                        className={cn(
                          "w-full h-12 rounded-xl border-gray-100 bg-white shadow-sm font-bold text-[14px]",
                          errors.gender && "border-red-200 bg-red-50",
                        )}
                      >
                        <SelectValue placeholder="Select gender preference" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Any", "Male Only", "Female Only"].map((g) => (
                          <SelectItem key={g} value={g} className="font-bold">
                            {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError name="gender" errors={errors} />
                  </div>
                </div>
              )}

              {activeRequirementTab === "Age" && (
                <div className="gap-y-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[14px] font-black text-near-black flex items-center gap-2">
                      Age (in years) <Info className="size-3.5 text-gray-400" />
                    </h4>
                    <button
                      type="button"
                      onClick={() => setActiveRequirementTab("")}
                    >
                      <X className="size-4 text-gray-400" />
                    </button>
                  </div>
                  <div className="gap-y-4" id="field-minAge">
                    <Label className="text-[14px] font-black text-near-black">
                      Age Range (in years){" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Input
                          placeholder="18"
                          className={cn(
                            "h-12 border-gray-300 rounded-xl font-medium text-center",
                            errors.minAge && "border-red-200 bg-red-50",
                          )}
                          value={formData.minAge}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              minAge: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <span className="text-[13px] font-bold text-gray-400">
                        to
                      </span>
                      <div className="flex-1">
                        <Input
                          placeholder="60"
                          className={cn(
                            "h-12 border-gray-300 rounded-xl font-medium text-center",
                            errors.maxAge && "border-red-200 bg-red-50",
                          )}
                          value={formData.maxAge}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              maxAge: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <FieldError name="minAge" errors={errors} />
                    <FieldError name="maxAge" errors={errors} />
                  </div>
                </div>
              )}

              {activeRequirementTab === "Regional Languages" && (
                <div className="gap-y-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[14px] font-black text-near-black flex items-center gap-2">
                      Regional language required{" "}
                      <Info className="size-3.5 text-gray-400" />
                    </h4>
                    <button
                      type="button"
                      onClick={() => setActiveRequirementTab("")}
                    >
                      <X className="size-4 text-gray-400" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {REGIONAL_LANGUAGES.map((lang) => {
                      const isSelected =
                        formData.regionalLanguages?.includes(lang);
                      return (
                        <button
                          key={lang}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => {
                              const prevLangs = prev.regionalLanguages || [];
                              return {
                                ...prev,
                                regionalLanguages: isSelected
                                  ? prevLangs.filter((l) => l !== lang)
                                  : [...prevLangs, lang],
                              };
                            })
                          }
                          className={cn(
                            "px-4 py-2 rounded-full text-[13px] font-bold border transition-all flex items-center gap-1.5",
                            isSelected
                              ? "bg-wise-green text-near-black border-wise-green shadow-sm"
                              : "bg-white border-gray-300 text-gray-600 hover:border-gray-400",
                          )}
                        >
                          {lang}
                          {isSelected ? (
                            <X className="size-3.5" />
                          ) : (
                            <Plus className="size-3.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeRequirementTab === "Skills" && (
                <div className="gap-y-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[14px] font-black text-near-black flex items-center gap-2">
                      Skills preference
                    </h4>
                    <button
                      type="button"
                      onClick={() => setActiveRequirementTab("")}
                    >
                      <X className="size-4 text-gray-400" />
                    </button>
                  </div>
                  <MultiSelectField
                    options={[
                      "Backend Development",
                      "Mern Stack",
                      "Front-End App Development",
                      "SQL",
                      "Project Management",
                      "Digital Marketing",
                      "Sales",
                      "Customer Support",
                    ]}
                    selected={formData.skills || []}
                    onChange={(vals) =>
                      setFormData((prev) => ({ ...prev, skills: vals }))
                    }
                    placeholder="Search or select skills..."
                    label="Skills"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm shadow-black/[0.02]">
          <div className="p-8 gap-y-6" id="field-description">
            <div className="gap-y-1">
              <Label className="text-[16px] font-black text-near-black">
                Job Description
              </Label>
              <p className="text-[13px] font-medium text-gray-500">
                Describe the responsibilities of this job and other specific
                requirements here.
              </p>
            </div>

            <RichTextEditor
              value={formData.description}
              onChange={(content) =>
                setFormData((prev) => ({ ...prev, description: content }))
              }
              placeholder="Enter the job description, including the main responsibility and tasks..."
            />
            <FieldError name="description" errors={errors} />
          </div>

          <div
            className="p-8 gap-y-6 pt-10 border-t border-gray-100"
            id="field-jobDescription"
          >
            <div className="gap-y-2">
              <Label className="text-[14px] font-black text-near-black">
                Detailed Job Role & Responsibilities
              </Label>
              <p className="text-[12px] font-medium text-gray-500">
                Provide a clear breakdown of what the candidate will be doing
                daily.
              </p>
            </div>
            <RichTextEditor
              value={formData.jobDescription || ""}
              onChange={(content) =>
                setFormData((prev) => ({ ...prev, jobDescription: content }))
              }
              placeholder="Enter details about responsibilities, tools used, day-to-day tasks..."
            />
            <FieldError name="jobDescription" errors={errors} />
          </div>
        </div>
      </div>
    </m.div>
  );
};

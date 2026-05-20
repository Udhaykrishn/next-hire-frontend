import { z } from "zod";

export const jobStep1Schema = z
  .object({
    belongingCompany: z.string().default(""),
    hiringCompany: z.string().min(2, "Hiring company name is required"),
    experienceType: z.string().min(1, "Experience type is required"),
    jobTitle: z.string().min(3, "Job title must be at least 3 characters"),
    jobCategory: z.string().min(1, "Job category is required"),
    jobType: z.string().min(1, "Job type is required"),
    isNightShift: z.boolean(),
    locationType: z.enum(["Work From Office", "Work From Home", "Field Job"]),
    officeAddress: z.string().default(""),
    fieldArea: z.string().default(""),
    jobCity: z.string().default(""),
    floorDetails: z.string().default(""),
    showFloorDetails: z.boolean().default(false),
    industry: z.array(z.string()),
  })
  .refine(
    (data) => {
      if (data.locationType === "Work From Office" && !data.officeAddress)
        return false;
      if (data.locationType === "Field Job" && !data.fieldArea) return false;
      if (data.locationType === "Work From Home" && !data.jobCity) return false;
      return true;
    },
    {
      message: "Location details are required for the selected work type",
      path: ["officeAddress"],
    },
  );

export const jobStep2Schema = z
  .object({
    payType: z.string().min(1, "Pay type is required"),
    minSalary: z.string().min(1, "Minimum salary is required"),
    maxSalary: z.string().min(1, "Maximum salary is required"),
    incentiveAmount: z.string().default(""),
    perks: z.array(z.string()),
    hasJoiningFee: z.enum(["Yes", "No"]),
    feeAmount: z.string().default(""),
    feeReason: z.string().default(""),
    feeDetails: z.string().default(""),
    feePaymentTiming: z.string().default(""),
    gender: z.string().min(1, "Gender requirement is required"),
    minAge: z.string().min(1, "Minimum age is required"),
    maxAge: z.string().min(1, "Maximum age is required"),
    education: z.string().min(1, "Education is required"),
    degreeSpecialization: z.array(z.string()),
    regionalLanguages: z.array(z.string()),
    skills: z.array(z.string()),
    englishLevel: z.string().min(1, "English level is required"),
    experience: z.string().min(1, "Experience level is required"),
    minExperience: z.string().default(""),
    description: z.string().min(10, "Summary should be at least 10 characters"),
    jobDescription: z.string().default(""),
  })
  .refine(
    (data) => {
      if (data.hasJoiningFee === "Yes") {
        return (
          !!data.feeAmount &&
          !!data.feeReason &&
          !!data.feeDetails &&
          !!data.feePaymentTiming
        );
      }
      return true;
    },
    {
      message: "Please fill all fee-related details",
      path: ["feeAmount"],
    },
  )
  .refine(
    (data) => {
      const min = parseInt(data.minAge, 10);
      const max = parseInt(data.maxAge, 10);
      if (!Number.isNaN(min) && !Number.isNaN(max)) {
        return min <= max;
      }
      return true;
    },
    {
      message: "Minimum age cannot be greater than maximum age",
      path: ["minAge"],
    },
  )
  .refine(
    (data) => {
      const min = parseInt(data.minSalary.replace(/,/g, ""), 10);
      const max = parseInt(data.maxSalary.replace(/,/g, ""), 10);
      if (!Number.isNaN(min) && !Number.isNaN(max)) {
        return min <= max;
      }
      return true;
    },
    {
      message: "Minimum salary cannot be greater than maximum salary",
      path: ["minSalary"],
    },
  );

export const jobStep3Schema = z
  .object({
    isWalkIn: z.boolean(),
    interviewAddress: z.string().default(""),
    walkInStartDate: z.string().default(""),
    walkInEndDate: z.string().default(""),
    walkInStartTime: z.string().default(""),
    walkInEndTime: z.string().default(""),
    interviewInstructions: z.string().default(""),
    contactPreference: z.string().min(1, "Contact preference is required"),
    hrName: z.string().default(""),
    hrPhone: z.string().default(""),
    hrEmail: z.string().default(""),
    otherRecruiterName: z.string().default(""),
    otherRecruiterWhatsapp: z.string().default(""),
    otherRecruiterEmail: z.string().default(""),
    canCandidateContact: z.enum(["Yes", "No"]).default("No"),
    whatsappAlerts: z.string().min(1, "Notification preference is required"),
  })
  .refine(
    (data) => {
      if (data.isWalkIn) {
        return !!data.interviewAddress && data.interviewAddress.length >= 5;
      }
      return true;
    },
    {
      message: "Address is required for walk-in interviews",
      path: ["interviewAddress"],
    },
  )
  .refine(
    (data) => {
      if (data.isWalkIn) {
        return (
          !!data.walkInStartDate &&
          !!data.walkInEndDate &&
          !!data.walkInStartTime &&
          !!data.walkInEndTime
        );
      }
      return true;
    },
    {
      message: "Please fill all walk-in interview details",
      path: ["walkInStartDate"],
    },
  )
  .refine(
    (data) => {
      if (data.contactPreference === "Yes, to other recruiter") {
        return !!data.hrName && !!data.hrPhone && !!data.hrEmail;
      }
      return true;
    },
    {
      message: "Please fill all recruiter details",
      path: ["hrName"],
    },
  );

export const jobStep4Schema = z.object({}); // Preview step - no validation needed

export const jobStep5Schema = z.object({
  selectedPlan: z.string().min(1, "Please select a plan to continue"),
});

export const jobSchema = z.object({
  ...jobStep1Schema.shape,
  ...jobStep2Schema.shape,
  ...jobStep3Schema.shape,
  ...jobStep4Schema.shape,
  ...jobStep5Schema.shape,
});

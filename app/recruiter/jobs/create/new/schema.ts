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
    payType: z.string().min(1, "Pay type is required"),
    minSalary: z.string().min(1, "Minimum salary is required"),
    maxSalary: z.string().min(1, "Maximum salary is required"),
    incentiveAmount: z.string().default(""),
    hasJoiningFee: z.enum(["Yes", "No"]).default("No"),
    feeAmount: z.string().default(""),
    feeReason: z.string().default(""),
    feeDetails: z.string().default(""),
    feePaymentTiming: z.string().default(""),
  })
  .superRefine((data, ctx) => {
    if (data.locationType === "Work From Office" && !data.officeAddress) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Location details are required for the selected work type",
        path: ["officeAddress"],
      });
    }
    if (data.locationType === "Field Job" && !data.fieldArea) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Location details are required for the selected work type",
        path: ["fieldArea"],
      });
    }
    if (data.locationType === "Work From Home" && !data.jobCity) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Location details are required for the selected work type",
        path: ["jobCity"],
      });
    }

    if (data.hasJoiningFee === "Yes") {
      if (!data.feeAmount) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Fee amount is required",
          path: ["feeAmount"],
        });
      }
      if (!data.feeReason) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Fee reason is required",
          path: ["feeReason"],
        });
      }
      if (!data.feeDetails) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Fee details are required",
          path: ["feeDetails"],
        });
      }
      if (!data.feePaymentTiming) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Fee payment timing is required",
          path: ["feePaymentTiming"],
        });
      }
    }

    const min = parseInt(data.minSalary.replace(/,/g, ""), 10);
    const max = parseInt(data.maxSalary.replace(/,/g, ""), 10);
    if (!Number.isNaN(min) && !Number.isNaN(max) && min > max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Maximum salary cannot be less than minimum salary",
        path: ["maxSalary"],
      });
    }

    if (data.payType === "Fixed + Incentive" || data.payType === "Incentive Only") {
      const incentive = parseInt(data.incentiveAmount.replace(/,/g, ""), 10);
      if (Number.isNaN(incentive) || incentive < 1000) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Incentive amount must be at least 1,000",
          path: ["incentiveAmount"],
        });
      }
    }
  });

export const jobStep2Schema = z
  .object({
    perks: z.array(z.string()),
    gender: z.string().default(""),
    minAge: z.string().default(""),
    maxAge: z.string().default(""),
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
  .superRefine((data, ctx) => {
    if (data.isWalkIn) {
      if (!data.interviewAddress || data.interviewAddress.length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Address is required for walk-in interviews",
          path: ["interviewAddress"],
        });
      }
      if (!data.walkInStartDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Walk-in start date is required",
          path: ["walkInStartDate"],
        });
      }
      if (!data.walkInEndDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Walk-in end date is required",
          path: ["walkInEndDate"],
        });
      }
      if (!data.walkInStartTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Walk-in start time is required",
          path: ["walkInStartTime"],
        });
      }
      if (!data.walkInEndTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Walk-in end time is required",
          path: ["walkInEndTime"],
        });
      }
    }

    if (data.contactPreference === "Yes, to other recruiter") {
      if (!data.hrName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Other recruiter name is required",
          path: ["hrName"],
        });
      }
      if (!data.hrPhone) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Other recruiter phone is required",
          path: ["hrPhone"],
        });
      }
      if (!data.hrEmail) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Other recruiter email is required",
          path: ["hrEmail"],
        });
      }
    }
  });

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
  is_published: z.boolean().optional(),
});

import { CompanyVerificationFlow } from "@/features/recruiter/components/verification/company-verification-flow";

export const metadata = {
  title: 'Verify Company | NextHire',
  description: 'Complete your company verification to post jobs.',
};

export default function VerifyCompanyPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <CompanyVerificationFlow />
    </div>
  );
}

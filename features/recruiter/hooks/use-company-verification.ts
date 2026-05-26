import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useCompanyVerificationSessionQuery,
  useDeleteCompanyVerificationSessionMutation,
  useStartCompanyVerificationMutation,
  useVerifyCompanyOtpMutation,
} from "./use-recruiter-query";

export function useCompanyVerification() {
  const router = useRouter();
  const [step, setStep] = useState<"CIN" | "OTP" | "SESSION_EXISTS">("CIN");
  const [cin, setCin] = useState("");
  const [otp, setOtp] = useState("");

  const sessionQuery = useCompanyVerificationSessionQuery();
  const startMutation = useStartCompanyVerificationMutation();
  const verifyMutation = useVerifyCompanyOtpMutation();
  const deleteMutation = useDeleteCompanyVerificationSessionMutation();

  useEffect(() => {
    if (sessionQuery.data) {
      if (sessionQuery.data.step === "OTP_VERIFICATION") {
        setStep("SESSION_EXISTS");
        setCin(sessionQuery.data.cin || "");
      }
    } else if (sessionQuery.isSuccess && !sessionQuery.data) {
      setStep("CIN");
    }
  }, [sessionQuery.data, sessionQuery.isSuccess]);

  const handleResumeSession = () => {
    setStep("OTP");
  };

  const handleDeleteSession = async () => {
    try {
      await deleteMutation.mutateAsync();
      toast.success("Previous session deleted. You can start a new one.");
      setStep("CIN");
      setCin("");
      setOtp("");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(
        error?.response?.data?.message || "Failed to delete session.",
      );
    }
  };

  const handleStartSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cin) {
      toast.error("Please enter a valid CIN.");
      return;
    }
    try {
      await startMutation.mutateAsync(cin);
      toast.success(
        "Verification session started. Check your registered email/phone for OTP.",
      );
      setStep("OTP");
      sessionQuery.refetch();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(
        error?.response?.data?.message || "Failed to start verification.",
      );
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }
    try {
      await verifyMutation.mutateAsync(otp);
      toast.success("Company successfully verified!");
      router.push("/recruiter/profile");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message || "Invalid OTP.");
    }
  };

  return {
    step,
    cin,
    setCin,
    otp,
    setOtp,
    handleStartSession,
    handleVerifyOtp,
    handleResumeSession,
    handleDeleteSession,
    isLoading: sessionQuery.isLoading,
    isStarting: startMutation.isPending,
    isVerifying: verifyMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

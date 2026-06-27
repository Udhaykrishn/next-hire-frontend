"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { AUTH_PRIMARY_BTN } from "@/components/auth/auth-shell";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OtpFormProps {
  id: string;
  role: "recruiter" | "user";
  onVerify?: (otp: string) => Promise<void>;
}

export function OtpForm({ id, role, onVerify }: OtpFormProps) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (onVerify) {
        await onVerify(otp);
      } else {
        // Default behavior if not provided
        console.log(`Verifying OTP ${otp} for ${role} with id ${id}`);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      // Assuming successful verification redirects to reset password
      router.push(`/${role}/reset-password/${id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex justify-center py-2">
        <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
          <InputOTPGroup className="gap-2.5">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="h-14 w-[46px] rounded-xl border border-hairline bg-white text-[22px] font-semibold tabular-nums text-ink transition-all data-[active=true]:border-coral data-[active=true]:ring-coral/20"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      <motion.div whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          className={AUTH_PRIMARY_BTN}
          disabled={isLoading || otp.length !== 6}
        >
          {isLoading ? "Verifying…" : "Verify and continue"}
        </Button>
      </motion.div>
    </form>
  );
}

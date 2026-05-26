"use client";

import { LazyMotion, m, domAnimation } from "motion/react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
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
  const { push } = useRouter();

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
      push(`/${role}/reset-password/${id}`);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="gap-y-6">
      <div className="flex justify-center">
        <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
          <InputOTPGroup className="gap-2">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="w-12 h-14 text-lg font-black rounded-xl border-gray-200 data-[active=true]:border-wise-green data-[active=true]:ring-wise-green/30 transition-all bg-white shadow-sm"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          className="w-full h-12 bg-wise-green text-dark-green font-black rounded-xl hover:bg-wise-green/90 transition-all text-lg shadow-[0_0_20px_rgba(159,232,112,0.2)] mt-2"
          disabled={isLoading || otp.length !== 6}
        >
          {isLoading ? "Verifying…" : "Verify OTP"}
        </Button>
      </m.div>
    </form>
  );
}

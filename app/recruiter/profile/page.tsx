"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  Edit3,
  FileText,
  Save,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useProfile } from "@/hooks/use-profile";
import { toast } from "sonner";

export default function ProfilePage() {
  const { basicInfo, handleUpdateProfile, handleUpdateCin, isLoading } =
    useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: basicInfo.name,
    email: basicInfo.email,
    phone: basicInfo.phone,
    cinNumber: basicInfo.cinNumber || "",
  });

  const handleSave = async () => {
    try {
      const profileFormData = new FormData();
      profileFormData.append("name", formData.name);
      profileFormData.append("phone", formData.phone);
      handleUpdateProfile(profileFormData);

      if (formData.cinNumber !== basicInfo.cinNumber) {
        handleUpdateCin(formData.cinNumber);
      }

      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-wise-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[40px] font-black text-near-black tracking-tight"
            >
              Profile
            </motion.h1>
            <p className="text-gray-400 font-medium text-[15px]">
              Manage your recruitment identity and tax credentials.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="editing-actions"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-3"
                >
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="h-12 px-6 rounded-2xl font-bold border-gray-100 hover:bg-gray-50 gap-2"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="h-12 px-6 rounded-2xl font-bold bg-near-black text-white hover:bg-near-black/90 gap-2 shadow-xl shadow-near-black/10"
                  >
                    <Save className="w-4 h-4" /> Save Changes
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="view-actions"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="h-12 px-8 rounded-2xl font-bold bg-wise-green text-near-black hover:bg-wise-green/90 gap-2 shadow-xl shadow-wise-green/20"
                  >
                    <Edit3 className="w-4 h-4" /> Edit Profile
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 gap-10"
        >
          {/* Basic Details Card */}
          <div
            className={cn(
              "bg-white rounded-[2.5rem] border transition-all duration-500 p-8 lg:p-10 space-y-8",
              isEditing
                ? "border-wise-green shadow-2xl shadow-wise-green/5"
                : "border-gray-100 shadow-sm",
            )}
          >
            <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
              <div className="w-12 h-12 rounded-2xl bg-wise-green/10 flex items-center justify-center text-wise-green">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-[22px] font-black text-near-black">
                  Basic Details
                </h2>
                <p className="text-[12px] text-gray-400 font-medium">
                  Personal identification information
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              <div className="space-y-3">
                <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Name *
                </Label>
                <div className="relative group">
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    disabled={!isEditing}
                    className={cn(
                      "h-14 bg-gray-50/50 border-gray-100 rounded-2xl font-bold text-[16px] px-5 transition-all",
                      isEditing &&
                        "bg-white border-wise-green focus:ring-4 ring-wise-green/5",
                    )}
                  />
                  {!isEditing && (
                    <div className="absolute inset-0 cursor-not-allowed" />
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    value={formData.email}
                    disabled={true}
                    className={cn(
                      "h-14 bg-gray-50/50 border-gray-100 rounded-2xl font-bold text-[16px] px-5 transition-all opacity-70",
                    )}
                  />
                  <div className="absolute inset-0 cursor-not-allowed" />
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Mobile Contact *
                </Label>
                <div className="flex gap-3">
                  <div className="h-14 px-5 bg-gray-100/50 flex items-center rounded-2xl font-black text-gray-400 text-[14px] border border-gray-100">
                    +91
                  </div>
                  <div className="relative flex-1">
                    <Input
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                      className={cn(
                        "h-14 bg-gray-50/50 border-gray-100 rounded-2xl font-bold text-[16px] px-5 transition-all w-full",
                        isEditing &&
                          "bg-white border-wise-green focus:ring-4 ring-wise-green/5",
                      )}
                    />
                    {!isEditing && (
                      <div className="absolute inset-0 cursor-not-allowed" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tax & Corporate Details Card */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 lg:p-10 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-wise-green/10 flex items-center justify-center text-wise-green">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-[22px] font-black text-near-black">
                    GST / ISD-GST Details
                  </h2>
                  <p className="text-[12px] text-gray-400 font-medium">
                    Corporate tax and billing identification
                  </p>
                </div>
              </div>
              <div className="self-start sm:self-center px-4 py-2 rounded-full bg-wise-green text-near-black text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                {basicInfo.isCompanyVerified ? (
                  <>
                    <ShieldCheck className="w-4 h-4" /> Company Verified
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 opacity-50" /> Verification
                    Pending
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Registered CIN Number
                </Label>
                <div className="relative group">
                  <Input
                    value={formData.cinNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        cinNumber: e.target.value,
                      }))
                    }
                    placeholder="Enter CIN (Eg. L01234MH2024PLC123456)"
                    disabled={!isEditing}
                    className={cn(
                      "h-14 bg-gray-50/50 border-gray-100 rounded-2xl font-bold text-[16px] px-5 tracking-wider uppercase transition-all",
                      isEditing &&
                        "bg-white border-wise-green focus:ring-4 ring-wise-green/5",
                      !isEditing &&
                        basicInfo.isCompanyVerified &&
                        "text-wise-green",
                    )}
                  />
                  {!isEditing && (
                    <div className="absolute inset-0 cursor-not-allowed" />
                  )}
                  {!isEditing && basicInfo.isCompanyVerified && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <CheckCircle2 className="w-5 h-5 text-wise-green" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-gray-50/80 border border-gray-100 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-wise-green flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-near-black" />
                </div>
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                  Company Intelligence Protocol
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    Legal Entity Name
                  </p>
                  <p className="text-[24px] font-black text-near-black tracking-tight">
                    REAL CORPORATION
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    Registered Headquarters
                  </p>
                  <p className="text-[14px] font-medium text-gray-600 leading-relaxed max-w-md">
                    PLOT NO. 55, DEVRAJ INDUSTRIAL CO OP SOC, PIRANA ROAD,
                    VRUNDAVAN FARM, Piplaj Village, Ahmedabad, Gujarat 382405
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 px-4 pt-2">
              <div className="mt-1 w-6 h-6 rounded-lg border-2 border-wise-green bg-wise-green flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-near-black" />
              </div>
              <p className="text-[14px] font-medium text-gray-500 leading-relaxed">
                I verify that the company details displayed above are accurate
                and understand that all legal invoices will be generated using
                this information.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import {
  Briefcase,
  Command,
  Crown,
  DollarSign,
  Globe,
  Layout,
  MapPin,
  Rocket,
  Users,
  X,
  Zap,
} from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradeModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  const features = [
    {
      title: "Advanced Neural Matching",
      desc: "Access the top 1% talent matches using our proprietary AI engine.",
      icon: <Zap />,
    },
    {
      title: "Unlimited Command Posts",
      desc: "Scale your organization without any listing restrictions.",
      icon: <Globe />,
    },
    {
      title: "Direct Intelligence Access",
      desc: "Message top-tier talent directly with 99% open rates.",
      icon: <Users />,
    },
    {
      title: "Team Synchronization",
      desc: "Collaborate across hiring stages with real-time syncing.",
      icon: <Layout />,
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-near-black/80 backdrop-blur-md"
      />

      <m.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        className="relative w-full max-w-4xl bg-white rounded-[2.5rem] overflow-hidden shadow-[0_32px_128px_-12px_rgba(0,0,0,0.5)] flex flex-col md:flex-row min-h-[500px]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-8 right-8 z-20 text-gray-400 hover:text-near-black transition-colors"
        >
          <X className="size-6" />
        </button>

        {/* Sidebar */}
        <div className="md:w-[40%] bg-near-black p-10 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 size-64 bg-wise-green/10 rounded-full blur-[80px] -mr-32 -mt-32" />

          <div className="relative z-10 gap-y-8">
            <div className="size-14 rounded-2xl bg-wise-green flex items-center justify-center shadow-[0_0_30px_rgba(159,232,112,0.3)]">
              <Crown className="size-8 text-near-black" />
            </div>
            <div className="gap-y-4">
              <h2 className="text-[32px] font-black text-white leading-none tracking-tighter">
                Deploy <br />
                <span className="text-wise-green italic">Satoshi Pro.</span>
              </h2>
              <p className="text-gray-500 text-[15px] font-medium leading-relaxed">
                Join the elite recruitment teams scaling their departments with
                Satoshi Intelligence.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-10 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex -gap-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="size-8 rounded-full border-2 border-near-black bg-gray-800 flex items-center justify-center text-[10px] font-bold text-white"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest">
                500+ Teams scaling now
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="md:w-[60%] p-10 md:p-14 gap-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
            {features.map((feat) => (
              <div key={feat.title} className="gap-y-3 group">
                <div className="size-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-wise-green/10 group-hover:text-wise-green transition-all duration-500">
                  {React.cloneElement(
                    feat.icon as React.ReactElement<{ className?: string }>,
                    { className: "size-5" },
                  )}
                </div>
                <div>
                  <h3 className="text-[15px] font-black text-near-black mb-1">
                    {feat.title}
                  </h3>
                  <p className="text-gray-400 text-[12px] font-medium leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-10 border-t border-gray-100 flex items-center justify-between gap-6">
            <div className="gap-y-1">
              <p className="text-[32px] font-black text-near-black leading-none tracking-tighter">
                $299
                <span className="text-[14px] text-gray-300 ml-1">/month</span>
              </p>
              <p className="text-wise-green font-black text-[10px] uppercase tracking-[0.2em]">
                Unlimited Intelligence
              </p>
            </div>
            <Button className="h-16 px-10 bg-near-black text-white hover:bg-wise-green hover:text-near-black transition-all rounded-full font-black text-[16px] shadow-2xl shadow-near-black/20 group/btn relative overflow-hidden">
              <m.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Start 14-Day Trial
                <Zap className="size-5 fill-current" />
              </span>
            </Button>
          </div>
        </div>
      </m.div>
    </div>
  );
}

export function JobCreationModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-near-black/80 backdrop-blur-md"
      />

      <m.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        className="relative w-full max-w-xl bg-white rounded-[2.5rem] p-10 md:p-14 shadow-[0_32px_128px_-12px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-10 right-10 z-20 text-gray-400 hover:text-near-black transition-colors"
        >
          <X className="size-6" />
        </button>

        <div className="relative z-10 gap-y-10">
          <div className="gap-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wise-green/10 text-wise-green text-[9px] font-black uppercase tracking-widest border border-wise-green/10 mb-2">
              <Command className="size-3" />
              Deployment Console
            </div>
            <h2 className="text-[32px] font-black text-near-black leading-none tracking-tighter">
              Post <span className="text-wise-green italic">New Listing.</span>
            </h2>
            <p className="text-gray-400 font-medium text-[15px]">
              Launch your requirements to our high-performance talent network.
            </p>
          </div>

          <div className="gap-y-6">
            <div className="gap-y-2">
              <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Job Designation
              </Label>
              <div className="relative group">
                <Input
                  placeholder="e.g. Senior Neural Engineer"
                  className="h-14 px-6 rounded-2xl border-gray-100 bg-gray-50/50 focus:border-wise-green focus:bg-white transition-all font-medium text-[16px]"
                />
                <Briefcase className="absolute right-5 top-1/2 -translate-y-1/2 size-5 text-gray-200 group-focus-within:text-wise-green transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="gap-y-2">
                <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Deployment Location
                </Label>
                <div className="relative group">
                  <Input
                    placeholder="Remote / City"
                    className="h-14 px-6 rounded-2xl border-gray-100 bg-gray-50/50 focus:border-wise-green focus:bg-white transition-all font-medium text-[16px]"
                  />
                  <MapPin className="absolute right-5 top-1/2 -translate-y-1/2 size-5 text-gray-200 group-focus-within:text-wise-green transition-colors" />
                </div>
              </div>
              <div className="gap-y-2">
                <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Projected Budget
                </Label>
                <div className="relative group">
                  <Input
                    placeholder="e.g. $140k - $180k"
                    className="h-14 px-6 rounded-2xl border-gray-100 bg-gray-50/50 focus:border-wise-green focus:bg-white transition-all font-medium text-[16px]"
                  />
                  <DollarSign className="absolute right-5 top-1/2 -translate-y-1/2 size-5 text-gray-200 group-focus-within:text-wise-green transition-colors" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex gap-4">
            <Button
              variant="ghost"
              onClick={onClose}
              className="h-14 px-8 rounded-full font-black text-gray-400 text-sm hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button className="flex-1 h-14 bg-near-black text-white hover:bg-wise-green hover:text-near-black transition-all rounded-full font-black text-[16px] shadow-2xl shadow-near-black/10 group">
              Publish Listing
              <Rocket className="size-5 ml-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </m.div>
    </div>
  );
}

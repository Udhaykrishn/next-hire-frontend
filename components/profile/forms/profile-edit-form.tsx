"use client";

import { Button } from "@/components/animate-ui/components/buttons/button";
import { BaseSheet } from "./base-sheet";

interface ProfileEditFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  initialData: { name: string; location: string; tagline: string };
}

export const ProfileEditForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: ProfileEditFormProps) => (
  <BaseSheet isOpen={isOpen} onClose={onClose} title="Edit Profile">
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="full-name"
          className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1"
        >
          Full Name
        </label>
        <input
          id="full-name"
          name="name"
          defaultValue={initialData.name}
          required
          className="w-full h-14 bg-gray-50 rounded-2xl border border-gray-100 px-5 text-[15px] font-bold focus:outline-none focus:border-wise-green transition-colors"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="location"
          className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1"
        >
          Location
        </label>
        <input
          id="location"
          name="location"
          defaultValue={initialData.location}
          required
          className="w-full h-14 bg-gray-50 rounded-2xl border border-gray-100 px-5 text-[15px] font-bold focus:outline-none focus:border-wise-green transition-colors"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="tagline"
          className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1"
        >
          Tagline
        </label>
        <input
          id="tagline"
          name="tagline"
          defaultValue={initialData.tagline}
          required
          className="w-full h-14 bg-gray-50 rounded-2xl border border-gray-100 px-5 text-[15px] font-bold focus:outline-none focus:border-wise-green transition-colors"
        />
      </div>
      <Button
        type="submit"
        className="w-full h-16 bg-dark-green text-white rounded-[1.5rem] text-[16px] font-black hover:bg-black transition-all"
      >
        Save Profile
      </Button>
    </form>
  </BaseSheet>
);

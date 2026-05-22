"use client";

import { APIProvider, useApiIsLoaded } from "@vis.gl/react-google-maps";
import { ArrowRight, Phone, User } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import usePlacesAutocomplete from "use-places-autocomplete";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { Logo } from "@/components/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "@/features/profile/services/profile.api";

const GoogleLocationInput = ({
  id,
  defaultValue,
  onChange,
}: {
  id: string;
  defaultValue: string;
  onChange: (val: string) => void;
}) => {
  const isLoaded = useApiIsLoaded();
  const [isReady, setIsReady] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    if (
      isLoaded &&
      typeof window !== "undefined" &&
      window.google?.maps?.places
    ) {
      setIsReady(true);
    }
  }, [isLoaded]);

  const {
    suggestions: { status, data },
    setValue,
    clearSuggestions,
    init,
  } = usePlacesAutocomplete({
    debounce: 300,
    defaultValue,
    initOnMount: false,
  });

  useEffect(() => {
    if (isReady) {
      init();
    }
  }, [isReady, init]);

  useEffect(() => {
    setInputValue(defaultValue);
    if (isReady) {
      setValue(defaultValue, false);
    }
  }, [defaultValue, setValue, isReady]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (isReady) {
      setValue(val);
    }
    onChange(val);
  };

  const handleSelect =
    (suggestion: google.maps.places.AutocompletePrediction) => () => {
      setInputValue(suggestion.description);
      if (isReady) {
        setValue(suggestion.description, false);
      }
      clearSuggestions();
      onChange(suggestion.description);
    };

  return (
    <div className="relative w-full">
      <input
        id={id}
        type="text"
        name="location"
        value={inputValue}
        onChange={handleInput}
        placeholder="e.g. Kochi, Kerala, India"
        className="flex h-12 w-full border border-gray-200 focus:border-wise-green focus:ring-wise-green/20 bg-gray-50/50 text-base transition-all rounded-xl px-4 py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
      {isReady && status === "OK" && (
        <ul className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto overflow-x-hidden py-2 animate-in fade-in duration-200">
          {data.map((suggestion) => (
            <li key={suggestion.place_id}>
              <button
                type="button"
                onClick={handleSelect(suggestion)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleSelect(suggestion)();
                  }
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-wise-green/10 cursor-pointer flex items-center gap-2 transition-colors text-[13px] font-medium text-gray-700 border-none"
              >
                <span className="text-[14px]">📍</span>
                <span>{suggestion.description}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function ProfileSetupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    role_of_title: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone.trim()) {
      toast.error("Phone number is required");
      return;
    }
    setIsLoading(true);
    try {
      await updateProfile({
        phone: formData.phone.trim(),
        role_of_title: formData.role_of_title.trim() || undefined,
        location: formData.location.trim() || undefined,
      });
      toast.success("Profile set up! Welcome to NextHire.");
      router.push("/profile");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Setup failed";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-satoshi selection:bg-wise-green selection:text-dark-green relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-wise-green/40 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-wise-green/20 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md relative z-10"
        >
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>

          <Card className="border-gray-200 shadow-2xl shadow-gray-200/50 rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl">
            <CardHeader className="space-y-2 pb-6 pt-10 text-center">
              <CardTitle className="text-3xl font-black leading-tight text-gray-900 tracking-tight">
                One Last Step
              </CardTitle>
              <CardDescription className="text-base text-gray-500 font-medium mt-2">
                Add a few details to complete your profile.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-8 pb-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" /> Phone Number{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="h-12 border-gray-200 rounded-xl focus:border-wise-green focus:ring-wise-green/20 bg-gray-50/50 text-base transition-all"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    autoFocus
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="role_of_title"
                    className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"
                  >
                    <User className="w-4 h-4" /> Job Title{" "}
                    <span className="text-gray-400 font-normal normal-case tracking-normal">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    id="role_of_title"
                    type="text"
                    placeholder="e.g. Frontend Engineer"
                    className="h-12 border-gray-200 rounded-xl focus:border-wise-green focus:ring-wise-green/20 bg-gray-50/50 text-base transition-all"
                    value={formData.role_of_title}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"
                  >
                    <span>📍</span> Location{" "}
                    <span className="text-gray-400 font-normal normal-case tracking-normal">
                      (optional)
                    </span>
                  </Label>
                  <GoogleLocationInput
                    id="location"
                    defaultValue={formData.location}
                    onChange={(val) =>
                      setFormData((prev) => ({ ...prev, location: val }))
                    }
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-wise-green text-dark-green font-black rounded-xl hover:bg-wise-green/90 transition-all text-lg shadow-lg shadow-wise-green/20 gap-2 group mt-4"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Complete Setup"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </APIProvider>
  );
}

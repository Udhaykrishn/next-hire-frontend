"use client";

import { APIProvider, useApiIsLoaded } from "@vis.gl/react-google-maps";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { z } from "zod";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { FormPageLayout } from "@/components/profile/forms/form-page-layout";
import { useProfile } from "@/hooks/use-profile";

const basicInfoSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  tagline: z
    .string()
    .min(2, "Tagline must be at least 2 characters")
    .max(100, "Tagline cannot exceed 100 characters"),
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
  experience: z
    .string()
    .max(300, "Experience description cannot exceed 300 characters")
    .optional(),
  location: z.string().optional(),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[0-9\s\-()]{7,18}$/.test(val),
      "Phone number must be a valid format",
    ),
  linkedin: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val || /^https:\/\/([a-zA-Z0-9-]+\.)?linkedin\.com\/.*$/.test(val),
      "LinkedIn profile must be a valid HTTPS URL matching linkedin.com (e.g. https://www.linkedin.com/in/username)",
    ),
  portfolio: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^https:\/\/(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}(\/\S*)?$/.test(val),
      "Portfolio must be a valid HTTPS URL (e.g. https://myportfolio.com) and cannot be localhost",
    ),
  github: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https:\/\/(www\.)?github\.com\/.*$/.test(val),
      "GitHub profile must be a valid HTTPS URL matching github.com (e.g. https://github.com/username)",
    ),
});

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
  const isReady =
    isLoaded && typeof window !== "undefined" && !!window.google?.maps?.places;

  const [inputValue, setInputValue] = useState(
    defaultValue === "Not set" ? "" : defaultValue,
  );

  const {
    suggestions: { status, data },
    setValue,
    clearSuggestions,
    init,
  } = usePlacesAutocomplete({
    debounce: 300,
    defaultValue: defaultValue === "Not set" ? "" : defaultValue,
    initOnMount: false,
  });

  useEffect(() => {
    if (isReady) {
      init();
    }
  }, [isReady, init]);

  // Initialize usePlacesAutocomplete value on mount if ready
  useEffect(() => {
    if (isReady) {
      const val = defaultValue === "Not set" ? "" : defaultValue;
      setValue(val, false);
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
        aria-label="Control"
        id={id}
        type="text"
        name="location"
        value={inputValue}
        onChange={handleInput}
        placeholder="e.g. Kochi, Kerala, India"
        className="w-full h-11 bg-gray-50 rounded-xl border border-gray-100 px-4 text-[14px] font-bold focus:outline-none focus:border-wise-green transition-colors"
      />
      {isReady && status === "OK" && (
        <ul className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto overflow-x-hidden py-2 animate-in fade-in duration-200">
          {data.map((suggestion) => (
            <li key={suggestion.place_id}>
              <button
                type="submit"
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

export default function EditBasicInfoPage() {
  const { basicInfo, socialLinks, handleUpdateProfile, isLoading } =
    useProfile();
  const { push } = useRouter();
  const [locationValue, setLocationValue] = useState(basicInfo.location);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("location", locationValue);

    const inputData = {
      name: formData.get("name") as string,
      tagline: formData.get("tagline") as string,
      bio: (formData.get("bio") as string) || "",
      experience: (formData.get("experience") as string) || "",
      location: locationValue,
      phone: formData.get("phone") as string,
      linkedin: formData.get("linkedin") as string,
      portfolio: formData.get("portfolio") as string,
      github: (formData.get("github") as string) || "",
    };

    const result = basicInfoSchema.safeParse(inputData);
    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        if (issue.path[0]) {
          formattedErrors[issue.path[0] as string] = issue.message;
        }
      }
      setErrors(formattedErrors);

      const firstErrorKey = Object.keys(formattedErrors)[0];
      if (firstErrorKey) {
        const element = document.getElementById(`${firstErrorKey}-input`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
      return;
    }

    setErrors({});
    handleUpdateProfile(formData);
    push("/profile");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-satoshi">
        <div className="animate-spin rounded-full size-12 border-b-2 border-wise-green"></div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <FormPageLayout
        title="Basic Information"
        subtitle="Update your personal details and professional headline."
      >
        <form onSubmit={onSubmit} className="gap-y-6">
          <div className="gap-y-1.5">
            <label
              htmlFor="name-input"
              className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1"
            >
              Full Name
            </label>
            <input
              aria-label="Control"
              id="name-input"
              name="name"
              defaultValue={basicInfo.name}
              required
              className={`w-full h-11 bg-gray-50 rounded-xl border px-4 text-[14px] font-bold focus:outline-none transition-colors ${
                errors.name
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-100 focus:border-wise-green"
              }`}
              placeholder="e.g. Uday Krishna"
            />
            {errors.name && (
              <p className="text-red-500 text-xs font-bold mt-1 ml-1">
                {errors.name}
              </p>
            )}
          </div>

          <div className="gap-y-1.5">
            <label
              htmlFor="tagline-input"
              className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1"
            >
              Professional Tagline
            </label>
            <input
              aria-label="Control"
              id="tagline-input"
              name="tagline"
              defaultValue={basicInfo.tagline}
              required
              className={`w-full h-11 bg-gray-50 rounded-xl border px-4 text-[14px] font-bold focus:outline-none transition-colors ${
                errors.tagline
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-100 focus:border-wise-green"
              }`}
              placeholder="e.g. Senior Frontend Engineer"
            />
            {errors.tagline && (
              <p className="text-red-500 text-xs font-bold mt-1 ml-1">
                {errors.tagline}
              </p>
            )}
          </div>

          <div className="gap-y-1.5">
            <label
              htmlFor="location-input"
              className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1"
            >
              Location
            </label>
            <GoogleLocationInput
              id="location-input"
              defaultValue={locationValue}
              onChange={setLocationValue}
            />
            {errors.location && (
              <p className="text-red-500 text-xs font-bold mt-1 ml-1">
                {errors.location}
              </p>
            )}
          </div>

          <div className="gap-y-1.5">
            <label
              htmlFor="phone-input"
              className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1"
            >
              Phone Number
            </label>
            <input
              aria-label="Control"
              id="phone-input"
              name="phone"
              type="tel"
              defaultValue={basicInfo.phone}
              className={`w-full h-11 bg-gray-50 rounded-xl border px-4 text-[14px] font-bold focus:outline-none transition-colors ${
                errors.phone
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-100 focus:border-wise-green"
              }`}
              placeholder="e.g. +91 9876543210"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs font-bold mt-1 ml-1">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="gap-y-1.5">
            <label
              htmlFor="bio-input"
              className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1"
            >
              Bio
            </label>
            <textarea
              aria-label="Control"
              id="bio-input"
              name="bio"
              rows={4}
              defaultValue={basicInfo.bio}
              maxLength={500}
              className={`w-full bg-gray-50 rounded-xl border px-4 py-3 text-[14px] font-bold focus:outline-none transition-colors resize-none ${
                errors.bio
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-100 focus:border-wise-green"
              }`}
              placeholder="Tell recruiters about yourself..."
            />
            {errors.bio && (
              <p className="text-red-500 text-xs font-bold mt-1 ml-1">
                {errors.bio}
              </p>
            )}
          </div>

          <div className="gap-y-1.5">
            <label
              htmlFor="experience-input"
              className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1"
            >
              Years of Experience
            </label>
            <input
              aria-label="Control"
              id="experience-input"
              name="experience"
              type="text"
              defaultValue={basicInfo.experience}
              className={`w-full h-11 bg-gray-50 rounded-xl border px-4 text-[14px] font-bold focus:outline-none transition-colors ${
                errors.experience
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-100 focus:border-wise-green"
              }`}
              placeholder="e.g. 3 years in frontend development"
            />
            {errors.experience && (
              <p className="text-red-500 text-xs font-bold mt-1 ml-1">
                {errors.experience}
              </p>
            )}
          </div>

          <div className="gap-y-1.5">
            <label
              htmlFor="linkedin-input"
              className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1"
            >
              LinkedIn Profile Link
            </label>
            <input
              aria-label="Control"
              id="linkedin-input"
              name="linkedin"
              type="url"
              defaultValue={socialLinks?.linkedin}
              className={`w-full h-11 bg-gray-50 rounded-xl border px-4 text-[14px] font-bold focus:outline-none transition-colors ${
                errors.linkedin
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-100 focus:border-wise-green"
              }`}
              placeholder="e.g. https://linkedin.com/in/username"
            />
            {errors.linkedin && (
              <p className="text-red-500 text-xs font-bold mt-1 ml-1">
                {errors.linkedin}
              </p>
            )}
          </div>

          <div className="gap-y-1.5">
            <label
              htmlFor="portfolio-input"
              className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1"
            >
              Personal Portfolio Link
            </label>
            <input
              aria-label="Control"
              id="portfolio-input"
              name="portfolio"
              type="url"
              defaultValue={socialLinks?.portfolio}
              className={`w-full h-11 bg-gray-50 rounded-xl border px-4 text-[14px] font-bold focus:outline-none transition-colors ${
                errors.portfolio
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-100 focus:border-wise-green"
              }`}
              placeholder="e.g. https://myportfolio.com"
            />
            {errors.portfolio && (
              <p className="text-red-500 text-xs font-bold mt-1 ml-1">
                {errors.portfolio}
              </p>
            )}
          </div>

          <div className="gap-y-1.5">
            <label
              htmlFor="github-input"
              className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1"
            >
              GitHub Profile Link
            </label>
            <input
              aria-label="Control"
              id="github-input"
              name="github"
              type="url"
              defaultValue={socialLinks?.github}
              className={`w-full h-11 bg-gray-50 rounded-xl border px-4 text-[14px] font-bold focus:outline-none transition-colors ${
                errors.github
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-100 focus:border-wise-green"
              }`}
              placeholder="e.g. https://github.com/username"
            />
            {errors.github && (
              <p className="text-red-500 text-xs font-bold mt-1 ml-1">
                {errors.github}
              </p>
            )}
          </div>

          <Button className="w-full h-12 bg-wise-green text-dark-green rounded-xl text-[14px] font-black shadow-md shadow-wise-green/10 transition-all hover:bg-wise-green/90">
            Save Changes
          </Button>
        </form>
      </FormPageLayout>
    </APIProvider>
  );
}

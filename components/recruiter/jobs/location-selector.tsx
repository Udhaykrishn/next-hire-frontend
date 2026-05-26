"use client";

import { useApiIsLoaded } from "@vis.gl/react-google-maps";
import { City } from "country-state-city";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { AlertCircle, ChevronDown, MapPin, Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import type { JobFormData } from "@/app/recruiter/jobs/create/new/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { MapSelectorModal } from "./map-selector-modal";

interface LocationSelectorProps {
  formData: JobFormData;
  setFormData: React.Dispatch<React.SetStateAction<JobFormData>>;
  errors?: Record<string, string>;
}

const AutocompleteInput = ({
  placeholder,
  value,
  onChange,
  onSelect,
  error,
}: {
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  onSelect: (val: string) => void;
  error?: string;
}) => {
  const isLoaded = useApiIsLoaded();
  const isReady =
    isLoaded && typeof window !== "undefined" && !!window.google?.maps?.places;

  const {
    suggestions: { status, data },
    setValue,
    clearSuggestions,
    init,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: "in" } },
    debounce: 300,
    defaultValue: value,
    initOnMount: false,
  });

  useEffect(() => {
    if (isReady) {
      init();
    }
  }, [isReady, init]);

  React.useEffect(() => {
    if (isReady) {
      setValue(value, false);
    }
  }, [value, setValue, isReady]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (isReady) {
      setValue(val);
    }
    onChange(val);
  };

  const handleSelect =
    (suggestion: google.maps.places.AutocompletePrediction) => () => {
      if (isReady) {
        setValue(suggestion.description, false);
      }
      clearSuggestions();
      onSelect(suggestion.description);
    };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          type="text"
          value={value}
          onChange={handleInput}
          placeholder={placeholder}
          className={cn(
            "pl-12 h-14 bg-white/50 border-gray-100 rounded-2xl focus:ring-wise-green/20 focus:border-wise-green transition-all duration-300 font-medium",
            error && "border-red-500 ring-red-500/10",
          )}
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Search className="size-5 text-gray-400" />
        </div>
      </div>

      {isReady && status === "OK" && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto overflow-x-hidden py-2 animate-in fade-in zoom-in-95 duration-200">
          {data.map((suggestion) => (
            <div
              key={suggestion.place_id}
              tabIndex={0}
              onClick={handleSelect(suggestion)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect(suggestion)(); }}
              className="px-5 py-3 hover:bg-wise-green/5 cursor-pointer flex items-start gap-3 group transition-colors"
            >
              <MapPin className="size-4 mt-0.5 text-gray-400 group-hover:text-wise-green" />
              <span className="text-[13px] font-medium text-near-black">
                {suggestion.description}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const LocationFieldError = ({
  name,
  errors,
}: {
  name: string;
  errors: Record<string, string>;
}) => {
  if (!errors[name]) return null;
  return (
    <m.p
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-[11px] font-black text-red-500 mt-1.5 flex items-center gap-1.5"
    >
      <AlertCircle className="size-3" /> {errors[name]}
    </m.p>
  );
};

const DEFAULT_ERRORS = {};

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  formData,
  setFormData,
  errors = DEFAULT_ERRORS,
}) => {
  const indianCities = useMemo(() => City.getCitiesOfCountry("IN") || [], []);
  const [citySearch, setCitySearch] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [targetField, setTargetField] = useState<"officeAddress" | "fieldArea">(
    "officeAddress",
  );

  const filteredCities = useMemo(() => {
    if (!citySearch) return indianCities.slice(0, 100);
    return indianCities
      .filter((city) =>
        city.name.toLowerCase().includes(citySearch.toLowerCase()),
      )
      .slice(0, 100);
  }, [citySearch, indianCities]);

  return (
    <div className="gap-y-10 pt-10 border-t border-gray-100">
      <div className="gap-y-1">
        <h2 className="text-[18px] font-black text-near-black">Location</h2>
        <p className="text-[12px] font-medium text-gray-400">
          Specify the primary work location for this role.
        </p>
      </div>

      <div className="gap-y-6">
        <div className="gap-y-4">
          <Label className="text-[13px] font-black text-near-black">
            Work location type *
          </Label>
          <div className="flex flex-wrap gap-3">
            {(["Work From Office", "Work From Home", "Field Job"] as const).map(
              (t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, locationType: t }))
                  }
                  className={cn(
                    "px-6 py-2.5 rounded-full text-[13px] font-bold border transition-all",
                    formData.locationType === t
                      ? "bg-wise-green border-wise-green text-near-black shadow-sm"
                      : "bg-white border-gray-100 text-gray-400 hover:border-gray-200",
                  )}
                >
                  {t}
                </button>
              ),
            )}
          </div>
          <LocationFieldError name="locationType" errors={errors} />
        </div>

        <AnimatePresence mode="wait">
          {formData.locationType === "Work From Office" && (
            <m.div
              key="office"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="gap-y-4"
            >
              <div className="gap-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-[13px] font-black text-near-black">
                    Office address / landmark *
                  </Label>
                  <button
                    type="button"
                    onClick={() => {
                      setTargetField("officeAddress");
                      setIsMapModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 text-[11px] font-black text-wise-green bg-near-black px-3 py-1.5 rounded-lg hover:bg-near-black/90 transition-colors shadow-sm"
                  >
                    <MapPin className="size-3" /> Select on Map
                  </button>
                </div>
                <AutocompleteInput
                  placeholder="Search for your address/locality"
                  value={formData.officeAddress || ""}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, officeAddress: val }))
                  }
                  onSelect={(val) =>
                    setFormData((prev) => ({ ...prev, officeAddress: val }))
                  }
                />
                <LocationFieldError name="officeAddress" errors={errors} />
              </div>
            </m.div>
          )}

          {formData.locationType === "Field Job" && (
            <m.div
              key="field"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="gap-y-3"
            >
              <div className="flex items-center justify-between">
                <Label className="text-[13px] font-black text-near-black">
                  Which area will the candidates be working in ? *
                </Label>
                <button
                  type="button"
                  onClick={() => {
                    setTargetField("fieldArea");
                    setIsMapModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 text-[11px] font-black text-wise-green bg-near-black px-3 py-1.5 rounded-lg hover:bg-near-black/90 transition-colors shadow-sm"
                >
                  <MapPin className="size-3" /> Select on Map
                </button>
              </div>
              <AutocompleteInput
                placeholder="Search for your address/locality"
                value={formData.fieldArea || ""}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, fieldArea: val }))
                }
                onSelect={(val) =>
                  setFormData((prev) => ({ ...prev, fieldArea: val }))
                }
              />
              <LocationFieldError name="fieldArea" errors={errors} />
            </m.div>
          )}

          {formData.locationType === "Work From Home" && (
            <m.div
              key="wfh"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="gap-y-3"
            >
              <Label className="text-[13px] font-black text-near-black">
                Job City *
              </Label>
              <div className="relative">
                <button
                  type="button"
                  tabIndex={0}
                  aria-expanded={showCityDropdown}
                  className="w-full h-12 px-5 bg-white border-gray-100 rounded-xl font-medium shadow-sm flex items-center justify-between cursor-pointer focus-within:ring-2 focus-within:ring-wise-green/20"
                  onClick={() => setShowCityDropdown(!showCityDropdown)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowCityDropdown(!showCityDropdown); }}
                >
                  <span
                    className={cn(
                      "text-[14px]",
                      !formData.jobCity && "text-gray-400",
                    )}
                  >
                    {formData.jobCity || "Select City"}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 text-gray-400 transition-transform",
                      showCityDropdown && "rotate-180",
                    )}
                  />
                </button>

                <AnimatePresence>
                  {showCityDropdown && (
                    <m.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden flex flex-col"
                    >
                      <div className="p-3 border-b border-gray-50 bg-gray-50/50">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                          <input
                            aria-label="Search city"
                            placeholder="Search city..."
                            className="w-full h-10 pl-10 pr-4 bg-white border-gray-200 rounded-lg text-[13px] outline-none focus:border-wise-green transition-colors"
                            value={citySearch}
                            onChange={(e) => setCitySearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>
                      <div className="max-h-60 overflow-y-auto py-1">
                        {filteredCities.length > 0 ? (
                          filteredCities.map((city) => (
                            <button
                              type="button"
                              key={`${city.name}-${city.latitude}`}
                              className="w-full text-left px-5 py-3 hover:bg-wise-green/5 cursor-pointer text-[13px] font-medium text-near-black transition-colors"
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  jobCity: city.name,
                                }));
                                setShowCityDropdown(false);
                                setCitySearch("");
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  setFormData((prev) => ({
                                    ...prev,
                                    jobCity: city.name,
                                  }));
                                  setShowCityDropdown(false);
                                  setCitySearch("");
                                }
                              }}
                            >
                              {city.name}, {city.stateCode}
                            </button>
                          ))
                        ) : (
                          <div className="px-5 py-8 text-center text-gray-400 text-[12px] font-bold">
                            No cities found
                          </div>
                        )}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
              <LocationFieldError name="jobCity" errors={errors} />
            </m.div>
          )}
        </AnimatePresence>
      </div>

      <MapSelectorModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        currentAddress={formData[targetField]}
        onSelect={(address) =>
          setFormData((prev) => ({ ...prev, [targetField]: address }))
        }
      />
    </div>
  );
};

"use client";

import ISO6391 from "iso-639-1";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import type { Language } from "@/context/profile-context";

interface LanguageFormProps {
  initialData?: Language;
  onSubmit: (formData: FormData) => void;
  submitLabel: string;
}

const LANGUAGES_LIST = ISO6391.getAllNames().sort();

export const LanguageForm = ({
  initialData,
  onSubmit,
  submitLabel,
}: LanguageFormProps) => {
  const proficiencyLevels = [
    { label: "Native", value: "Native" },
    { label: "C2 Expert", value: "C2" },
    { label: "C1 Advanced", value: "C1" },
    { label: "B2 Upper-Int", value: "B2" },
    { label: "B1 Basic", value: "B1" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialData?.name || "");
  const [selectedLanguage, setSelectedLanguage] = useState(
    initialData?.name || "",
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        // Reset query to selected language if search was left unfinished
        setSearchQuery(selectedLanguage);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedLanguage]);

  const filteredLanguages = LANGUAGES_LIST.filter((lang) =>
    lang.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const finalLanguage = selectedLanguage.trim() || searchQuery.trim();
    formData.set("name", finalLanguage || "English");

    onSubmit(formData);
  };

  const isSubmitDisabled = !selectedLanguage.trim() && !searchQuery.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Language Selector */}
        <div className="space-y-1.5">
          <label
            htmlFor="language-search"
            className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1"
          >
            Language Name
          </label>
          <div ref={containerRef} className="relative">
            <input
              id="language-search"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Search or type language..."
              className="w-full h-11 bg-gray-50 rounded-xl border border-gray-100 px-4 pr-10 text-[14px] font-bold focus:outline-none focus:border-wise-green transition-colors"
            />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="absolute left-0 right-0 top-full mt-1.5 max-h-60 overflow-y-auto bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
                {filteredLanguages.length > 0
                  ? filteredLanguages.map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => {
                          setSelectedLanguage(lang);
                          setSearchQuery(lang);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-[14px] font-bold transition-colors ${
                          selectedLanguage === lang
                            ? "bg-wise-green text-dark-green"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        {lang}
                      </button>
                    ))
                  : searchQuery.trim() && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedLanguage(searchQuery.trim());
                          setIsOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-[14px] font-bold text-wise-green hover:bg-gray-50 transition-colors"
                      >
                        Use &quot;{searchQuery.trim()}&quot; as custom language
                      </button>
                    )}
                {!filteredLanguages.length && !searchQuery.trim() && (
                  <div className="px-4 py-2.5 text-[13px] font-medium text-gray-400 text-center">
                    Type to search languages...
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 block">
          Proficiency Level
        </span>
        <div className="flex flex-wrap gap-2">
          {proficiencyLevels.map((level) => (
            <label key={level.value} className="cursor-pointer">
              <input
                type="radio"
                name="level"
                value={level.value}
                defaultChecked={
                  initialData?.level
                    ? initialData.level === level.value
                    : level.value === "B2"
                }
                className="hidden peer"
              />
              <span className="px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 text-[12px] font-bold text-gray-500 peer-checked:bg-wise-green peer-checked:text-dark-green peer-checked:border-wise-green transition-all block text-center min-w-[100px]">
                {level.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitDisabled}
        className="w-full h-12 bg-wise-green text-dark-green rounded-xl text-[14px] font-black shadow-md shadow-wise-green/10 transition-all hover:bg-wise-green/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitLabel}
      </Button>
    </form>
  );
};

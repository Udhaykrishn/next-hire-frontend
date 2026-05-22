"use client";

import { Download, FileText, Loader2, RefreshCw, Trash } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { ConfirmationModal } from "@/components/shared/confirmation-modal";
import { useProfile } from "@/hooks/use-profile";

const getFileName = (urlOrKey: string) => {
  if (!urlOrKey) return "Resume.pdf";
  const parts = urlOrKey.split("/");
  const lastPart = parts[parts.length - 1];
  // Remove the uploads/ and uuid prefixes if any
  return lastPart
    .replace(/^uploads\//, "")
    .replace(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}-/,
      "",
    );
};

export const ResumeUpload = () => {
  const {
    basicInfo,
    handleUploadResume,
    handleDeleteResume,
    isUploadingResume,
    isDeletingResume,
  } = useProfile();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const handleDropFiles = async (files: FileList) => {
    const file = files[0];
    if (!file) return;
    await processUpload(file);
  };

  const processUpload = async (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !["pdf", "doc", "docx"].includes(ext)) {
      toast.error("Only PDF, DOC, and DOCX formats are allowed");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Resume size must be less than 10MB");
      return;
    }

    try {
      await handleUploadResume(file);
    } catch (_err) {
      // error handled in hook
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processUpload(file);
  };

  const handleReplaceClick = () => {
    fileInputRef.current?.click();
  };

  const handleDelete = () => {
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsConfirmDeleteOpen(false);
    try {
      await handleDeleteResume();
    } catch (_err) {}
  };

  const resume = basicInfo?.resume;

  if (isUploadingResume) {
    return (
      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-wise-green/30 rounded-2xl bg-wise-green/5 gap-3">
        <Loader2 className="w-8 h-8 text-wise-green animate-spin" />
        <p className="text-[14px] font-bold text-wise-green">
          Uploading resume...
        </p>
      </div>
    );
  }

  if (isDeletingResume) {
    return (
      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-red-200 rounded-2xl bg-red-50/50 gap-3">
        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
        <p className="text-[14px] font-bold text-red-500">Deleting resume...</p>
      </div>
    );
  }

  if (resume?.url) {
    const fileName = getFileName(resume.key || resume.url);
    const fileExtension = fileName.split(".").pop()?.toLowerCase() || "pdf";

    return (
      <>
        <div className="space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="hidden"
          />
          <div className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-100 rounded-2xl relative group/item">
            <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-wise-green shadow-sm shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-bold text-gray-900 truncate pr-4">
                {fileName}
              </p>
              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                {fileExtension} document
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <a
              href={resume.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-50 hover:bg-gray-100 text-gray-700 text-[12px] font-black rounded-xl border border-gray-100 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              View
            </a>
            <button
              type="button"
              onClick={handleReplaceClick}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-50 hover:bg-gray-100 text-gray-700 text-[12px] font-black rounded-xl border border-gray-100 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Replace
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 text-[12px] font-black rounded-xl border border-red-100 transition-all"
            >
              <Trash className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        </div>

        <ConfirmationModal
          isOpen={isConfirmDeleteOpen}
          onClose={() => setIsConfirmDeleteOpen(false)}
          title="Delete Resume"
          description="Are you sure you want to permanently delete your resume? This action cannot be undone."
          onConfirm={handleConfirmDelete}
          variant="destructive"
          confirmText="Yes, Delete"
          cancelText="No, Keep Resume"
        />
      </>
    );
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx"
        className="hidden"
      />
      <FileUpload.Root>
        <FileUpload.DropZone
          onDropFiles={handleDropFiles}
          accept=".pdf,.doc,.docx"
          allowsMultiple={false}
          hint="PDF, DOC, DOCX (max. 10MB)"
          className="!bg-gray-50/50 !ring-gray-100 hover:!ring-wise-green/30 transition-all border-2 border-dashed border-gray-100"
        />
      </FileUpload.Root>
    </div>
  );
};

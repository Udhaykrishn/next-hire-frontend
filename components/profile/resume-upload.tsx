"use client";

import { useState } from "react";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  failed?: boolean;
}

const uploadFile = (_file: File, onProgress: (progress: number) => void) => {
  // Simulated upload logic for the demo
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 30) + 10;
    if (progress >= 100) {
      progress = 100;
      onProgress(progress);
      clearInterval(interval);
    } else {
      onProgress(progress);
    }
  }, 300);
};

export const ResumeUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleDropFiles = (files: FileList) => {
    const newFiles = Array.from(files);
    const newFilesWithIds = newFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      type: file.name.split(".").pop()?.toLowerCase() || "pdf",
      progress: 0,
      fileObject: file,
    }));

    // We only allow one resume for now, so we replace the list
    setUploadedFiles(
      newFilesWithIds.map(({ fileObject: _, ...file }) => file as UploadedFile),
    );

    newFilesWithIds.forEach(({ id, fileObject }) => {
      uploadFile(fileObject, (progress) => {
        setUploadedFiles((prev) =>
          prev.map((uploadedFile) =>
            uploadedFile.id === id
              ? { ...uploadedFile, progress }
              : uploadedFile,
          ),
        );
      });
    });
  };

  const handleDeleteFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleRetryFile = (id: string) => {
    const file = uploadedFiles.find((f) => f.id === id);
    if (!file) return;

    uploadFile(new File([], file.name, { type: file.type }), (progress) => {
      setUploadedFiles((prev) =>
        prev.map((uploadedFile) =>
          uploadedFile.id === id
            ? { ...uploadedFile, progress, failed: false }
            : uploadedFile,
        ),
      );
    });
  };

  return (
    <FileUpload.Root className="mt-4">
      <FileUpload.DropZone
        onDropFiles={handleDropFiles}
        accept=".pdf,.doc,.docx"
        allowsMultiple={false}
        hint="PDF, DOC, DOCX (max. 10MB)"
        className="!bg-gray-50/50 !ring-gray-100 hover:!ring-wise-green/30 transition-all border-2 border-dashed border-gray-100"
      />

      <FileUpload.List>
        {uploadedFiles.map((file) => (
          <FileUpload.ListItemProgressBar
            key={file.id}
            {...file}
            type={file.type}
            onDelete={() => handleDeleteFile(file.id)}
            onRetry={() => handleRetryFile(file.id)}
            className="bg-white shadow-sm border border-gray-100"
          />
        ))}
      </FileUpload.List>
    </FileUpload.Root>
  );
};

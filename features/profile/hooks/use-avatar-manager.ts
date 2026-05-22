"use client";

import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { type Area, getCroppedImg } from "../utils/crop-image";

interface UseAvatarManagerParams {
  handleUploadAvatar: (file: File) => Promise<void>;
  handleDeleteAvatar: () => Promise<void>;
  avatarUrl: string;
}

export function useAvatarManager({
  handleUploadAvatar,
  handleDeleteAvatar,
  avatarUrl,
}: UseAvatarManagerParams) {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openUploadModal = useCallback(() => {
    setSelectedImage(null);
    setSelectedFileName("");
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setIsUploadOpen(true);
  }, []);

  const closeUploadModal = useCallback(() => {
    setIsUploadOpen(false);
    setSelectedImage(null);
    setSelectedFileName("");
  }, []);

  const onCropComplete = useCallback((_croppedArea: unknown, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Only JPG and PNG image files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setSelectedFileName(file.name);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setSelectedImage(reader.result as string);
    });
    reader.readAsDataURL(file);
  }, []);

  const handleUpload = useCallback(async () => {
    if (!selectedImage || !croppedAreaPixels) {
      toast.error("Please crop the image first");
      return;
    }

    setIsUploading(true);
    try {
      const croppedBlob = await getCroppedImg(selectedImage, croppedAreaPixels);
      const file = new File([croppedBlob], selectedFileName || "avatar.jpg", {
        type: "image/jpeg",
      });
      await handleUploadAvatar(file);
      setIsUploadOpen(false);
      setSelectedImage(null);
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Failed to crop or upload image");
    } finally {
      setIsUploading(false);
    }
  }, [selectedImage, croppedAreaPixels, selectedFileName, handleUploadAvatar]);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      await handleDeleteAvatar();
      setIsDeleteOpen(false);
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Failed to delete profile image");
    } finally {
      setIsDeleting(false);
    }
  }, [handleDeleteAvatar]);

  return {
    isUploadOpen,
    setIsUploadOpen,
    isPreviewOpen,
    setIsPreviewOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    selectedImage,
    setSelectedImage,
    selectedFileName,
    crop,
    setCrop,
    zoom,
    setZoom,
    croppedAreaPixels,
    isUploading,
    isDeleting,
    fileInputRef,
    openUploadModal,
    closeUploadModal,
    onCropComplete,
    handleFileSelect,
    handleUpload,
    handleDelete,
  };
}

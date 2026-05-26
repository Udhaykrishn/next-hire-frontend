"use client";

import { Check, Eye, Trash2, Upload, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAvatarManager } from "@/features/profile/hooks/use-avatar-manager";

interface ProfileAvatarModalProps {
  avatarUrl: string;
  name: string;
  handleUploadAvatar: (file: File) => Promise<void>;
  handleDeleteAvatar: () => Promise<void>;
  isUploading: boolean;
  isDeleting: boolean;
}

export function ProfileAvatarModal({
  avatarUrl,
  name,
  handleUploadAvatar,
  handleDeleteAvatar,
  isUploading: isUploadingProp,
  isDeleting: isDeletingProp,
}: ProfileAvatarModalProps) {
  const {
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
    isUploading,
    isDeleting,
    fileInputRef,
    openUploadModal,
    closeUploadModal,
    onCropComplete,
    handleFileSelect,
    handleUpload,
    handleDelete,
  } = useAvatarManager({
    handleUploadAvatar,
    handleDeleteAvatar,
  });

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
      <button
        type="button"
        onClick={openUploadModal}
        disabled={isUploading || isUploadingProp}
        title="Upload Image"
        className="size-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-wise-green/30 hover:bg-wise-green/5 text-gray-700 hover:text-wise-green transition-all disabled:opacity-50"
      >
        <Upload className="size-4" />
      </button>

      {avatarUrl && (
        <>
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            title="Preview"
            className="size-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-wise-green/30 hover:bg-wise-green/5 text-gray-700 hover:text-wise-green transition-all"
          >
            <Eye className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsDeleteOpen(true)}
            disabled={isDeleting || isDeletingProp}
            title="Delete Image"
            className="size-10 flex items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all border border-transparent hover:border-red-200 disabled:opacity-50"
          >
            <Trash2 className="size-4" />
          </button>
        </>
      )}

      <input aria-label="Control"
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
      />

      {/* Upload & Crop Modal */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogPanel className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Update Profile Image</DialogTitle>
            <DialogDescription>
              {!selectedImage
                ? "Select or drag a new image to crop and set as your profile avatar."
                : "Reposition, zoom, and crop your image to get the perfect fit."}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            {!selectedImage ? (
              <div
                onDragOver={onDragOver}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-200 hover:border-wise-green/50 hover:bg-wise-green/[0.01] rounded-[2rem] p-10 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-4 group"
              >
                <div className="size-14 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:scale-105 transition-transform shadow-sm">
                  <Upload className="size-6 text-gray-400 group-hover:text-wise-green transition-colors" />
                </div>
                <div className="gap-y-1.5">
                  <p className="text-[15px] font-black text-gray-900">
                    Drag and drop or click to upload
                  </p>
                  <p className="text-[12px] font-bold text-gray-400">
                    Supports JPG, PNG (Max 5MB)
                  </p>
                </div>
                <div className="text-[11px] font-medium text-gray-500 italic max-w-sm">
                  Tip: A square profile picture with clear lighting works best
                  for professional profiles.
                </div>
              </div>
            ) : (
              <div className="gap-y-6">
                <div className="relative w-full h-80 bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 shadow-inner">
                  <Cropper
                    image={selectedImage}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                </div>

                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <ZoomOut className="size-5 text-gray-400 shrink-0" />
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.05}
                    aria-label="Zoom"
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-wise-green"
                  />
                  <ZoomIn className="size-5 text-gray-400 shrink-0" />
                </div>

                <div className="flex items-center justify-between text-[12px] text-gray-500">
                  <span>
                    File:{" "}
                    <strong className="text-gray-700">
                      {selectedFileName}
                    </strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="text-red-500 hover:underline font-bold"
                  >
                    Select different image
                  </button>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={closeUploadModal}
              className="h-10 px-6 rounded-xl font-bold border-gray-200 text-gray-700"
            >
              Cancel
            </Button>
            {selectedImage && (
              <Button
                type="button"
                onClick={handleUpload}
                disabled={isUploading || isUploadingProp}
                className="h-10 px-6 rounded-xl bg-wise-green text-dark-green font-black flex items-center gap-2 shadow-lg shadow-wise-green/10"
              >
                {isUploading || isUploadingProp ? (
                  <div className="size-4 border-2 border-dark-green border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Check className="size-4" />
                )}
                Save Image
              </Button>
            )}
          </DialogFooter>
        </DialogPanel>
      </Dialog>

      {/* Image Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogPanel className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Profile Preview</DialogTitle>
            <DialogDescription>{name}'s profile photo</DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex justify-center">
            <div className="relative size-64 rounded-[3rem] bg-gray-50 border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center">
              <Image
                src={avatarUrl}
                alt={name}
                width={256}
                height={256}
                unoptimized
                className="size-full object-cover"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsPreviewOpen(false)}
              className="h-10 px-6 rounded-xl font-bold border-gray-200 text-gray-700 w-full sm:w-auto"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogPanel>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogPanel className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">
              Delete Profile Image
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete your profile photo?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              className="h-10 px-6 rounded-xl font-bold border-gray-200 text-gray-700"
            >
              No, Keep Image
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting || isDeletingProp}
              className="h-10 px-6 rounded-xl font-black flex items-center gap-2"
            >
              {isDeleting || isDeletingProp ? (
                <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Trash2 className="size-4" />
              )}
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogPanel>
      </Dialog>
    </div>
  );
}

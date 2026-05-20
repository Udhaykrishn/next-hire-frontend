"use client";

import { MapPin } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GoogleMapPicker } from "./google-map-picker";

interface MapSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (address: string) => void;
  currentAddress?: string;
}

export const MapSelectorModal: React.FC<MapSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  currentAddress,
}) => {
  const [selectedAddress, setSelectedAddress] = useState(currentAddress || "");

  const handleLocationChange = (address: string) => {
    setSelectedAddress(address);
  };

  const handleConfirm = () => {
    if (selectedAddress) {
      onSelect(selectedAddress);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden rounded-3xl border-none shadow-2xl">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-[20px] font-black text-near-black flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-wise-green/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-wise-green" />
            </div>
            Select Office Location
          </DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <GoogleMapPicker
            height="450px"
            defaultValue={currentAddress}
            onLocationChange={handleLocationChange}
          />

          {selectedAddress && (
            <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 animate-in fade-in slide-in-from-top-2">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Selected Address
              </p>
              <p className="text-[14px] font-medium text-near-black leading-tight line-clamp-2">
                {selectedAddress}
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="p-6 bg-gray-50/50 flex sm:justify-between items-center gap-4">
          <p className="text-[11px] font-bold text-gray-400 max-w-[250px]">
            Drag the green pin to pinpoint your office. Powered by official
            Google Maps.
          </p>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={onClose}
              className="rounded-full px-6 h-12 font-bold text-gray-500 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!selectedAddress}
              className="rounded-full px-8 h-12 font-bold bg-wise-green text-near-black hover:bg-wise-green/90 shadow-lg shadow-wise-green/20"
            >
              Apply Address
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

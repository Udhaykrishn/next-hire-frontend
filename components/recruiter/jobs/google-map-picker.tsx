"use client";

import {
  Map,
  type MapMouseEvent,
  Marker, // Switching to standard Marker for maximum compatibility
  useApiIsLoaded,
} from "@vis.gl/react-google-maps";
import { Loader2 } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";

interface GoogleMapPickerProps {
  defaultValue?: string;
  onLocationChange: (
    address: string,
    position: { lat: number; lng: number },
  ) => void;
  height?: string;
}

const MUMBAI_CENTER = { lat: 19.076, lng: 72.8777 };

export const GoogleMapPicker: React.FC<GoogleMapPickerProps> = ({
  defaultValue,
  onLocationChange,
  height = "400px",
}) => {
  const isLoaded = useApiIsLoaded();
  const [markerPos, setMarkerPos] = useState(MUMBAI_CENTER);
  const [loading, setLoading] = useState(false);
  const [hasLocated, setHasLocated] = useState(false);

  // Auto-geocode default address
  useEffect(() => {
    if (isLoaded && defaultValue && !hasLocated) {
      const initFromAddress = async () => {
        try {
          const results = await getGeocode({ address: defaultValue });
          const { lat, lng } = await getLatLng(results[0]);
          const pos = { lat, lng };
          setMarkerPos(pos);
          setHasLocated(true);
        } catch (_e) {
          console.warn("Could not find default address on map");
        }
      };
      initFromAddress();
    }
  }, [isLoaded, defaultValue, hasLocated]);

  const handleGeocode = useCallback(
    async (pos: { lat: number; lng: number }) => {
      if (typeof window === "undefined" || !window.google) return;
      setLoading(true);
      try {
        const results = await getGeocode({ location: pos });
        if (results?.[0]) {
          onLocationChange(results[0].formatted_address, pos);
        }
      } catch (error) {
        console.error("Geocoding error:", error);
      } finally {
        setLoading(false);
      }
    },
    [onLocationChange],
  );

  // GPS Fallback
  useEffect(() => {
    if (isLoaded && !defaultValue && !hasLocated && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMarkerPos(pos);
          handleGeocode(pos);
          setHasLocated(true);
        },
        () => {
          handleGeocode(MUMBAI_CENTER);
          setHasLocated(true);
        },
      );
    }
  }, [isLoaded, defaultValue, hasLocated, handleGeocode]);

  const handleMapClick = useCallback(
    (e: MapMouseEvent) => {
      if (!e.detail.latLng) return;
      const newPos = { lat: e.detail.latLng.lat, lng: e.detail.latLng.lng };
      setMarkerPos(newPos);
      handleGeocode(newPos);
    },
    [handleGeocode],
  );

  const onMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setMarkerPos(newPos);
    handleGeocode(newPos);
  };

  if (!isLoaded) {
    return (
      <div
        style={{ height }}
        className="w-full bg-gray-50 flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100"
      >
        <Loader2 className="w-8 h-8 text-wise-green animate-spin" />
        <p className="text-[13px] font-bold text-gray-400">
          Loading Map Service...
        </p>
      </div>
    );
  }

  return (
    <div
      style={{ height }}
      className="w-full relative rounded-2xl overflow-hidden border border-gray-100 shadow-inner"
    >
      <Map
        style={{ width: "100%", height: "100%" }}
        defaultCenter={markerPos}
        center={markerPos}
        defaultZoom={15}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        onClick={handleMapClick}
      >
        <Marker
          position={markerPos}
          draggable={true}
          onDragEnd={onMarkerDragEnd}
        />
      </Map>

      <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-100 pointer-events-auto">
          <p className="text-[10px] font-black text-near-black">
            Click anywhere to select location
          </p>
        </div>
        {loading && (
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2 border border-gray-100 pointer-events-auto">
            <Loader2 className="w-3 h-3 text-wise-green animate-spin" />
            <span className="text-[11px] font-black text-near-black">
              Finding Address...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

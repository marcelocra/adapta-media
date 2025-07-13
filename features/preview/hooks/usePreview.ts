import { useState, useEffect, useRef } from "react";
import type { Ad } from "@/features/ads/types";
import { getAllAds } from "@/features/ads/api/ads";
import { initializeCamera, stopCamera } from "@/lib/camera";
import { useLanguage } from "@/components/LanguageProvider";

export function usePreview() {
  const [activeAd, setActiveAd] = useState<Ad | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ads = getAllAds();
    if (ads.length > 0) {
      setActiveAd(ads[0]);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (cameraStream) {
        stopCamera(cameraStream);
      }
    };
  }, [cameraStream]);

  const toggleCamera = async () => {
    if (isCameraOn && cameraStream) {
      stopCamera(cameraStream);
      setCameraStream(null);
      setIsCameraOn(false);
      setCameraError(null);
    } else {
      const result = await initializeCamera();
      if (result.stream && videoRef.current) {
        setCameraStream(result.stream);
        videoRef.current.srcObject = result.stream;
        setIsCameraOn(true);
        setCameraError(null);
      } else {
        setCameraError(result.error);
        setIsCameraOn(false);
      }
    }
  };

  const handleNextAd = () => {
    const ads = getAllAds();
    if (!activeAd || ads.length === 0) return;
    const currentIndex = ads.findIndex((ad) => ad.id === activeAd.id);
    const nextIndex = (currentIndex + 1) % ads.length;
    setActiveAd(ads[nextIndex]);
  };

  return {
    activeAd,
    videoRef,
    cameraError,
    isCameraOn,
    t,
    toggleCamera,
    handleNextAd,
  };
}

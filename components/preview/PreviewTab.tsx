"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff, Play, Pause } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { getAllAds } from "@/lib/ads";
import { initializeCamera, stopCamera } from "@/lib/camera";
import type { Ad } from "@/types";
import WebcamFeed from "./Webcam";
import { Display } from "./display/display";

export function PreviewTab() {
  const [activeAd, setActiveAd] = useState<Ad | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    // Set first ad as active by default
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

  return (
    <div className="grid grid-cols-12 ">
      <div className="col-span-8 dark:bg-gray-900 p-4">
        <Display />
      </div>
      <div className="col-span-4 dark:bg-gray-900 p-4">
        <WebcamFeed />
      </div>
    </div>
  );
}

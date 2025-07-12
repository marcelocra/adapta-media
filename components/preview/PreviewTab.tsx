"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff, Play, Pause } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { getAllAds } from "@/lib/ads";
import { initializeCamera, stopCamera } from "@/lib/camera";
import type { Ad } from "@/types";

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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {t.preview.activeAd}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const ads = getAllAds();
                const currentIndex = ads.findIndex(
                  (ad) => ad.id === activeAd?.id,
                );
                const nextIndex = (currentIndex + 1) % ads.length;
                setActiveAd(ads[nextIndex]);
              }}
            >
              Next Ad
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeAd ? (
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                <h3 className="text-xl font-bold mb-2">{activeAd.title}</h3>
                <p className="text-blue-100">{activeAd.campaign}</p>
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <span>
                    {activeAd.impressions.toLocaleString()} impressions
                  </span>
                  <span>{activeAd.clicks.toLocaleString()} clicks</span>
                  <span>{activeAd.ctr.toFixed(2)}% CTR</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              {t.preview.noActiveAd}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {t.preview.cameraPreview}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleCamera}
              className="flex items-center gap-2"
            >
              {isCameraOn ? (
                <>
                  <CameraOff className="h-4 w-4" />
                  Stop
                </>
              ) : (
                <>
                  <Camera className="h-4 w-4" />
                  Start
                </>
              )}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            {cameraError ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground text-center">
                  {t.preview.cameraError}: {cameraError}
                </p>
              </div>
            ) : isCameraOn ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Click "Start" to begin camera preview
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

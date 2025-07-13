"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff } from "lucide-react";
import { usePreview } from "@/features/preview/hooks/usePreview";

export function PreviewTab() {
  const {
    activeAd,
    videoRef,
    cameraError,
    isCameraOn,
    t,
    toggleCamera,
    handleNextAd,
  } = usePreview();

  return (
    <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {t.preview.activeAd}
            <Button variant="outline" size="sm" onClick={handleNextAd}>
              {t.preview.nextAdButton}
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
                    {activeAd.impressions.toLocaleString()}{" "}
                    {t.preview.impressions}
                  </span>
                  <span>
                    {activeAd.clicks.toLocaleString()} {t.preview.clicks}
                  </span>
                  <span>
                    {activeAd.ctr.toFixed(2)}% {t.preview.ctr}
                  </span>
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
                  {t.preview.stopCamera}
                </>
              ) : (
                <>
                  <Camera className="h-4 w-4" />
                  {t.preview.startCamera}
                </>
              )}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden lg:h-[400px]">
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
                    {t.preview.cameraPlaceholder}
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

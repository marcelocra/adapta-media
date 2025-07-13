import React, { useState, useEffect, useCallback, useRef } from "react";
import { Ads } from "./mock";
import { useWebcam } from "@/context/WebCamContext";
import { IWebcamData } from "@/interfaces/webcam";
import { API_URL } from "@/lib/utils";
import { IDisplayCreateRequest } from "@/interfaces/display";
import { IAd } from "@/interfaces/ads";

export const Display = ({ data = Ads }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const currentItem = data[currentIndex];

  // Determine display duration
  const getDisplayDuration = (item: IAd) => {
    return 5;
  };

  const { webCamData } = useWebcam();
  const webCamDataRef = useRef(webCamData);

  useEffect(() => {
    webCamDataRef.current = webCamData;
  }, [webCamData]);

  const logItemShowed = useCallback(async () => {
    console.clear();

    const webcamLogs: IWebcamData | null = webCamDataRef.current;

    if (!webcamLogs?.yolo_summary || webcamLogs?.deepface_summary) return;

    const body: IDisplayCreateRequest = {
      webcam: {
        yolo: webcamLogs?.yolo_summary,
        deepface: webcamLogs?.deepface_summary as any,
      },
      type: currentItem.type,
      title: String(currentItem?.title),
      description: String(currentItem?.description),
      duration: getDisplayDuration(currentItem),
      index: currentIndex,
      external_id: String(currentItem._id),
    };

    console.log("Showed", body);
    console.log(JSON.stringify(body));

    if (body) {
      return;
    }

    try {
      const response = await fetch(`http://${API_URL}/display`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Erro ${response.status}: ${error}`);
      }

      const result = await response.json();
      console.log("Detecção enviada com sucesso:", result);
    } catch (error) {
      console.error("Erro ao enviar detecção:", error);
    }
  }, [currentItem, currentIndex]);

  useEffect(() => {
    if (data.length === 0) return;

    const currentAd = data[currentIndex % data.length];
    const duration = getDisplayDuration(currentAd);
    setTimeRemaining(duration);

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // logItemShowed();
          setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, data]);

  if (!currentItem) return null;

  const renderAdvertisement = (adData: IAd) => {
    const videoSource = adData.source;

    return (
      <div className="relative w-full h-full bg-black overflow-hidden">
        {/* Video */}
        {videoSource ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop={false}
            playsInline
            src={videoSource}
            onError={(e) => {
              console.error("Video loading error:", e);
              // Fallback to placeholder if video fails to load
              // e.target.style.display = "none";
            }}
          />
        ) : (
          /* Fallback placeholder if no video source */
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-black text-2xl font-bold">▶</span>
              </div>
              <h2 className="text-white text-4xl md:text-6xl font-bold tracking-wider">
                {adData.title}
              </h2>
              <div className="text-white/80 text-lg">
                Advertisement • {adData.seconds}s
              </div>
            </div>
          </div>
        )}

        {/* Progress bar overlay */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-2 z-10">
          <span className="text-white/70 text-sm bg-black/50 px-2 py-1 rounded">
            {timeRemaining}s
          </span>
          <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400 transition-all duration-1000 ease-linear"
              style={{
                width: `${
                  (1 - timeRemaining / getDisplayDuration(currentItem)) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
        {renderAdvertisement(currentItem)}
      </div>
      <div className="flex flex-col items-center">
        <div className="text-sm font-bold text-center">{currentItem.title}</div>
        <div className="text-xs text-center">{currentItem.description}</div>
      </div>
    </>
  );
};

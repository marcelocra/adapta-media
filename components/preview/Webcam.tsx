"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useWebcam } from "@/context/WebCamContext";
import { IWebcamData, IWebcamDataDetection } from "@/interfaces/webcam";
import { API_URL } from "@/lib/utils";

export default function WebcamFeed() {
  const [fps, setFps] = useState(0);

  const [detectionInfo, setDetectionInfo] = useState("Aguardando detecção...");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number>();
  const fpsCounterRef = useRef(0);
  const fpsTimerRef = useRef(Date.now());
  const videoSizeRef = useRef({ width: 640, height: 480 });
  const currentDetectionsRef = useRef<IWebcamDataDetection[]>([]);

  // Initialize webcam
  const initWebcam = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoSizeRef.current = {
              width: videoRef.current.videoWidth,
              height: videoRef.current.videoHeight,
            };

            const canvas = canvasRef.current;
            if (canvas) {
              const aspectRatio =
                videoSizeRef.current.width / videoSizeRef.current.height;
              canvas.width = 640;
              canvas.height = 640 / aspectRatio;
            }

            drawVideoFrame();
          }
        };
      }
    } catch (error) {
      console.error("Erro ao acessar webcam:", error);
      drawPlaceholder();
    }
  }, []);

  // Draw video frame with bounding boxes
  const drawVideoFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Draw bounding boxes if they exist
    if (currentDetectionsRef.current.length > 0) {
      drawBoundingBoxes(ctx, currentDetectionsRef.current);
    }

    // Update FPS
    updateFPS();

    animationRef.current = requestAnimationFrame(drawVideoFrame);
  }, []);

  const { setWebCamData } = useWebcam();

  // Draw bounding boxes
  const drawBoundingBoxes = useCallback(
    (ctx: CanvasRenderingContext2D, detections: IWebcamDataDetection[]) => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      detections.forEach((detection, index) => {
        const [x1, y1, x2, y2] = detection.bbox;

        // Calculate correct scale factors
        const scaleX = canvas.width / videoSizeRef.current.width;
        const scaleY = canvas.height / videoSizeRef.current.height;

        // Apply scale to coordinates
        const scaledX1 = x1 * scaleX;
        const scaledY1 = y1 * scaleY;
        const scaledX2 = x2 * scaleX;
        const scaledY2 = y2 * scaleY;

        const width = scaledX2 - scaledX1;
        const height = scaledY2 - scaledY1;

        // Configure bounding box style
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 3;
        ctx.font = "bold 16px Arial";

        // Draw bounding box
        ctx.strokeRect(scaledX1, scaledY1, width, height);

        // Prepare label
        const confidence = Math.round(detection.confidence * 100);
        const label = `Pessoa ${index + 1} (${confidence}%)`;

        // Measure text for background
        const textMetrics = ctx.measureText(label);
        const textWidth = textMetrics.width;
        const textHeight = 22;

        // Label position (above box, or inside if doesn't fit)
        const labelY =
          scaledY1 > textHeight ? scaledY1 - 2 : scaledY1 + textHeight;

        // Draw label background
        ctx.fillStyle = "#00ff00";
        ctx.fillRect(scaledX1, labelY - textHeight, textWidth + 10, textHeight);

        // Draw label text
        ctx.fillStyle = "#000000";
        ctx.fillText(label, scaledX1 + 5, labelY - 5);

        // Draw center point
        const centerX = scaledX1 + width / 2;
        const centerY = scaledY1 + height / 2;
        ctx.fillStyle = "#ff0000";
        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
        ctx.fill();
      });
    },
    [],
  );

  // Update FPS counter
  const updateFPS = useCallback(() => {
    fpsCounterRef.current++;
    const now = Date.now();
    if (now - fpsTimerRef.current >= 1000) {
      setFps(fpsCounterRef.current);
      fpsCounterRef.current = 0;
      fpsTimerRef.current = now;
    }
  }, []);

  // Draw placeholder when webcam fails
  const drawPlaceholder = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#374151";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      "📹 Webcam não disponível",
      canvas.width / 2,
      canvas.height / 2,
    );
    ctx.fillText(
      "Use o sistema mesmo assim!",
      canvas.width / 2,
      canvas.height / 2 + 40,
    );
    ctx.textAlign = "left";
  }, []);

  // Handle audience updates
  const handleAudienceUpdate = useCallback((data: IWebcamData["yolo"]) => {
    // Update video dimensions if available
    if (data.frame_size) {
      videoSizeRef.current = {
        width: data.frame_size.width,
        height: data.frame_size.height,
      };
    }

    // Update detections for bounding boxes
    if (data.detections && data.detections.length > 0) {
      currentDetectionsRef.current = data.detections;
    } else {
      currentDetectionsRef.current = [];
    }

    if (data.count > 0) {
      setDetectionInfo(
        `👥 ${data.count} pessoas detectadas | Confiança: ${(
          data.confidence * 100
        ).toFixed(1)}% | ${new Date(data.timestamp).toLocaleTimeString()}`,
      );
    } else {
      setDetectionInfo("Aguardando detecção...");
    }
  }, []);

  // Initialize WebSocket
  const initWebSocket = useCallback(() => {
    try {
      wsRef.current = new WebSocket(`ws://${API_URL}/ws`);

      wsRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "audience_update") {
          setWebCamData(message);
          handleAudienceUpdate(message.yolo);
        }
      };

      wsRef.current.onopen = () => {
        console.log("WebSocket conectado");
      };

      wsRef.current.onclose = () => {
        console.log("WebSocket desconectado");
      };

      wsRef.current.onerror = (error) => {
        console.error("Erro WebSocket:", error);
      };
    } catch (error) {
      console.error("Erro ao conectar WebSocket:", error);
    }
  }, [handleAudienceUpdate]);

  // Start detection
  const startDetection = useCallback(async (businessType: string) => {
    try {
      await fetch(`http://${API_URL}/api/start-detection`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business_type: businessType }),
      });
    } catch (error) {
      console.error("Erro ao iniciar detecção:", error);
    }
  }, []);

  // Initialize everything on component mount
  useEffect(() => {
    initWebcam();
    initWebSocket();

    return () => {
      // Cleanup
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [initWebcam, initWebSocket]);

  // Auto-start detection for restaurant
  useEffect(() => {
    startDetection("restaurant");
  }, [startDetection]);

  return (
    <div className="relative rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-96 object-cover"
        width={640}
        height={480}
      />
      <video ref={videoRef} className="hidden" autoPlay muted playsInline />
      <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg text-sm font-medium">
        {detectionInfo}
      </div>
    </div>
  );
}

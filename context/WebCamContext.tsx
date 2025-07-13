"use client";

import { IWebcamData } from "@/interfaces/webcam";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface WebcamContextType {
  // person: number;
  // setPerson: (person: number) => void;
  webCamData: IWebcamData | null;
  setWebCamData: (data: IWebcamData) => void;
}

const WebcamContext = createContext<WebcamContextType | undefined>(undefined);

interface WebcamProviderProps {
  children: ReactNode;
}

export function WebcamProvider({ children }: WebcamProviderProps) {
  const [webCamData, setWebCamData] = useState<IWebcamData | null>(null);

  return (
    <WebcamContext.Provider value={{ webCamData, setWebCamData }}>
      {children}
    </WebcamContext.Provider>
  );
}

export function useWebcam() {
  const context = useContext(WebcamContext);
  if (!context) {
    throw new Error("useWebcam need WebcamProvider");
  }
  return context;
}

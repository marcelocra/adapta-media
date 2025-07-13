export interface IWebcamDataDetection {
  bbox: [number, number, number, number];
  confidence: number;
  class: string;
}

export interface IYoloData {
  count: number;
  timestamp: string;
  confidence: number;
  detections: IWebcamDataDetection[];
  frame_size: {
    width: number;
    height: number;
  };
}

export interface IYoloSummary {
  total: number;
  confidence: number;
}

export interface IDeepfaceData {
  face_index: number;
  age: number;
  gender: Record<string, number>;
  race: Record<string, number>;
  emotion: Record<string, number>;
}

export interface IDeepfaceSummary {
  gender: Record<string, number>;
  race: Record<string, number>;
  emotion: Record<string, number>;
  men: number;
  women: number;
  total: number;
  age: {
    max: number;
    min: number;
    average: number;
  };
}

export interface IWebcamData {
  type: string;
  yolo: IYoloData;
  yolo_summary: IYoloSummary;
  deepface: IDeepfaceData[];
  deepface_summary: IDeepfaceSummary;
}

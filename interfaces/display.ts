import { IApiPagination } from "./pagination";

export interface IDisplayCreateRequest {
  webcam: {
    yolo: {
      total: number;
      confidence: number;
    };
    deepface: {
      gender: {
        Woman: number;
        Man: number;
      };
      race: {
        asian: number;
        indian: number;
        black: number;
        white: number;
        "middle eastern": number;
        "latino hispanic": number;
      };
      emotion: {
        angry: number;
        disgust: number;
        fear: number;
        happy: number;
        sad: number;
        surprise: number;
        neutral: number;
      };
      men: number;
      women: number;
      total: number;
      age: {
        max: number;
        min: number;
        average: number;
      };
    };
  };
  type: string;
  title: string;
  description: string;
  duration: number;
  index: number;
  external_id: string;
}

export interface IApiDisplayRecord {
  _id: string;
  webcam: {
    yolo: {
      total: number;
      confidence: number;
    };
    deepface: {
      gender: {
        Woman: number;
        Man: number;
      };
      race: {
        asian: number;
        indian: number;
        black: number;
        white: number;
        "middle eastern": number;
        "latino hispanic": number;
      };
      emotion: {
        angry: number;
        disgust: number;
        fear: number;
        happy: number;
        sad: number;
        surprise: number;
        neutral: number;
      };
      men: number;
      women: number;
      total: number;
      age: {
        max: number;
        min: number;
        average: number;
      };
    };
  };
  type: string;
  title: string;
  description: string;
  duration: number;
  index: number;
  external_id: string;
  timestamp: string;
  status: string;
  insights?: string;
  copywriter?: string;
}

export interface IApiDisplaysResponse extends IApiPagination {
  records: IApiDisplayRecord[];
}

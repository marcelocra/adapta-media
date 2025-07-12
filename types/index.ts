export interface Ad {
  id: string;
  title: string;
  campaign: string;
  status: "active" | "paused" | "completed";
  impressions: number;
  clicks: number;
  ctr: number;
  spend: number;
  conversions: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export interface FilterOptions {
  status?: Ad["status"][];
  campaign?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export type Language = "pt" | "en";

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

export interface FilterOptions {
  status?: Ad["status"][];
  campaign?: string;
  searchQuery?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

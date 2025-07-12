import type { Ad, FilterOptions } from "@/types";

// Mock data for demonstration
const mockAds: Ad[] = [
  {
    id: "1",
    title: "Black Friday Sale - Electronics",
    campaign: "Holiday Campaign 2024",
    status: "active",
    impressions: 125000,
    clicks: 3250,
    ctr: 2.6,
    spend: 1850.0,
    conversions: 165,
    createdAt: new Date("2024-11-01"),
    updatedAt: new Date("2024-12-15"),
  },
  {
    id: "2",
    title: "Summer Collection Launch",
    campaign: "Fashion Forward",
    status: "paused",
    impressions: 89000,
    clicks: 2100,
    ctr: 2.4,
    spend: 1200.0,
    conversions: 85,
    createdAt: new Date("2024-10-15"),
    updatedAt: new Date("2024-12-10"),
  },
  {
    id: "3",
    title: "Mobile App Download Campaign",
    campaign: "App Growth",
    status: "active",
    impressions: 200000,
    clicks: 8500,
    ctr: 4.25,
    spend: 3200.0,
    conversions: 420,
    createdAt: new Date("2024-11-20"),
    updatedAt: new Date("2024-12-16"),
  },
];

export function getAllAds(): Ad[] {
  return mockAds;
}

export function getAdById(id: string): Ad | null {
  return mockAds.find((ad) => ad.id === id) || null;
}

export function searchAds(query: string): Ad[] {
  if (!query.trim()) return mockAds;

  const lowerQuery = query.toLowerCase();
  return mockAds.filter(
    (ad) =>
      ad.title.toLowerCase().includes(lowerQuery) ||
      ad.campaign.toLowerCase().includes(lowerQuery),
  );
}

export function filterAds(filters: FilterOptions): Ad[] {
  let filtered = mockAds;

  if (filters.status && filters.status.length > 0) {
    filtered = filtered.filter((ad) => filters.status!.includes(ad.status));
  }

  if (filters.campaign) {
    filtered = filtered.filter((ad) =>
      ad.campaign.toLowerCase().includes(filters.campaign!.toLowerCase()),
    );
  }

  if (filters.dateRange) {
    filtered = filtered.filter(
      (ad) =>
        ad.createdAt >= filters.dateRange!.start &&
        ad.createdAt <= filters.dateRange!.end,
    );
  }

  return filtered;
}

export function calculateAdMetrics(ad: Ad) {
  const roi =
    ad.conversions > 0
      ? ((ad.conversions * 50 - ad.spend) / ad.spend) * 100
      : 0;
  const cpc = ad.clicks > 0 ? ad.spend / ad.clicks : 0;
  const costPerConversion = ad.conversions > 0 ? ad.spend / ad.conversions : 0;

  return {
    roi: Math.round(roi * 100) / 100,
    cpc: Math.round(cpc * 100) / 100,
    costPerConversion: Math.round(costPerConversion * 100) / 100,
    conversionRate:
      ad.clicks > 0
        ? Math.round((ad.conversions / ad.clicks) * 10000) / 100
        : 0,
  };
}

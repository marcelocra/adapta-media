import { useState, useMemo } from "react";
import { getAllAds, searchAds, filterAds } from "@/features/ads/api/ads";
import type { Ad } from "@/features/ads/types";

export function useAds() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilters, setStatusFilters] = useState<Ad["status"][]>([]);

  const ads = useMemo(() => {
    let filteredAds = getAllAds();
    if (searchQuery.trim()) {
      filteredAds = searchAds(searchQuery);
    }
    if (statusFilters.length > 0) {
      filteredAds = filterAds({ status: statusFilters });
    }
    return filteredAds;
  }, [searchQuery, statusFilters]);

  return { ads, searchQuery, setSearchQuery, statusFilters, setStatusFilters };
}

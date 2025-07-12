"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { AdCard } from "./AdCard";
import { AdDetails } from "./AdDetails";
import type { Ad } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { getAllAds, searchAds } from "@/lib/ads";

export function AdsList() {
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLanguage();
  const { saveScrollPosition, restoreScrollPosition } = useScrollPosition();

  const ads = useMemo(() => {
    if (searchQuery.trim()) {
      return searchAds(searchQuery);
    }
    return getAllAds();
  }, [searchQuery]);

  const handleViewDetails = (ad: Ad) => {
    saveScrollPosition();
    setSelectedAd(ad);
  };

  const handleBack = () => {
    setSelectedAd(null);
    setTimeout(restoreScrollPosition, 0);
  };

  if (selectedAd) {
    return <AdDetails ad={selectedAd} onBack={handleBack} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t.ads.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {ads.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">{t.ads.noResults}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} onViewDetails={handleViewDetails} />
          ))}
        </div>
      )}
    </div>
  );
}

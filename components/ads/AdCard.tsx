"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, MousePointer, Eye, DollarSign } from "lucide-react";
import type { Ad } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";

interface AdCardProps {
  ad: Ad;
  onViewDetails: (ad: Ad) => void;
}

export function AdCard({ ad, onViewDetails }: AdCardProps) {
  const { t } = useLanguage();

  const getStatusColor = (status: Ad["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "paused":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold line-clamp-2">
              {ad.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{ad.campaign}</p>
          </div>
          <Badge className={getStatusColor(ad.status)}>
            {t.ads.status[ad.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-xs text-muted-foreground">
                {t.ads.metrics.impressions}
              </p>
              <p className="text-sm font-medium">
                {formatNumber(ad.impressions)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MousePointer className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-xs text-muted-foreground">
                {t.ads.metrics.clicks}
              </p>
              <p className="text-sm font-medium">{formatNumber(ad.clicks)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-orange-500" />
            <div>
              <p className="text-xs text-muted-foreground">
                {t.ads.metrics.ctr}
              </p>
              <p className="text-sm font-medium">{ad.ctr.toFixed(2)}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-red-500" />
            <div>
              <p className="text-xs text-muted-foreground">
                {t.ads.metrics.spend}
              </p>
              <p className="text-sm font-medium">{formatCurrency(ad.spend)}</p>
            </div>
          </div>
        </div>
        <Button onClick={() => onViewDetails(ad)} className="w-full" size="sm">
          {t.common.viewDetails}
        </Button>
      </CardContent>
    </Card>
  );
}

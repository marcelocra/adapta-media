"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  TrendingUp,
  MousePointer,
  Eye,
  DollarSign,
  Target,
} from "lucide-react";
import type { Ad } from "@/features/ads/types";
import { useLanguage } from "@/components/LanguageProvider";
import { calculateAdMetrics } from "@/features/ads/api/ads";
import { getStatusColor } from "@/lib/utils";

interface AdDetailsProps {
  ad: Ad;
  onBack: () => void;
}

export function AdDetails({ ad, onBack }: AdDetailsProps) {
  const { t } = useLanguage();
  const metrics = calculateAdMetrics(ad);

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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.common.back}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{ad.title}</CardTitle>
              <p className="text-muted-foreground mt-1">{ad.campaign}</p>
            </div>
            <Badge className={getStatusColor(ad.status)}>
              {t.ads.status[ad.status]}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t.ads.details.performance}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Eye className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {t.ads.metrics.impressions}
                </p>
                <p className="text-2xl font-bold">
                  {formatNumber(ad.impressions)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MousePointer className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {t.ads.metrics.clicks}
                </p>
                <p className="text-2xl font-bold">{formatNumber(ad.clicks)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {t.ads.metrics.ctr}
                </p>
                <p className="text-2xl font-bold">{ad.ctr.toFixed(2)}%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {t.ads.metrics.spend}
                </p>
                <p className="text-2xl font-bold">{formatCurrency(ad.spend)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {t.ads.metrics.conversions}
                </p>
                <p className="text-2xl font-bold">
                  {formatNumber(ad.conversions)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-indigo-500" />
              <div>
                <p className="text-sm text-muted-foreground">ROI</p>
                <p className="text-2xl font-bold">{metrics.roi.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t.ads.details.insights}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">CPC</p>
              <p className="text-lg font-semibold">
                {formatCurrency(metrics.cpc)}
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <p className="text-lg font-semibold">
                {metrics.conversionRate.toFixed(2)}%
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Cost per Conversion
              </p>
              <p className="text-lg font-semibold">
                {formatCurrency(metrics.costPerConversion)}
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Created</p>
              <p className="text-lg font-semibold">
                {ad.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

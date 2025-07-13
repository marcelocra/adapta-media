"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  TrendingUp,
  MousePointer,
  Eye,
  DollarSign,
} from "lucide-react";
import { AdDetails } from "./AdDetails";
import type { Ad } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { getAllAds, searchAds, filterAds } from "@/lib/ads";

export function AdsList() {
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilters, setStatusFilters] = useState<Ad["status"][]>([]);
  const { t } = useLanguage();
  const { saveScrollPosition, restoreScrollPosition } = useScrollPosition();

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

  const handleViewDetails = (ad: Ad) => {
    saveScrollPosition();
    setSelectedAd(ad);
  };

  const handleBack = () => {
    setSelectedAd(null);
    setTimeout(restoreScrollPosition, 0);
  };

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={statusFilters.includes("active")}
              onCheckedChange={(checked) =>
                setStatusFilters((prev) =>
                  checked
                    ? [...prev, "active"]
                    : prev.filter((s) => s !== "active"),
                )
              }
            >
              {t.ads.status.active}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilters.includes("paused")}
              onCheckedChange={(checked) =>
                setStatusFilters((prev) =>
                  checked
                    ? [...prev, "paused"]
                    : prev.filter((s) => s !== "paused"),
                )
              }
            >
              {t.ads.status.paused}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilters.includes("completed")}
              onCheckedChange={(checked) =>
                setStatusFilters((prev) =>
                  checked
                    ? [...prev, "completed"]
                    : prev.filter((s) => s !== "completed"),
                )
              }
            >
              {t.ads.status.completed}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {ads.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">{t.ads.noResults}</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.ads.title}</TableHead>
                <TableHead className="hidden sm:table-cell">
                  {t.ads.details.campaign}
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  {t.ads.metrics.impressions}
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  {t.ads.metrics.clicks}
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  {t.ads.metrics.ctr}
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  {t.ads.metrics.spend}
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ads.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{ad.title}</div>
                      <div className="text-sm text-muted-foreground sm:hidden">
                        {ad.campaign}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {ad.campaign}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3 text-blue-500" />
                      {formatNumber(ad.impressions)}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      <MousePointer className="h-3 w-3 text-green-500" />
                      {formatNumber(ad.clicks)}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-orange-500" />
                      {ad.ctr.toFixed(2)}%
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-red-500" />
                      {formatCurrency(ad.spend)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(ad.status)}>
                      {t.ads.status[ad.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(ad)}
                    >
                      {t.common.viewDetails}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

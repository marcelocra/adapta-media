"use client";

import { Button } from "@/components/ui/button";
import { BarChart3, MessageCircle, Eye } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { useTab } from "@/contexts/TabContext";
import type { TabId } from "@/types";

export function TabNavigation() {
  const { t } = useLanguage();
  const { activeTab, setActiveTab } = useTab();

  const tabs: { id: TabId; label: string; icon: any }[] = [
    { id: "ads", label: t.tabs.ads, icon: BarChart3 },
    { id: "chat", label: t.tabs.chat, icon: MessageCircle },
    { id: "preview", label: t.tabs.preview, icon: Eye },
  ];

  return (
    <div className="flex w-full border-b border-border bg-background">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            className="flex-1 flex items-center gap-2 rounded-none h-12"
            onClick={() => setActiveTab(tab.id)}
          >
            <Icon className="h-4 w-4" />
            <span className="text-sm font-medium">{tab.label}</span>
          </Button>
        );
      })}
    </div>
  );
}

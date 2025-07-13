"use client";

import { TabNavigation } from "@/components/TabNavigation";
import { LanguageToggle } from "@/components/LanguageToggle";
import { AdsList } from "@/features/ads/components/AdsList";
import { ChatInterface } from "@/features/chat/components/ChatInterface";
import { PreviewTab } from "@/features/preview/components/PreviewTab";
import { useLanguage } from "@/components/LanguageProvider";
import { useTab } from "@/contexts/TabContext";

export default function HomePage() {
  const { activeTab, setActiveTab } = useTab();
  const { t } = useLanguage();

  const renderTabContent = () => {
    switch (activeTab) {
      case "ads":
        return <AdsList />;
      case "chat":
        return <ChatInterface />;
      case "preview":
        return <PreviewTab />;
      default:
        return <AdsList />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <h1 className="text-lg font-semibold">
            {activeTab === "ads" && t.ads.title}
            {activeTab === "chat" && t.chat.title}
            {activeTab === "preview" && t.preview.title}
          </h1>
          <LanguageToggle />
        </div>
        <TabNavigation />
      </header>

      <main className="container px-4 py-6">{renderTabContent()}</main>
    </div>
  );
}

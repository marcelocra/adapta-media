"use client";

import { useEffect, useState } from "react";
import { TabNavigation } from "@/components/TabNavigation";
import { LanguageToggle } from "@/components/LanguageToggle";
import { AdsList } from "@/components/ads/AdsList";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { PreviewTab } from "@/components/preview/PreviewTab";
import { useLanguage } from "@/hooks/useLanguage";
import Typewriter from "typewriter-effect";

export function TypewriterEffect() {
  return (
    <h1 className="text-lg font-semibold">
      <Typewriter
        options={{
          strings: ["Adapta Midia", "Seu ANALYTICS do mundo real!"],
          autoStart: true,
          loop: true,
          delay: 50,
          deleteSpeed: 50,
        }}
      />
    </h1>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("ads");
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
          <TypewriterEffect />
          <LanguageToggle />
        </div>
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </header>

      <main>{renderTabContent()}</main>
    </div>
  );
}

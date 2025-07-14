"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { TabId } from "@/types";

type TabContextType = {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
};

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabId>("ads");

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error("useTab must be used within a TabProvider");
  }
  return context;
}

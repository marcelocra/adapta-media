"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { Language } from "@/types";
import { getTranslation } from "@/i18n";

interface LanguageContextType {
  language: Language;
  changeLanguage: (newLang: Language) => void;
  t: ReturnType<typeof getTranslation>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("language") as Language;
    if (saved && ["pt", "en"].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLanguage(newLang);
    if (isClient) {
      localStorage.setItem("language", newLang);
    }
  };

  const t = getTranslation(language);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

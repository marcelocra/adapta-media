"use client";

import { useState, useEffect } from "react";
import type { Language } from "@/types";
import { getTranslation } from "@/i18n";

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("pt");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved && ["pt", "en"].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const t = getTranslation(language);

  return { language, changeLanguage, t };
}

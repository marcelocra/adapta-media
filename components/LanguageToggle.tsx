"use client";

import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export function LanguageToggle() {
  const { language, changeLanguage, t } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => changeLanguage(language === "pt" ? "en" : "pt")}
      className="flex items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm">{language === "pt" ? "EN" : "PT"}</span>
    </Button>
  );
}

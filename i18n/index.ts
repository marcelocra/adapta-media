import pt from "./pt";
import en from "./en";
import type { Language } from "@/types";

export const translations = { pt, en };

export function getTranslation(lang: Language) {
  return translations[lang];
}

export type Translation = typeof pt;

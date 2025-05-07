import { createContext, use } from "react";

import type { SupportedLanguages } from "@/config/language";

export type LanguageProviderState = {
  language: SupportedLanguages;
  setLanguage: (language: SupportedLanguages) => void;
};

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
};

export const LanguageProviderContext = createContext<LanguageProviderState>(initialState);

export function useLanguage() {
  const context = use(LanguageProviderContext);

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
}

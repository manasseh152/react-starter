import * as v from "valibot";

export const THEMES = [
  "light",
  "dark",
  "system",
] as const;
export type Theme = typeof THEMES[number];

export const THEME_STORAGE_KEY = "vite-ui-theme";

export const THEME_DEFAULT = "system" as const;

export const ThemeSchema = v.picklist(THEMES, "value is not a valid theme");

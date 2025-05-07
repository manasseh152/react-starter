import { RouterProvider } from "@tanstack/react-router";

import { ThemeProvider } from "@/components/providers/theme";
import { router } from "@/lib/router";

import { LanguageProvider } from "./language";

export function Provider() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </ThemeProvider>
  );
}

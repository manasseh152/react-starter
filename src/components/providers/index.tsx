import { RouterProvider } from "@tanstack/react-router";

import { ThemeProvider } from "@/components/providers/theme";
import { router } from "@/lib/router";

export function Provider() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

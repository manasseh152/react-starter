import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "@/components/providers";

import "@/assets/styles/styles.css";

const rootElement = document.getElementById("app");

if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider />
    </StrictMode>,
  );
}

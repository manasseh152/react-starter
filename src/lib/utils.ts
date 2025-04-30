import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { LogLevel } from "@/config/logger";

import { LOG_LEVELS } from "@/config/logger";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateKey(): string {
  return window.crypto.randomUUID();
}

export function reportWebVitals(onPerfEntry?: () => void) {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    import("web-vitals").then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);
      onINP(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
    });
  }
}

export function shouldLog(entryLevel: LogLevel, transportLevel?: LogLevel): boolean {
  if (!transportLevel) {
    return true; // If no transport level is set, log everything
  }
  return LOG_LEVELS.indexOf(entryLevel) >= LOG_LEVELS.indexOf(transportLevel);
}

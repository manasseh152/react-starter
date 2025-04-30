/* eslint-disable no-console */
import type { LogEntry, LogLevel, Transport } from "@/config/logger";

import { shouldLog } from "@/lib/utils";

/**
 * Formats log messages for console output.
 * Handles different data types appropriately.
 */
function formatMessages(messages: any[]): string {
  return messages
    .map((msg) => {
      if (typeof msg === "string") {
        return msg;
      }
      if (msg instanceof Error) {
        return msg.stack || msg.message; // Prefer stack trace if available
      }
      // Attempt to stringify objects/arrays, handle potential circular refs
      try {
        return JSON.stringify(msg, null, 2);
      }
      // eslint-disable-next-line unused-imports/no-unused-vars
      catch (error) {
        return "[Unserializable Object]";
      }
    })
    .join(" "); // Join multiple messages with a space
}

export type ConsoleTransportOptions = {
  level?: LogLevel;
};

/**
 * Console transport for logging.
 * Outputs log entries to the console.
 */
export class ConsoleTransport implements Transport {
  public level: LogLevel;

  constructor(options: ConsoleTransportOptions = {}) {
    this.level = options.level || "INFO";
  }

  public log(entry: LogEntry): void {
    const { level, messages } = entry;

    // Check if the log level is enabled for this transport
    if (shouldLog(level, this.level)) {
      return; // Ignore messages below the transport's level
    }

    const formattedMessages = formatMessages(messages);
    const timestamp = entry.timestamp.toISOString();

    // Output to console with appropriate method based on log level
    switch (level) {
      case "DEBUG":
        console.debug(`[${timestamp}] [${entry.loggerName}] ${formattedMessages}`);
        break;
      case "INFO":
        console.info(`[${timestamp}] [${entry.loggerName}] ${formattedMessages}`);
        break;
      case "WARN":
        console.warn(`[${timestamp}] [${entry.loggerName}] ${formattedMessages}`);
        break;
      case "ERROR":
        console.error(`[${timestamp}] [${entry.loggerName}] ${formattedMessages}`);
        break;
      default:
        console.log(`[${timestamp}] [${entry.loggerName}] ${formattedMessages}`);
    }
  }
}

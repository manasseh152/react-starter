import { ConsoleTransport } from "@/lib/logger.console";

export const DEFAULT_LOG_LEVEL: Readonly<LogLevel> = "INFO";
export const DEFAULT_TRANSPORTS: ReadonlyArray<Transport> = [new ConsoleTransport()];

export const LOG_LEVELS = [
  "DEBUG",
  "INFO",
  "WARN",
  "ERROR",
] as const;
export type LogLevel = typeof LOG_LEVELS[number];

/**
 * Represents a single log entry's data.
 */
export type LogEntry = {
  timestamp: Date;
  level: LogLevel;
  loggerName: string;
  messages: any[]; // The actual data/messages being logged
};

/**
 * Interface for a transport mechanism (where logs are sent).
 */
export type Transport = {
  /**
   * Processes and outputs a log entry.
   * @param entry The log entry data.
   */
  log: (entry: LogEntry) => void;

  /**
   * Optional: The minimum level this transport should handle.
   * If not set, it respects the logger's level.
   */
  level?: LogLevel;
};

/**
 * Configuration options for creating a logger instance.
 */
export type LoggerOptions = {
  /**
   * The name of the logger, used for context in output.
   */
  name: string;

  /**
   * The minimum log level to process. Messages below this level are ignored.
   * Defaults to INFO.
   */
  level?: LogLevel;

  /**
   * An array of transports to send log entries to.
   * Defaults to a single ConsoleTransport.
   */
  transports?: Transport[];
};

/**
 * The public interface of a logger instance.
 */
export type Logger = {
  /**
   * Logs messages at the DEBUG level.
   * @param messages Data/messages to log.
   */
  debug: (...messages: any[]) => void;

  /**
   * Logs messages at the INFO level.
   * @param messages Data/messages to log.
   */
  info: (...messages: any[]) => void;

  /**
   * Logs messages at the WARN level.
   * @param messages Data/messages to log.
   */
  warn: (...messages: any[]) => void;

  /**
   * Logs messages at the ERROR level.
   * @param messages Data/messages to log (often includes Error objects).
   */
  error: (...messages: any[]) => void;

  /**
   * Changes the minimum log level for this logger instance dynamically.
   * @param level The new minimum log level.
   */
  setLevel: (level: LogLevel) => void;

  /**
   * Gets the current minimum log level for this logger instance.
   */
  level: LogLevel;

  /**
   * Gets the name of this logger instance.
   */
  name: string;
};

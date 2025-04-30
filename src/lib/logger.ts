import type { Logger as ILogger, LogEntry, LoggerOptions, LogLevel, Transport } from "@/config/logger";

import { DEFAULT_LOG_LEVEL, DEFAULT_TRANSPORTS } from "@/config/logger";
import { shouldLog } from "@/lib/utils";

export class Logger implements ILogger {
  private _name: string;
  private _level: LogLevel;
  private _transports: Transport[];

  constructor(options: LoggerOptions) {
    this._name = options.name;
    this._level = options.level || DEFAULT_LOG_LEVEL;
    this._transports = options.transports || DEFAULT_TRANSPORTS.map(transport => transport);
  }

  private log(level: LogLevel, ...messages: any[]): void {
    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      loggerName: this._name,
      messages,
    };

    // Check if the log level is enabled for this transport
    if (shouldLog(level)) {
      this._transports.forEach(transport => transport.log(entry));
    }
  }

  get name(): string {
    return this._name;
  }

  get level(): LogLevel {
    return this._level;
  }

  public setLevel(level: LogLevel): void {
    this.info(`Changing log level from ${this._level} to ${level}`);
    this._level = level;
  }

  public debug(...messages: any[]): void {
    this.log("DEBUG", ...messages);
  }

  public info(...messages: any[]): void {
    this.log("INFO", ...messages);
  }

  public warn(...messages: any[]): void {
    this.log("WARN", ...messages);
  }

  public error(...messages: any[]): void {
    this.log("ERROR", ...messages);
  }
}

export function createLogger(options: LoggerOptions): ILogger {
  return new Logger(options);
}

export const logger = createLogger({
  name: "default",
});

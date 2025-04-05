export interface ILogger {
  error(message: string, trace: string): void;

  log(message: string): void;

  verbose(message: string): void;

  warn(message: string): void;
}

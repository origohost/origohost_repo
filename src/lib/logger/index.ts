type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogPayload {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
  error?: unknown;
}

class StructuredLogger {
  private format(level: LogLevel, message: string, context?: Record<string, unknown>, error?: unknown): LogPayload {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(context ? { context } : {}),
      ...(error instanceof Error ? { error: { message: error.message, stack: error.stack } } : error ? { error } : {}),
    };
  }

  public info(message: string, context?: Record<string, unknown>) {
    const payload = this.format('info', message, context);
    console.log(JSON.stringify(payload));
  }

  public warn(message: string, context?: Record<string, unknown>) {
    const payload = this.format('warn', message, context);
    console.warn(JSON.stringify(payload));
  }

  public error(message: string, error?: unknown, context?: Record<string, unknown>) {
    const payload = this.format('error', message, context, error);
    console.error(JSON.stringify(payload));
  }

  public debug(message: string, context?: Record<string, unknown>) {
    if (process.env.NODE_ENV === 'development') {
      const payload = this.format('debug', message, context);
      console.debug(JSON.stringify(payload));
    }
  }
}

export const logger = new StructuredLogger();

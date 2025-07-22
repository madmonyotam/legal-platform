import { createLogger, format, transports } from 'winston';
import { AsyncLocalStorage } from 'async_hooks';

type Context = {
    service?: string;
    traceId?: string;
    userId?: string;
};

const storage = new AsyncLocalStorage<Context>();

const setContext = (ctx: Context) => {
    storage.enterWith(ctx);
};

const getContext = () => storage.getStore() || {};

const baseLogger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [new transports.Console()]
});

const wrap = (level: 'info' | 'error' | 'warn' | 'debug') => {
    return (message: string, meta: Record<string, any> = {}) => {
        const context = getContext();
        baseLogger[level](message, { ...context, ...meta });
    };
};

const logger = {
    info: wrap('info'),
    error: wrap('error'),
    warn: wrap('warn'),
    debug: wrap('debug'),
};

export { baseLogger, logger, setContext, getContext };


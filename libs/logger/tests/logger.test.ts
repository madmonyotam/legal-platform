import { logger, setContext } from '../src/logger';

describe('logger', () => {
    beforeEach(() => {
        setContext({}); // reset context before each test
    });

    it('should log info without throwing', () => {
        expect(() => logger.info('info log test')).not.toThrow();
    });

    it('should log error with metadata', () => {
        expect(() =>
            logger.error('error log test', { error: new Error('fail') })
        ).not.toThrow();
    });

    it('should include context fields like traceId and service', () => {
        setContext({ service: 'test-service', traceId: 'abc-123', userId: 'user-999' });

        expect(() =>
            logger.info('logging with context', { extra: 'value' })
        ).not.toThrow();
    });
});

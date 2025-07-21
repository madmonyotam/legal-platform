import { logger } from '../src/index';

describe('logger', () => {
    it('should log info without throwing', () => {
        expect(() => logger.info('info log test')).not.toThrow();
    });

    it('should log error with metadata', () => {
        expect(() =>
            logger.error('error log test', { error: new Error('fail') })
        ).not.toThrow();
    });
});
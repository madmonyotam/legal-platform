import { logger } from '@legal/logger';
import type { Express } from 'express';

type HealthOptions = {
    checkReadiness?: () => Promise<void>;
};

export function setupHealthRoutes(app: Express, options: HealthOptions = {}) {
    app.get('/health', (_, res) => {
        logger.debug('Health check OK');
        res.send('ok')
    }
    );

    app.get('/ready', async (_, res) => {
        try {
            if (options.checkReadiness) {
                await options.checkReadiness();
            }
            res.send('ok');
        } catch (err) {
            res.status(500).send('not ready');
        }
    });
}

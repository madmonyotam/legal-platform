import dotenv from 'dotenv';
dotenv.config();

if (!process.env.INTERNAL_SECRET) {
    throw new Error('Missing required environment variable: INTERNAL_SECRET');
}

export const PORT = process.env.PORT ?? 8080;
export const INTERNAL_SECRET = process.env.INTERNAL_SECRET.trim();
export const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:8081';
export const CASE_SERVICE_URL = process.env.CASE_SERVICE_URL || 'http://localhost:8082';

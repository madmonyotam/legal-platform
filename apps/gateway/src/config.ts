import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT ?? 8080;
export const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:8081';
export const CASE_SERVICE_URL = process.env.CASE_SERVICE_URL || 'http://localhost:8082';

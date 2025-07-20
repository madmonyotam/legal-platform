import dotenv from 'dotenv';

// טוען את משתני הסביבה מקובץ .env
dotenv.config();

// וידוא שמשתנה קריטי קיים
if (!process.env.JWT_SECRET) {
  throw new Error('Missing required environment variable: JWT_SECRET');
}

export const PORT = process.env.PORT ?? 8081;
export const JWT_SECRET: string = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN ?? '1h';

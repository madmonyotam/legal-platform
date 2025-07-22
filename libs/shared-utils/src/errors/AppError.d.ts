/**
 * AppError – שגיאה עסקית עם מידע מובנה
 *
 * - statusCode: קוד HTTP לשליחה ללקוח
 * - isOperational: האם זו שגיאה צפויה (למשל שגיאת ולידציה)
 * - details: מידע נוסף (לוג, תשובה משירות חיצוני, validation errors וכו')
 */
export declare class AppError extends Error {
    readonly statusCode: number;
    readonly isOperational: boolean;
    readonly details?: any;
    constructor(message: string, statusCode?: number, isOperational?: boolean, details?: any);
}

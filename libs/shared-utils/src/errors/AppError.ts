/**
 * AppError – שגיאה עסקית עם מידע מובנה
 * 
 * - statusCode: קוד HTTP לשליחה ללקוח
 * - isOperational: האם זו שגיאה צפויה (למשל שגיאת ולידציה)
 * - details: מידע נוסף (לוג, תשובה משירות חיצוני, validation errors וכו')
 */

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly details?: any;

    constructor(
        message: string,
        statusCode = 500,
        isOperational = true,
        details?: any
    ) {
        super(message);

        this.name = new.target.name;
        Object.setPrototypeOf(this, new.target.prototype);

        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.details = details;

        Error.captureStackTrace(this);
    }
}

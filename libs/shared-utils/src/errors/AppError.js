"use strict";
/**
 * AppError – שגיאה עסקית עם מידע מובנה
 *
 * - statusCode: קוד HTTP לשליחה ללקוח
 * - isOperational: האם זו שגיאה צפויה (למשל שגיאת ולידציה)
 * - details: מידע נוסף (לוג, תשובה משירות חיצוני, validation errors וכו')
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true, details) {
        super(message);
        this.name = new.target.name;
        Object.setPrototypeOf(this, new.target.prototype);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.details = details;
        Error.captureStackTrace(this);
    }
}
exports.AppError = AppError;

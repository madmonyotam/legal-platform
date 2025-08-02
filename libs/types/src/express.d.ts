import 'express';
import { AuthUser } from './index';

declare module 'express' {
    interface Request {
        user?: AuthUser;
    }
}
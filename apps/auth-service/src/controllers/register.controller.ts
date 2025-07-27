import { Request, Response } from 'express';
import { firebaseAuth } from '../utils/firebase';
import { AppError } from '@legal/shared-utils';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new AppError('Missing email or password', 400);
    }

    try {
        const user = await firebaseAuth.createUser({ email, password });

        // בהמשך נוכל לשמור גם role, officeId וכו' במסד

        res.status(201).json({ uid: user.uid, email: user.email });
    } catch (error: any) {
        // טיפול בשגיאות נפוצות מ-Firebase
        if (error.code === 'auth/email-already-exists') {
            throw new AppError('Email already in use', 409);
        }

        throw new AppError('Failed to register user', 500, false, { firebase: error.message });
    }
};

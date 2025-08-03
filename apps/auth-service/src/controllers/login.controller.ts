import { Request, Response } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, FIREBASE_API_KEY, JWT_EXPIRES_IN } from '../config';
import { AppError } from '@legal/shared-utils';
import { UserMetaService } from '../services/userMeta.service';
import { UserMeta } from '@prisma/client';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new AppError('Missing email or password', 400);
    }

    try {
        console.log('🔐 Attempting login for:', email);
        console.log('🔗 Firebase API Key exists:', !!FIREBASE_API_KEY);
        console.log('🔗 Firebase API Key length:', FIREBASE_API_KEY?.length);
        
        const { data } = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
            {
                email,
                password,
                returnSecureToken: true,
            }
        );

        console.log('✅ Firebase login successful!');

        const uid = data.localId;

        let userMeta = await UserMetaService.getUserMeta(uid) as UserMeta;
        if (!userMeta) {
            throw new AppError('User metadata missing – please register first', 403);
        }

        const token = jwt.sign(
            {
                uid: uid,
                email: data.email,
                role: userMeta.role,
                officeId: userMeta.officeId,
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN as any }
        );

        res.json({ token });
    } catch (error: any) {
        console.error('🚨 Login error occurred:');
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Error type:', typeof error);
        console.error('Has response:', !!error.response);
        
        if (error.response) {
            // שגיאה מ-Firebase API
            console.error('Firebase API error:', error.response.data);
            const code = error.response?.data?.error?.message;
            
            switch (code) {
                case 'EMAIL_NOT_FOUND':
                    throw new AppError('Email not found', 404);
                case 'INVALID_PASSWORD':
                    throw new AppError('Invalid password', 401);
                case 'USER_DISABLED':
                    throw new AppError('User disabled', 403);
                default:
                    throw new AppError('Firebase authentication failed', 500, false, { firebase: code });
            }
        } else {
            // שגיאה בconnection או באקסיוס
            console.error('Network/Connection error:', error.message);
            throw new AppError(`Network error: ${error.message}`, 500, false, { networkError: true });
        }
    }
};

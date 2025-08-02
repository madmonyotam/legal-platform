import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { AppError } from '@legal/shared-utils';
import { firebaseAuth } from '../utils/firebase';
import { UserMetaService } from '../services/userMeta.service';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new AppError('Missing email or password', 400);
    }

    try {
        const user = await firebaseAuth.createUser({ email, password });

        const now = new Date();
        const officeId = `office-${uuid()}`;

        const userMeta = await UserMetaService.createUserMeta({
            uid: user.uid,
            role: 'owner',
            officeId,
            invitedBy: null,
            createdAt: now,
            updatedAt: now,
        });

        res.status(201).json({ uid: user.uid, email: user.email, userMeta });
    } catch (error: any) {
        if (error.code === 'auth/email-already-exists') {
            throw new AppError('Email already in use', 409);
        }

        throw new AppError('Failed to register user', 500, false, { firebase: error.message });
    }
};

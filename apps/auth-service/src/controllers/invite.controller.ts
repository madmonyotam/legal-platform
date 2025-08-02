import { Request, Response } from 'express';
import { AuthUser } from '@legal/types';
import { AppError } from '@legal/shared-utils';
import { firebaseAuth } from '../utils/firebase';
import { UserMetaService } from '../services/userMeta.service';

export const invite = async (req: Request, res: Response) => {
    const { email, password, role, officeId } = req.body;
    const allowedRoles = ['lawyer', 'admin', 'intern'] as const;

    if (!email || !password || !role || !officeId) {
        throw new AppError('Missing required fields', 400);
    }

    if (!allowedRoles.includes(role)) {
        throw new AppError('Invalid role for invite', 400);
    }

    const inviter = req.headers['x-user-meta'];

    if (!inviter) {
        throw new AppError('Missing inviter metadata', 400);
    }

    let parsed: AuthUser;

    try {
        parsed = JSON.parse(inviter as string);
    } catch {
        throw new AppError('Invalid user metadata', 400);
    }

    const invitedBy = parsed.uid;
    const inviterMeta = await UserMetaService.getUserMeta(invitedBy);

    if (!inviterMeta) {
        throw new AppError('Inviter not found', 403);
    }

    if (inviterMeta.role !== 'owner') {
        throw new AppError('Only owners can invite users', 403);
    }

    if (inviterMeta.officeId !== officeId) {
        throw new AppError('Office mismatch between inviter and invitee', 403);
    }

    try {
        const user = await firebaseAuth.createUser({ email, password });
        const now = new Date();

        const userMeta = await UserMetaService.createUserMeta({
            uid: user.uid,
            role,
            officeId,
            invitedBy,
            createdAt: now,
            updatedAt: now,
        });

        res.status(201).json({ uid: user.uid, email: user.email, meta: userMeta });
    } catch (error: any) {
        if (error.code === 'auth/email-already-exists') {
            throw new AppError('Email already in use', 409);
        }

        throw new AppError('Failed to invite user', 500, false, { firebase: error.message });
    }
};

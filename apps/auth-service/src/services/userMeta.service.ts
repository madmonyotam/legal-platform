import { PrismaClient, UserMeta } from '@prisma/client';
const prisma = new PrismaClient();

export class UserMetaService {
    static async getUserMeta(uid: string): Promise<UserMeta | null> {
        return prisma.userMeta.findUnique({ where: { uid } });
    }

    static async createUserMeta(data: UserMeta): Promise<UserMeta> {
        return prisma.userMeta.create({ data });
    }

    static async updateUserMeta(uid: string, data: Partial<UserMeta>): Promise<UserMeta> {
        return prisma.userMeta.update({
            where: { uid },
            data,
        });
    }
}

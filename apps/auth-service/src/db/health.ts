import { prisma } from "./prisma";

export const checkDbReady = async () => {
    await prisma.$queryRaw`SELECT 1`;
};

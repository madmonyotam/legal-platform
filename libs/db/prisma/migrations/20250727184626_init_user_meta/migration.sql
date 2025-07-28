-- CreateEnum
CREATE TYPE "Role" AS ENUM ('owner', 'lawyer', 'intern', 'admin');

-- CreateTable
CREATE TABLE "UserMeta" (
    "uid" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "officeId" TEXT NOT NULL,
    "invitedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMeta_pkey" PRIMARY KEY ("uid")
);

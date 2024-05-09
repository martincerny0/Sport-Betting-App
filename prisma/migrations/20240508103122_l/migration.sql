/*
  Warnings:

  - You are about to drop the column `expires` on the `VerificationToken` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `VerificationToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `VerificationToken` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userId` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "VerificationToken_identifier_token_key";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "breakPoint" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "VerificationToken" DROP COLUMN "expires",
DROP COLUMN "identifier",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "DepositCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DepositCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InviteCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InviteCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DepositCode_code_key" ON "DepositCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "InviteCode_code_key" ON "InviteCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_userId_key" ON "VerificationToken"("userId");

-- AddForeignKey
ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepositCode" ADD CONSTRAINT "DepositCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InviteCode" ADD CONSTRAINT "InviteCode_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

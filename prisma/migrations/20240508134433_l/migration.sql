/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InviteCode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[inviteCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inviteCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "InviteCode" DROP CONSTRAINT "InviteCode_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "inviteCode" TEXT NOT NULL;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "InviteCode";

-- DropTable
DROP TABLE "Session";

-- CreateIndex
CREATE UNIQUE INDEX "User_inviteCode_key" ON "User"("inviteCode");

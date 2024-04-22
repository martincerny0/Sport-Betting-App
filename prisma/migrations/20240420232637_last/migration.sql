/*
  Warnings:

  - You are about to drop the column `winner` on the `Bet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bet" DROP COLUMN "winner",
ADD COLUMN     "result" TEXT;

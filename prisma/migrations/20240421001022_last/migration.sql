/*
  Warnings:

  - Added the required column `potentialWin` to the `Bet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bet" ADD COLUMN     "potentialWin" DOUBLE PRECISION NOT NULL;

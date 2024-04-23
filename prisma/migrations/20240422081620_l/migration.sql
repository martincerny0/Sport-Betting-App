/*
  Warnings:

  - Added the required column `prediction` to the `Bet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Bet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bet" ADD COLUMN     "prediction" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

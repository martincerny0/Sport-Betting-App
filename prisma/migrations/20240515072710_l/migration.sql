/*
  Warnings:

  - The `boosted` column on the `Bet` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Bet" DROP COLUMN "boosted",
ADD COLUMN     "boosted" BOOLEAN NOT NULL DEFAULT false;

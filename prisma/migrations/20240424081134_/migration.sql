/*
  Warnings:

  - You are about to drop the column `odds` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "odds",
ADD COLUMN     "oddsOver" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
ADD COLUMN     "oddsTeam1Win" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
ADD COLUMN     "oddsTeam2Win" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
ADD COLUMN     "oddsUnder" DOUBLE PRECISION NOT NULL DEFAULT 1.0;

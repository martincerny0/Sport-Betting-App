/*
  Warnings:

  - The `currentIngameTime` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `sport` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "sport" TEXT NOT NULL,
ALTER COLUMN "team1Score" SET DEFAULT 0,
ALTER COLUMN "team2Score" SET DEFAULT 0,
DROP COLUMN "currentIngameTime",
ADD COLUMN     "currentIngameTime" INTEGER DEFAULT 0,
ALTER COLUMN "status" SET DEFAULT 'Scheduled';

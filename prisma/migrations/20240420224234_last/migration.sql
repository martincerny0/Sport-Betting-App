/*
  Warnings:

  - You are about to drop the column `matchId` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the `Match` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gameId` to the `Bet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bet" DROP CONSTRAINT "Bet_matchId_fkey";

-- AlterTable
ALTER TABLE "Bet" DROP COLUMN "matchId",
ADD COLUMN     "gameId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Match";

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "team1Name" TEXT NOT NULL,
    "team1Score" INTEGER NOT NULL,
    "team2Name" TEXT NOT NULL,
    "team2Score" INTEGER NOT NULL,
    "currentIngameTime" TEXT,
    "status" TEXT NOT NULL,
    "startDateTime" TIMESTAMP(3) NOT NULL,
    "winner" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

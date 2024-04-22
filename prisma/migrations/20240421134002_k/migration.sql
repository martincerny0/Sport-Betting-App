/*
  Warnings:

  - You are about to drop the column `startDateTime` on the `Game` table. All the data in the column will be lost.
  - Added the required column `startTime` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "startDateTime",
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

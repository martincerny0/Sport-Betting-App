/*
  Warnings:

  - You are about to drop the column `unicodes` on the `Sport` table. All the data in the column will be lost.
  - Added the required column `unicode` to the `Sport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sport" DROP COLUMN "unicodes",
ADD COLUMN     "unicode" TEXT NOT NULL;

/*
  Warnings:

  - Added the required column `unicodes` to the `Sport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sport" ADD COLUMN     "unicodes" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Bet" ADD COLUMN     "boosted" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Sport" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Sport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sport_name_key" ON "Sport"("name");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_sport_fkey" FOREIGN KEY ("sport") REFERENCES "Sport"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

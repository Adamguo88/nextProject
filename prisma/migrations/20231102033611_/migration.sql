/*
  Warnings:

  - A unique constraint covering the columns `[FileName]` on the table `ProductFiles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductFiles_FileName_key" ON "ProductFiles"("FileName");

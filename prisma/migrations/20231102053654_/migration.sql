/*
  Warnings:

  - You are about to drop the column `FileType` on the `ProductFiles` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductFiles" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "FileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL DEFAULT '',
    "productID" TEXT,
    CONSTRAINT "ProductFiles_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product" ("ID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProductFiles" ("FileName", "ID", "productID") SELECT "FileName", "ID", "productID" FROM "ProductFiles";
DROP TABLE "ProductFiles";
ALTER TABLE "new_ProductFiles" RENAME TO "ProductFiles";
CREATE UNIQUE INDEX "ProductFiles_ID_key" ON "ProductFiles"("ID");
CREATE UNIQUE INDEX "ProductFiles_FileName_key" ON "ProductFiles"("FileName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

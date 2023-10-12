/*
  Warnings:

  - You are about to alter the column `file` on the `File` table. The data in that column could be lost. The data in that column will be cast from `String` to `Binary`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_File" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "file" BLOB NOT NULL DEFAULT '',
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productID" TEXT,
    CONSTRAINT "File_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product" ("ID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_File" ("CreatedAt", "ID", "file", "name", "productID") SELECT "CreatedAt", "ID", "file", "name", "productID" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
CREATE UNIQUE INDEX "File_ID_key" ON "File"("ID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductFile" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "file" BLOB NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productID" TEXT,
    CONSTRAINT "ProductFile_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product" ("ID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProductFile" ("ID", "file", "name") SELECT "ID", "file", "name" FROM "ProductFile";
DROP TABLE "ProductFile";
ALTER TABLE "new_ProductFile" RENAME TO "ProductFile";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

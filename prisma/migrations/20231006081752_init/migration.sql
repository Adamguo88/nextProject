-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductImage" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL DEFAULT '',
    "link" TEXT NOT NULL DEFAULT '',
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productID" TEXT,
    CONSTRAINT "ProductImage_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product" ("ID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProductImage" ("CreatedAt", "ID", "Name", "link", "productID") SELECT "CreatedAt", "ID", "Name", "link", "productID" FROM "ProductImage";
DROP TABLE "ProductImage";
ALTER TABLE "new_ProductImage" RENAME TO "ProductImage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

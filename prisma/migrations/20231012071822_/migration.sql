-- CreateTable
CREATE TABLE "File" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "file" TEXT NOT NULL DEFAULT '',
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productID" TEXT,
    CONSTRAINT "File_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product" ("ID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "File_ID_key" ON "File"("ID");

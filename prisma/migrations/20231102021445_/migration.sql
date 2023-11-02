-- CreateTable
CREATE TABLE "ProductFiles" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "FileName" TEXT NOT NULL,
    "productID" TEXT,
    CONSTRAINT "ProductFiles_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product" ("ID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductFiles_ID_key" ON "ProductFiles"("ID");

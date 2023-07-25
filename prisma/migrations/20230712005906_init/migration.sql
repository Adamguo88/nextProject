-- CreateTable
CREATE TABLE "Product" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "ProductName" TEXT NOT NULL,
    "Price" TEXT NOT NULL,
    "Deatils" TEXT NOT NULL,
    "Discount" TEXT NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL
);

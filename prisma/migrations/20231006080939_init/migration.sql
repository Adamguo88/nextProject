-- CreateTable
CREATE TABLE "Product" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "ProductName" TEXT NOT NULL DEFAULT '',
    "Price" TEXT NOT NULL DEFAULT '',
    "Deatils" TEXT NOT NULL DEFAULT '',
    "Discount" TEXT NOT NULL DEFAULT '',
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "permission" TEXT NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "ID" TEXT NOT NULL PRIMARY KEY DEFAULT '',
    "Name" TEXT NOT NULL DEFAULT '',
    "link" TEXT NOT NULL DEFAULT '',
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_ID_key" ON "Product"("ID");

-- CreateIndex
CREATE UNIQUE INDEX "User_ID_key" ON "User"("ID");

-- CreateIndex
CREATE UNIQUE INDEX "User_Username_key" ON "User"("Username");

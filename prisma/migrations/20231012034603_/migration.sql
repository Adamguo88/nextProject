-- CreateTable
CREATE TABLE "ProductFile" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "file" BLOB NOT NULL
);

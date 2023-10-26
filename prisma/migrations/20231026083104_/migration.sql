/*
  Warnings:

  - You are about to drop the column `Status` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "IsLogin" TEXT NOT NULL DEFAULT 'N',
    "permission" TEXT NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("CreatedAt", "ID", "Password", "Username", "permission") SELECT "CreatedAt", "ID", "Password", "Username", "permission" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_ID_key" ON "User"("ID");
CREATE UNIQUE INDEX "User_Username_key" ON "User"("Username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT,
    "imagePublicId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "user_Id" INTEGER,
    CONSTRAINT "Item_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("description", "id", "image", "imagePublicId", "name", "status", "user_Id") SELECT "description", "id", "image", "imagePublicId", "name", "status", "user_Id" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_History" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_Id" INTEGER NOT NULL,
    "transaction" TEXT NOT NULL,
    "item_Id" INTEGER,
    "timeStamp" DATETIME NOT NULL,
    CONSTRAINT "History_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "History_item_Id_fkey" FOREIGN KEY ("item_Id") REFERENCES "Item" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_History" ("id", "item_Id", "timeStamp", "transaction", "user_Id") SELECT "id", "item_Id", "timeStamp", "transaction", "user_Id" FROM "History";
DROP TABLE "History";
ALTER TABLE "new_History" RENAME TO "History";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

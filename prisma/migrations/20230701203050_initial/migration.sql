-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userType" TEXT NOT NULL,
    "fullName" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "user_Id" INTEGER NOT NULL,
    CONSTRAINT "Item_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "History" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_Id" INTEGER NOT NULL,
    "transaction" TEXT NOT NULL,
    "item_Id" INTEGER NOT NULL,
    "timeStamp" DATETIME NOT NULL,
    CONSTRAINT "History_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "History_item_Id_fkey" FOREIGN KEY ("item_Id") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

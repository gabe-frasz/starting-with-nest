/*
  Warnings:

  - You are about to drop the column `recipentId` on the `notifications` table. All the data in the column will be lost.
  - Added the required column `recipientId` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_notifications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recipientId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "readAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_notifications" ("category", "content", "createdAt", "id", "readAt") SELECT "category", "content", "createdAt", "id", "readAt" FROM "notifications";
DROP TABLE "notifications";
ALTER TABLE "new_notifications" RENAME TO "notifications";
CREATE INDEX "notifications_recipientId_idx" ON "notifications"("recipientId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

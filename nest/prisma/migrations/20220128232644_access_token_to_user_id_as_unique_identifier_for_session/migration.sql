/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "sessions_accessToken_key";

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "accessToken" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_userId_key" ON "sessions"("userId");

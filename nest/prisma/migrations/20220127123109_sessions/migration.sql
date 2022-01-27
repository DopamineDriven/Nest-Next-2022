/*
  Warnings:

  - The primary key for the `sessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `expires` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `sessionToken` on the `sessions` table. All the data in the column will be lost.
  - The `iat` column on the `sessions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[accessToken]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessToken` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "sessions_sessionToken_key";

-- AlterTable
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_pkey",
DROP COLUMN "expires",
DROP COLUMN "sessionToken",
ADD COLUMN     "accessToken" TEXT NOT NULL,
ADD COLUMN     "alg" TEXT,
ADD COLUMN     "exp" INTEGER,
ADD COLUMN     "lastVerified" TIMESTAMP(3),
ADD COLUMN     "provider" TEXT,
ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "scopes" TEXT[],
ADD COLUMN     "signature" TEXT,
ADD COLUMN     "tokenState" TEXT,
DROP COLUMN "iat",
ADD COLUMN     "iat" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_accessToken_key" ON "sessions"("accessToken");

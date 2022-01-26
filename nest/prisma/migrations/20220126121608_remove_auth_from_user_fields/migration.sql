/*
  Warnings:

  - You are about to drop the column `refreshSecret` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "refreshSecret",
DROP COLUMN "refreshToken";

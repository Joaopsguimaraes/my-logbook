/*
  Warnings:

  - Added the required column `exerciseImage` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "exerciseImage" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

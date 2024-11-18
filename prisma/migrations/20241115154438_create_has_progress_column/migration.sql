/*
  Warnings:

  - Added the required column `hasProgress` to the `Logbook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Logbook" ADD COLUMN     "hasProgress" BOOLEAN NOT NULL;

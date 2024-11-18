/*
  Warnings:

  - You are about to drop the `Logbook` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hasProgress` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Logbook" DROP CONSTRAINT "Logbook_workout_id_fkey";

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "hasProgress" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "Logbook";

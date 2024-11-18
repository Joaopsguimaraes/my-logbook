/*
  Warnings:

  - You are about to drop the column `exerciseType` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Logbook` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Logbook` table. All the data in the column will be lost.
  - You are about to drop the column `exercise_id` on the `Logbook` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Logbook` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Logbook` table. All the data in the column will be lost.
  - Added the required column `muscleGroup` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workout_id` to the `Logbook` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MuscleGroup" AS ENUM ('LEGS', 'BACK', 'SHOULDERS', 'CHEST', 'ARMS');

-- DropForeignKey
ALTER TABLE "Logbook" DROP CONSTRAINT "Logbook_exercise_id_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "exerciseType",
ADD COLUMN     "muscleGroup" "MuscleGroup" NOT NULL;

-- AlterTable
ALTER TABLE "Logbook" DROP COLUMN "createdAt",
DROP COLUMN "date",
DROP COLUMN "exercise_id",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
ADD COLUMN     "workout_id" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ExerciseType";

-- CreateTable
CREATE TABLE "Workout" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "exercise_id" TEXT NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Logbook" ADD CONSTRAINT "Logbook_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

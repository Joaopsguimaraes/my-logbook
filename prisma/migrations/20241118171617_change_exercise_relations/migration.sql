/*
  Warnings:

  - You are about to drop the column `exercise_id` on the `Workout` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_exercise_id_fkey";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "workoutId" TEXT;

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "exercise_id";

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

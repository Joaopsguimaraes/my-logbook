/*
  Warnings:

  - You are about to drop the column `exerciseImage` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `hasProgress` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `hasProgress` on the `Workout` table. All the data in the column will be lost.
  - Added the required column `muscleExerciseId` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "exerciseImage",
DROP COLUMN "hasProgress",
DROP COLUMN "name",
ADD COLUMN     "muscleExerciseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "hasProgress",
ALTER COLUMN "date" DROP NOT NULL;

-- CreateTable
CREATE TABLE "MuscleExercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT,

    CONSTRAINT "MuscleExercise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MuscleExercise_name_key" ON "MuscleExercise"("name");

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_muscleExerciseId_fkey" FOREIGN KEY ("muscleExerciseId") REFERENCES "MuscleExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

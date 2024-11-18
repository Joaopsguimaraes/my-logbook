/*
  Warnings:

  - You are about to drop the column `annotation` on the `Logbook` table. All the data in the column will be lost.
  - You are about to drop the column `exercise` on the `Logbook` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseType` on the `Logbook` table. All the data in the column will be lost.
  - You are about to drop the column `hasProgress` on the `Logbook` table. All the data in the column will be lost.
  - You are about to drop the column `reps` on the `Logbook` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Logbook` table. All the data in the column will be lost.
  - Added the required column `exericse_id` to the `Logbook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Logbook" DROP COLUMN "annotation",
DROP COLUMN "exercise",
DROP COLUMN "exerciseType",
DROP COLUMN "hasProgress",
DROP COLUMN "reps",
DROP COLUMN "weight",
ADD COLUMN     "exericse_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "exerciseType" "ExerciseType" NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "reps" INTEGER NOT NULL,
    "annotation" TEXT NOT NULL,
    "hasProgress" BOOLEAN NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Logbook" ADD CONSTRAINT "Logbook_exericse_id_fkey" FOREIGN KEY ("exericse_id") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

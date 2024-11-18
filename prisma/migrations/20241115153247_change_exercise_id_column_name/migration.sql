/*
  Warnings:

  - You are about to drop the column `exericse_id` on the `Logbook` table. All the data in the column will be lost.
  - Added the required column `exercise_id` to the `Logbook` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Logbook" DROP CONSTRAINT "Logbook_exericse_id_fkey";

-- AlterTable
ALTER TABLE "Logbook" DROP COLUMN "exericse_id",
ADD COLUMN     "exercise_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Logbook" ADD CONSTRAINT "Logbook_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

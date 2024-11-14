-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('LEGS', 'BACK', 'SHOULDERS', 'CHEST', 'ARMS');

-- CreateTable
CREATE TABLE "Logbook" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "exercise" TEXT NOT NULL,
    "exerciseType" "ExerciseType" NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "reps" INTEGER NOT NULL,
    "annotation" TEXT NOT NULL,
    "hasProgress" BOOLEAN NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Logbook_pkey" PRIMARY KEY ("id")
);

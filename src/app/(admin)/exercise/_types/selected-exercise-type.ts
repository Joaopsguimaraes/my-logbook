import type { MuscleGroup } from "@prisma/client"

export type SelectedExerciseType = {
  name: string
  id: string
  muscleGroup: MuscleGroup
  weight: number
  reps: number
  annotation?: string
}
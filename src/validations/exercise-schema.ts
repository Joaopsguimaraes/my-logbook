import { MuscleGroup } from '@prisma/client'
import { z } from 'zod'

export const exercisesSchema = z.object({
  id: z.string(),
  name: z.string(),
  weight: z.number(),
  reps: z.number(),
  series: z.number(),
  annotation: z.string(),
  muscleGroup: z.nativeEnum(MuscleGroup),
  muscleExerciseId: z.string(),
})

export type ExerciseSchemaType = z.infer<typeof exercisesSchema>

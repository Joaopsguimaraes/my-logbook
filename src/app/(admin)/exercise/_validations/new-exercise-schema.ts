import { MuscleGroup } from '@prisma/client'
import { z } from 'zod'

export const newExerciseSchema = z.object({
  name: z.string(),
  exerciseImage: z.string(),
  muscleGroup: z.nativeEnum(MuscleGroup),
  weight: z.number(),
  reps: z.number(),
  annotation: z.string(),
  hasProgress: z.boolean(),
})

export type NewExerciseSchemaType = z.infer<typeof newExerciseSchema>
import { MuscleGroup } from '@prisma/client'
import { z } from 'zod'

export const exercisesSchema = z.object({
  id: z.string(),
  name: z.string(),
  exerciseImage: z.string(),
  muscleGroup: z.nativeEnum(MuscleGroup),
  weight: z.number(),
  reps: z.number(),
  annotation: z.string(),
  hasProgress: z.boolean(),
})

export type ExerciseSchemaType = z.infer<typeof exercisesSchema>
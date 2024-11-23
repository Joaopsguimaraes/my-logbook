import { MuscleGroup } from '@prisma/client'
import { z } from 'zod'

export const newExerciseSchema = z.object({
  weight: z.number(),
  name: z.string(),
  reps: z.number(),
  annotation: z.string(),
  muscleGroup: z.nativeEnum(MuscleGroup),
  muscleExerciseId: z.string(),
  series: z.number()
})

export type NewExerciseSchemaType = z.infer<typeof newExerciseSchema>

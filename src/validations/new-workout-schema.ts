import { z } from 'zod'
import { exercisesSchema } from './exercise-schema'

export const newWorkoutSchema = z.object({
  name: z.string(),
  exercises: z.array(exercisesSchema),
})

export type NewWorkoutSchemaType = z.infer<typeof newWorkoutSchema>

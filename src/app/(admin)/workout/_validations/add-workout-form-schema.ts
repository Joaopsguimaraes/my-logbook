import { z } from 'zod'
import { exercisesSchema } from '../../exercise/_validations/exercise-schema'

export const addWorkoutFormSchema = z.object({
  name: z.string(),
  exercises: z.array(exercisesSchema),
})

export type AddWorkoutFormSchemaType = z.infer<typeof addWorkoutFormSchema>

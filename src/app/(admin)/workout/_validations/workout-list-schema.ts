import { z } from 'zod'

export const workoutsListSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  hasProgress: z.boolean(),
  date: z.date(),
  exercise_id: z.string(),
})

export type WorkoutListSchemaType = z.infer<typeof workoutsListSchema>

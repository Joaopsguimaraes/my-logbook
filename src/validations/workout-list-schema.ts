import { z } from 'zod'

export const workoutsListSchema = z.object({
  id: z.string(),
  name: z.string(),
  date: z.date().nullable(),
  userId: z.string(),
})

export type WorkoutListSchemaType = z.infer<typeof workoutsListSchema>

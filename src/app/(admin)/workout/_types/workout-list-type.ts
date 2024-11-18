import type { z } from 'zod'
import type { workoutsListSchema } from '../_validations/workout-list-schema'

export type WorkoutListSchemaType = z.infer<typeof workoutsListSchema>

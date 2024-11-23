import { z } from 'zod'
import { exercisesSchema } from './exercise-schema'

export const addWorkoutFormSchema = z.object({
  name: z
    .string({
      required_error: 'Nome do treino é obrigatário',
    })
    .min(3, {
      message: 'Nome do treino é obrigatário',
    }),
  exercises: z.array(exercisesSchema),
})

export type AddWorkoutFormSchemaType = z.infer<typeof addWorkoutFormSchema>

'use server'

import { db } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import type { NewWorkoutSchemaType } from '../validations/new-workout-schema'
import { revalidateTag } from 'next/cache'

export async function newWorkout(input: NewWorkoutSchemaType) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('User not logged')
  }

  try {
    await db.workout.create({
      data: {
        ...input,
        userId,
        date: new Date(),
        exercises: {
          connectOrCreate: input.exercises.map(
            ({ id, weight, name, reps, series, annotation, muscleGroup }) => ({
              where: { id },
              create: {
                userId,
                name,
                weight,
                reps,
                series,
                annotation,
                muscleGroup,
                muscleExercise: {
                  connect: {
                    id:
                      input.exercises.find((ex) => ex.id === id)
                        ?.muscleExerciseId || '',
                  },
                },
              },
            }),
          ),
        },
      },
    })

    revalidateTag('exercise-list')
  } catch (error) {
    console.error(error)
    throw new Error('Has an error to create workout')
  }
}

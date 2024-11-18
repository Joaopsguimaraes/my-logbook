'use server'

import { db } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import type { NewWorkoutSchemaType } from '../_validations/new-workout-schema'
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
        hasProgress: false,
        date: new Date(),
        exercises: {
          connect: input.exercises.map(({ id }) => ({ id })),
        },
      },
    })

    revalidateTag('exercise-list')
  } catch (error) {
    console.error(error)
    throw new Error('Has an error to create workout')
  }
}

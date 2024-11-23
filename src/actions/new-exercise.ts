'use server'

import { auth } from '@clerk/nextjs/server'
import type { NewExerciseSchemaType } from '../validations/new-exercise-schema'
import { db } from '@/lib/prisma'

export async function newExercise(input: NewExerciseSchemaType) {
  const { userId } = await auth()

  if (!userId) {
    throw Error('User is not logged')
  }

  try {
    await db.exercise.create({
      data: {
        ...input,
        userId,
      },
    })
  } catch (error) {
    console.error({ error })
    throw Error('Fail to create exercise')
  }
}

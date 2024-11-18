'use server'

import { auth } from '@clerk/nextjs/server'
import type { NewExerciseSchemaType } from '../_validations/new-exercise-schema'
import type { Prisma } from '@prisma/client'
import { db } from '@/lib/prisma'

export async function newExercise(input: NewExerciseSchemaType) {
  const { userId } = await auth()

  if (!userId) {
    throw Error('User is not logged')
  }

  const data: Prisma.ExerciseCreateInput = {
    ...input,
    userId,
  }

  try {
    await db.exercise.create({
      data,
    })
  } catch (error) {
    console.error({ error })
    throw Error('Fail to create exercise')
  }
}

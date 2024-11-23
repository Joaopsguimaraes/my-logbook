import { db } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth()
  const { id } = await params
  if (!userId) {
    throw Error('User not logged')
  }

  const workout = await db.workout.findFirst({
    where: {
      userId,
      id,
    },
    select: {
      id: true,
      exercises: true,
      name: true,
      date: true,
    },
  })

  return NextResponse.json(workout)
}

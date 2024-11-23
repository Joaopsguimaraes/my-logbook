import { db } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    throw Error('User not logged')
  }

  const muscleExercise = await db.muscleExercise.findMany({})

  return NextResponse.json(muscleExercise)
}

export async function POST(request: Request) {
  const res = await request.json()
  console.log(res)
  const { userId } = await auth()

  if (!userId) {
    throw Error('User not logged')
  }

  const muscleExercise = await db.muscleExercise.create({
    data: {
      name: res.name,
    },
  })

  console.log(muscleExercise)

  return NextResponse.json(muscleExercise)
}

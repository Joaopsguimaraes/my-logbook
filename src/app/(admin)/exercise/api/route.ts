import { db } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    throw Error('User not logged')
  }

  const exercises = await db.exercise.findMany({})

  return NextResponse.json(exercises)
}

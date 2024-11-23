import { db } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { userId } = await auth()
  const { slug } = await params

  if (!userId) {
    throw Error('User not logged')
  }

  const exercise = await db.exercise.findMany({
    where: {
      userId,
      id: slug,
    },
  })

  return NextResponse.json(exercise)
}

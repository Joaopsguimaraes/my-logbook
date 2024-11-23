import { db } from '@/lib/prisma'

import { WorkoutList } from '@/components/workout/workout-list'

export default async function Page() {
  const workout = await db.workout.findMany({})

  return <WorkoutList workout={workout} />
}

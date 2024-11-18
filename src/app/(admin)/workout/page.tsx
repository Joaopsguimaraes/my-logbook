import { DataTable } from '@/components/ui/data-table'
import { db } from '@/lib/prisma'
import { workoutColumns } from './_components/workout-table-columns'
import { AddWorkoutButton } from './_components/add-workout-button'

export default async function Page() {
  const workout = await db.workout.findMany({})

  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-2xl font-bold">Diário dos treinos</h2>
        <AddWorkoutButton />
      </div>
      <DataTable columns={workoutColumns} data={workout} />
    </div>
  )
}

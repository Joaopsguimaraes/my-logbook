'use client'

import { useRef } from 'react'
import {
  AddWorkoutDialog,
  type AddWorkoutDialogRef,
} from './add-workout-dialog'
import { useWorkoutColumns } from './workout-table-columns'
import { Card } from '../ui/card'
import { DataTable } from '../ui/data-table'
import type { WorkoutListSchemaType } from '@/@types/workout-list-type'

import { Button } from '../ui/button'

interface Props {
  workout: WorkoutListSchemaType[]
}

export function WorkoutList({ workout }: Props) {
  const addWorkoutRef = useRef<AddWorkoutDialogRef>(null)

  function handleOpenDuplicateWorkout(workoutId: string) {
    addWorkoutRef.current?.handleOpen?.(workoutId)
  }

  function handleOpenAddWorkout() {
    addWorkoutRef.current?.handleOpen()
  }

  const { workoutColumns } = useWorkoutColumns({
    handleOpenDuplicateWorkout,
  })

  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
        <h2 className="text-2xl font-bold">Diário dos treinos</h2>
        <Button className="w-full md:w-40" onClick={handleOpenAddWorkout}>
          Adicionar treino
        </Button>
      </div>
      <Card className="p-10">
        <DataTable columns={workoutColumns} data={workout} />
      </Card>
      <AddWorkoutDialog ref={addWorkoutRef} />
    </div>
  )
}

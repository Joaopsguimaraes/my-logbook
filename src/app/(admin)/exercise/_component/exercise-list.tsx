'use client'

import { DataTable } from '@/components/ui/data-table'
import { useSelectedExercisesColumns } from './exercise-columns'

interface Props {
  exercises: Array<{
    name: string
    id: string
    muscleGroup: string
    weight: number
    reps: number
    annotation?: string
  }>
}

export function SelectedExerciseTable({ exercises }: Props) {
  const { selectedExerciseColumns } = useSelectedExercisesColumns()

  return <DataTable columns={selectedExerciseColumns} data={exercises} />
}

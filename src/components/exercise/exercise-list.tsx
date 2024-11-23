'use client'

import { DataTable } from '@/components/ui/data-table'
import { useSelectedExercisesColumns } from './exercise-columns'
import type { ExerciseSchemaType } from '../../validations/exercise-schema'
import { Card } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

interface Props {
  exercises: ExerciseSchemaType[]
}

export function SelectedExerciseTable({ exercises }: Props) {
  const { selectedExerciseColumns } = useSelectedExercisesColumns()

  return (
    <Card className="p-5">
      <ScrollArea className="w-52 md:w-full whitespace-nowrap">
        <DataTable columns={selectedExerciseColumns} data={exercises} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Card>
  )
}

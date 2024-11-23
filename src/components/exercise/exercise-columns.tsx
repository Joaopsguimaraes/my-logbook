'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import { useExercise } from '../../hooks/useExercise'
import type { ExerciseSchemaType } from '../../validations/exercise-schema'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'

const MUSCLE_GROUP_LABEL = {
  LEGS: 'PERNAS',
  BACK: 'COSTAS',
  SHOULDERS: 'OMBROS',
  CHEST: 'PEITO',
  ARMS: 'BRAÇOS',
}

export function useSelectedExercisesColumns() {
  const { removeSelectedExercisesFromId } = useExercise()

  const selectedExerciseColumns: ColumnDef<ExerciseSchemaType>[] = [
    {
      accessorKey: 'name',
      header: 'Nome',
    },
    {
      accessorKey: 'muscleGroup',
      header: 'Grupo Muscular',
      cell: ({ row }) => (
        <Badge>{MUSCLE_GROUP_LABEL[row.original.muscleGroup]}</Badge>
      ),
    },
    {
      accessorKey: 'weight',
      header: 'Peso',
    },
    {
      accessorKey: 'reps',
      header: 'Repetições',
    },
    {
      accessorKey: 'series',
      header: 'Series',
    },
    {
      accessorKey: 'id',
      header: 'Ações',
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeSelectedExercisesFromId(row.original.id)}
        >
          <TrashIcon />
        </Button>
      ),
    },
  ]

  return {
    selectedExerciseColumns,
  }
}

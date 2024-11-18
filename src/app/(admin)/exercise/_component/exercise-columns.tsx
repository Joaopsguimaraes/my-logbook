'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import { useExercise } from '../_hooks/useExercise'

export function useSelectedExercisesColumns() {
  const { removeSelectedExercisesFromId } = useExercise()

  const selectedExerciseColumns: ColumnDef<{
    name: string
    id: string
    muscleGroup: string
    weight: number
    reps: number
    annotation?: string
  }>[] = [
    {
      accessorKey: 'name',
      header: 'Nome',
    },
    {
      accessorKey: 'muscleGroup',
      header: 'Grupo muscular',
      cell: ({ row }) => <Badge>{row.original.muscleGroup}</Badge>,
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

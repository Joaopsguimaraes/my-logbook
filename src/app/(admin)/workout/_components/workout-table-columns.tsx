'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { EyeIcon } from 'lucide-react'
import type { WorkoutListSchemaType } from '../_types/workout-list-type'

export const workoutColumns: ColumnDef<WorkoutListSchemaType>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row }) => (
      <span>
        {format(new Date(row.original.date), 'dd/MM/yy', {
          locale: ptBR,
        })}
      </span>
    ),
  },
  {
    accessorKey: 'id',
    header: 'Visualizar',
    cell: ({ row }) => (
      <Button variant="ghost" size="icon">
        <EyeIcon />
      </Button>
    ),
  },
]

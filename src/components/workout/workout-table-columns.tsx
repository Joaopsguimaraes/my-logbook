'use client'

import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CopyIcon, EyeIcon } from 'lucide-react'
import Link from 'next/link'
import type { WorkoutListSchemaType } from '../../@types/workout-list-type'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { Button } from '@/components/ui/button'

export type UseWorkoutColumnsProps = {
  handleOpenDuplicateWorkout: (workout: string) => void
}

export function useWorkoutColumns({
  handleOpenDuplicateWorkout,
}: UseWorkoutColumnsProps) {
  const workoutColumns: ColumnDef<WorkoutListSchemaType>[] = [
    {
      accessorKey: 'name',
      header: () => (
        <DataTableColumnHeader title="Nome" className="flex w-52" />
      ),
      cell: ({ row }) => (
        <div className="flex w-52">
          <span>{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: 'date',
      header: () => (
        <DataTableColumnHeader title="Data" className="flex w-52" />
      ),
      cell: ({ row }) => (
        <div className="flex w-52">
          <span>
            {row.original.date &&
              format(new Date(row.original.date), 'PPPP', {
                locale: ptBR,
              })}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'id',
      header: 'Ações',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/workout/${row.original.id}`}
            className="inline-flex h-9 w-9 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          >
            <EyeIcon />
          </Link>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleOpenDuplicateWorkout(row.original.id)}
          >
            <CopyIcon />
          </Button>
        </div>
      ),
    },
  ]

  return {
    workoutColumns,
  }
}

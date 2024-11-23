import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { db } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { SelectedExerciseTable } from '../../../../components/exercise/exercise-list'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'My Logbook - Visualizar Treino',
  }
}

type Props = PageParams<{ id: string }>

export default async function Page({ params }: Props) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/login')
  }

  const workout = await db.workout.findUnique({
    where: {
      userId,
      id: params.id,
    },
  })

  const selectedExercises = await db.exercise.findMany({
    where: {
      userId,
      workout: {
        some: {
          id: workout?.id,
        },
      },
    },
  })

  return (
    <section>
      <Link href='/workout'>
        <Button variant="secondary" className="my-2 min-w-40">
          <ArrowLeftIcon />
          Voltar
        </Button>
      </Link>
      <div className="space-y-2">
        <div>
          <Label>Nome do treino</Label>
          <Input disabled value={workout?.name} />
        </div>

        <div className="flex w-full flex-col gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">Exercícios selecionados</span>
            <SelectedExerciseTable exercises={selectedExercises} />
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { AddWorkoutForm } from './add-workout-form'
import { ExerciseProvider } from '../../exercise/_context/exercise-provider'

export function AddWorkoutButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Adicionar treino</Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Criar treino</DialogTitle>
          <DialogDescription>
            Adicione os exercícios e dados do treino abaixo
          </DialogDescription>
        </DialogHeader>
        <ExerciseProvider>
          <AddWorkoutForm />
        </ExerciseProvider>
      </DialogContent>
    </Dialog>
  )
}

import { ExerciseProvider } from '@/context/exercise-provider'
import { forwardRef, useImperativeHandle, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet'
import { AddWorkoutForm } from './add-workout-form'

export type AddWorkoutDrawerRef = {
  handleOpen: (workoutId?: string) => void
  handleClose: () => void
}

export const AddWorkoutDrawer = forwardRef<AddWorkoutDrawerRef>((_, ref) => {
  const [workoutId, setWorkoutId] = useState<string | undefined>()
  const [open, setOpen] = useState(false)

  const handleOpen = (workoutId?: string) => {
    setWorkoutId(workoutId)
    setOpen(true)
  }
  const handleClose = () => {
    setWorkoutId(undefined)
    setOpen(false)
  }

  useImperativeHandle(ref, () => ({
    handleOpen,
    handleClose,
  }))

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {workoutId ? 'Duplicar treino' : 'Adicionar treino'}
          </SheetTitle>
          <SheetDescription>
            {workoutId
              ? 'Duplique o treino, criando um novo baseado no treino selecionado, editando os exercícios, repetições, cargas e etc'
              : 'Adicione o treino, informado qual exercício e suas informações'}
          </SheetDescription>
        </SheetHeader>
        <ExerciseProvider>
          <AddWorkoutForm onModalClose={handleClose} workoutId={workoutId} />
        </ExerciseProvider>
      </SheetContent>
    </Sheet>
  )
})

AddWorkoutDrawer.displayName = 'AddWorkoutDialog'

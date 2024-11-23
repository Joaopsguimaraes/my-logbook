import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { AddWorkoutForm } from './add-workout-form'
import { ExerciseProvider } from '@/context/exercise-provider'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

export type AddWorkoutDialogRef = {
  handleOpen: (workoutId?: string) => void
  handleClose: () => void
}

export const AddWorkoutDialog = forwardRef<AddWorkoutDialogRef>((_, ref) => {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="md:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {workoutId ? 'Duplicar treino' : 'Adicionar treino'}
          </DialogTitle>
          <DialogDescription>
            {workoutId
              ? 'Duplique o treino, criando um novo baseado no treino selecionado, editando os exercícios, repetições, cargas e etc'
              : 'Adicione o treino, informado qual exercício e suas informações'}
          </DialogDescription>
        </DialogHeader>
        <ExerciseProvider>
          <AddWorkoutForm onModalClose={handleClose} workoutId={workoutId} />
        </ExerciseProvider>
      </DialogContent>
    </Dialog>
  )
})

AddWorkoutDialog.displayName = 'AddWorkoutDialog'

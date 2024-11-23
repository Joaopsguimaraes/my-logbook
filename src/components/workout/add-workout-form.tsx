/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useExercise } from '../../hooks/useExercise'
import {
  addWorkoutFormSchema,
  type AddWorkoutFormSchemaType,
} from '../../validations/add-workout-form-schema'
import { newWorkout } from '../../actions/new-workout'
import { ExerciseForm } from '../exercise/exercise-form'
import { SelectedExerciseTable } from '../exercise/exercise-list'
import { useGetWorkoutFromId } from '@/hooks/use-get-workout-from-id'
import { SheetClose, SheetFooter } from '../ui/sheet'

interface Props {
  onModalClose: (open: boolean) => void
  workoutId?: string
}

export function AddWorkoutForm({ onModalClose, workoutId }: Props) {
  const { selectedExercises, addExercise } = useExercise()
  const form = useForm<AddWorkoutFormSchemaType>({
    resolver: zodResolver(addWorkoutFormSchema),
  })
  const { control, handleSubmit, setValue } = form
  const { data, isLoading, isSuccess } = useGetWorkoutFromId({
    id: workoutId,
  })

  const onSubmit = handleSubmit(async (data: AddWorkoutFormSchemaType) => {
    await newWorkout(data).then(() => onModalClose(false))
  })

  useEffect(() => {
    if (selectedExercises.length > 0) {
      setValue('exercises', selectedExercises)
    }
  }, [selectedExercises])

  useEffect(() => {
    if (isSuccess && data && !isLoading) {
      setValue('name', data.name)
      setValue('exercises', data.exercises)

      data.exercises.forEach((exercise) => {
        addExercise(exercise)
      })
    }
  }, [data, isSuccess, isLoading])

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-2">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do treino</FormLabel>
              <FormControl>
                <Input placeholder="Ex.: Treino de pernas" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full flex-col gap-5">
          <ExerciseForm />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">Exercícios selecionados</span>
            <SelectedExerciseTable exercises={selectedExercises} />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </SheetClose>
          <Button variant="default" type="submit">
            Adicionar
          </Button>
        </SheetFooter>
      </form>
    </Form>
  )
}

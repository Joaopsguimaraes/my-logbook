/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CreateQuickExercise } from '../../exercise/_component/create-quick-exercise'
import { useExercise } from '../../exercise/_hooks/useExercise'
import {
  addWorkoutFormSchema,
  type AddWorkoutFormSchemaType,
} from '../_validations/add-workout-form-schema'
import { newWorkout } from '../_actions/new-workout'

export function AddWorkoutForm() {
  const form = useForm<AddWorkoutFormSchemaType>({
    resolver: zodResolver(addWorkoutFormSchema),
  })
  const { control, handleSubmit, setValue } = form
  const { selectedExercises } = useExercise()

  const onSubmit = async (data: AddWorkoutFormSchemaType) => {
    console.log({ data })

    await newWorkout(data)
  }

  useEffect(() => {
    if (selectedExercises.length > 0) {
      setValue('exercises', selectedExercises)
    }
  }, [selectedExercises])

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do treino</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome do treino" {...field} />
              </FormControl>
              <FormDescription>Ex.: Treino perna</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <CreateQuickExercise />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="default" type="submit">
              Adicionar
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  )
}

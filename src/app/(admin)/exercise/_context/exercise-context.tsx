import type { Exercise } from '@prisma/client'
import { createContext } from 'react'
import type { ExerciseSchemaType } from '../_validations/exercise-schema'

export interface ExerciseContextProps {
  exercises: Exercise[]
  selectedExercises: ExerciseSchemaType[]
  addExercise: (exercise: ExerciseSchemaType) => void
  clearExercises: () => void
  exercisesOptions: Array<{
    label: string
    value: string
    muscleGroup: string
  }>
  removeSelectedExercisesFromId: (exerciseId: string) => void
}

export const ExerciseContext = createContext({} as ExerciseContextProps)

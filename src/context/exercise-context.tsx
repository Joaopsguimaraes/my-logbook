import type { ExerciseSchemaType } from '@/validations/exercise-schema'
import type { MuscleExercise } from '@prisma/client'
import { createContext } from 'react'

export interface ExerciseContextProps {
  muscleExercise: MuscleExercise[]
  selectedExercises: ExerciseSchemaType[]
  addExercise: (exercise: ExerciseSchemaType) => void
  isLoadingExercises: boolean
  isLoadingRegisterMuscleExercise: boolean
  addMuscleExercise: (exerciseName: string) => void
  clearExercises: () => void
  muscleExercisesOptions: Array<{
    label: string
    value: string
  }>
  removeSelectedExercisesFromId: (exerciseId: string) => void
}

export const ExerciseContext = createContext({} as ExerciseContextProps)

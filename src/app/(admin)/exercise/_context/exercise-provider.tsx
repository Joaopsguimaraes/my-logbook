import type { Exercise } from '@prisma/client'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ExerciseContext } from './exercise-context'
import type { ExerciseSchemaType } from '../_validations/exercise-schema'

type ExerciseProviderProps = {
  children: ReactNode
}

export function ExerciseProvider({ children }: ExerciseProviderProps) {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [selectedExercises, setSelectedExercises] = useState<
    ExerciseSchemaType[]
  >([])

  async function fetchExercises() {
    const response = await fetch('/exercise/api', {
      next: { tags: ['exercise-list'], revalidate: 60 },
    })

    const data = await response.json()

    setExercises(data)
  }

  useEffect(() => {
    fetchExercises()
  }, [])

  const addExercise = useCallback((exercise: ExerciseSchemaType) => {
    setSelectedExercises((prev) => [...prev, exercise])
  }, [])

  const clearExercises = useCallback(() => {
    setSelectedExercises([])
  }, [])

  const exercisesOptions = useMemo(
    () =>
      exercises.map((e) => ({
        label: e.name,
        value: e.id,
        muscleGroup: e.muscleGroup,
      })),
    [exercises],
  )

  const removeSelectedExercisesFromId = useCallback(
    (exerciseId: string) => {
      const exerciseFounded = selectedExercises.find(
        (exercise) => exercise.id === exerciseId,
      )

      if (!exerciseFounded) {
        throw new Error('Exercise not founded')
      }

      const newSelectedExercises = selectedExercises.filter(
        (exercise) => exercise.id !== exerciseId,
      )

      setSelectedExercises(newSelectedExercises)
    },
    [selectedExercises],
  )

  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        selectedExercises,
        addExercise,
        clearExercises,
        exercisesOptions,
        removeSelectedExercisesFromId,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  )
}

import type { MuscleExercise } from '@prisma/client'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ExerciseContext } from './exercise-context'
import type { ExerciseSchemaType } from '@/validations/exercise-schema'

type ExerciseProviderProps = {
  children: ReactNode
}

export function ExerciseProvider({ children }: ExerciseProviderProps) {
  const [muscleExercise, setMuscleExercise] = useState<MuscleExercise[]>([])
  const [isLoadingRegisterMuscleExercise, setIsLoadingRegisterMuscleExercise] =
    useState<boolean>(false)
  const [isLoadingExercises, setIsLoadingExercises] = useState<boolean>(false)
  const [selectedExercises, setSelectedExercises] = useState<
    ExerciseSchemaType[]
  >([])

  async function addMuscleExercise(name: string) {
    const body = JSON.stringify({ name })

    try {
      setIsLoadingRegisterMuscleExercise(true)

      await fetch('/exercise/api/muscle-exercise', {
        method: 'POST',
        body,
      }).then(async () => await fetchExercises())
    } catch (error) {
      setIsLoadingRegisterMuscleExercise(false)
    } finally {
      setIsLoadingRegisterMuscleExercise(false)
    }
  }

  async function fetchExercises() {
    try {
      setIsLoadingExercises(true)
      const response = await fetch('/exercise/api/muscle-exercise', {
        next: { tags: ['muscle-exercise-list'], revalidate: 60 },
      })

      const data = await response.json()

      setMuscleExercise(data)
    } catch (error) {
      setIsLoadingExercises(false)
    } finally {
      setIsLoadingExercises(false)
    }
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

  const muscleExercisesOptions = useMemo(
    () =>
      muscleExercise.map((e) => ({
        label: e.name,
        value: e.id,
      })),
    [muscleExercise],
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
        isLoadingExercises,
        isLoadingRegisterMuscleExercise,
        addMuscleExercise,
        muscleExercise,
        selectedExercises,
        addExercise,
        clearExercises,
        muscleExercisesOptions,
        removeSelectedExercisesFromId,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  )
}

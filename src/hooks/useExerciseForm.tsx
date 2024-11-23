import { useState, useCallback } from 'react'
import { produce } from 'immer'
import type { MuscleGroup } from '@prisma/client'

export function useExerciseForm() {
  const [exerciseForm, setExerciseForm] = useState({
    exerciseId: undefined as string | undefined,
    exerciseName: undefined as string | undefined,
    exerciseMuscleGroup: undefined as MuscleGroup | undefined,
    exerciseWeight: '',
    exerciseSeries: '',
    exerciseReps: '',
    exerciseAnnotation: '',
  })

  const updateField = useCallback(
    (field: keyof typeof exerciseForm, value: any) => {
      setExerciseForm(
        produce((draft) => {
          draft[field] = value
        }),
      )
    },
    [],
  )

  const clearForm = useCallback(() => {
    setExerciseForm((prevState) => ({
      exerciseId: undefined,
      exerciseName: undefined,
      exerciseMuscleGroup: prevState.exerciseMuscleGroup,
      exerciseSeries: '',
      exerciseWeight: '',
      exerciseReps: '',
      exerciseAnnotation: '',
    }))
  }, [])

  return {
    exerciseForm,
    updateField,
    clearForm,
  }
}

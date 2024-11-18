'use client'

import { useContext } from 'react'
import { ExerciseContext } from '../_context/exercise-context'

export const useExercise = () => {
  const context = useContext(ExerciseContext)

  if (!context)
    throw new Error('useExercise must be use inside ExerciseProvider')

  return context
}

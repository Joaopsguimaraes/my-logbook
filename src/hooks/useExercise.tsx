'use client'

import { ExerciseContext } from '@/context/exercise-context'
import { useContext } from 'react'

export const useExercise = () => {
  const context = useContext(ExerciseContext)

  if (!context)
    throw new Error('useExercise must be use inside ExerciseProvider')

  return context
}

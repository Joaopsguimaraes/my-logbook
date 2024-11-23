export interface WorkoutDetail {
  id: string
  exercises: Array<{
    id: string
    userId: string
    weight: number
    name: string
    reps: number
    series: number
    annotation: string
    muscleGroup: string
    workoutId: string | null
    muscleExerciseId: string
  }>
  name: string
  date: Date
}

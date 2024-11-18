import { SelectedExerciseTable } from './exercise-list'
import { ExerciseForm } from './exercise-form'
import { useExercise } from '../_hooks/useExercise'

export function CreateQuickExercise() {
  const { selectedExercises } = useExercise()

  return (
    <div className="flex w-full flex-col gap-5">
      <ExerciseForm />
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Exercícios selecionados</span>
        <SelectedExerciseTable exercises={selectedExercises} />
      </div>
    </div>
  )
}

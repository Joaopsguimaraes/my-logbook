import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { MuscleGroup } from '@prisma/client'
import { useExercise } from '../../hooks/useExercise'
import { useExerciseForm } from '../../hooks/useExerciseForm'

import { MUSCLE_GROUP_OPTIONS } from '@/constants/muscle-group-options'
import { SelectExerciseCombobox } from './select-exercise-combobox'

export function ExerciseForm() {
  const { addExercise } = useExercise()
  const { exerciseForm, updateField, clearForm } = useExerciseForm()

  const handleAddExercise = () => {
    const {
      exerciseId,
      exerciseName,
      exerciseMuscleGroup,
      exerciseWeight,
      exerciseReps,
      exerciseAnnotation,
      exerciseSeries,
    } = exerciseForm

    if (exerciseId && exerciseName && exerciseWeight && exerciseReps) {
      addExercise({
        id: exerciseId,
        name: exerciseName,
        muscleExerciseId: exerciseId,
        muscleGroup: exerciseMuscleGroup as MuscleGroup,
        weight: Number(exerciseWeight),
        reps: Number(exerciseReps),
        series: Number(exerciseSeries),
        annotation: exerciseAnnotation,
      })
      clearForm()
    }
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <SelectExerciseCombobox
        exerciseForm={exerciseForm}
        updateField={updateField}
      />
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Grupo muscular</span>
        <Select
          onValueChange={(value) => updateField('exerciseMuscleGroup', value)}
          value={exerciseForm.exerciseMuscleGroup}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MUSCLE_GROUP_OPTIONS.map(({ label, value }) => (
              <SelectItem value={value} key={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex w-full flex-col gap-5 md:flex-row">
        <div className="w-full md:w-1/3">
          <Label>Series</Label>
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Ex.: 3"
            value={exerciseForm.exerciseSeries}
            onChange={(e) => updateField('exerciseSeries', e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3">
          <Label>Repetições</Label>
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Ex.: 10"
            value={exerciseForm.exerciseReps}
            onChange={(e) => updateField('exerciseReps', e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3">
          <Label>Peso (KG)</Label>
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Ex.: 120"
            value={exerciseForm.exerciseWeight}
            onChange={(e) => updateField('exerciseWeight', e.target.value)}
          />
        </div>
      </div>
      <div>
        <Label>Observações</Label>
        <Input
          placeholder="Digite observações"
          value={exerciseForm.exerciseAnnotation}
          onChange={(e) => updateField('exerciseAnnotation', e.target.value)}
        />
      </div>

      <div className="flex flex-col justify-center gap-2 md:flex-row md:justify-end">
        <Button
          size="sm"
          className="w-full md:w-40"
          onClick={handleAddExercise}
          type="button"
        >
          Adicionar
        </Button>
      </div>
    </div>
  )
}

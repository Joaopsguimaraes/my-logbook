import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { MuscleGroup } from '@prisma/client'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useExercise } from '../../hooks/useExercise'
import { useExerciseForm } from '../../hooks/useExerciseForm'

import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { MUSCLE_GROUP_OPTIONS } from '@/constants/muscle-group-options'

export function ExerciseForm() {
  const {
    muscleExercisesOptions,
    addExercise,
    addMuscleExercise,
    isLoadingExercises,
    isLoadingRegisterMuscleExercise,
  } = useExercise()
  const { exerciseForm, updateField, clearForm } = useExerciseForm()
  const [registerExercise, setRegisterExercise] = useState('')

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
      <div className="flex w-full flex-col gap-2">
        <span className="text-sm font-medium">Exercício</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-between',
                !exerciseForm.exerciseId && 'text-muted-foreground',
              )}
            >
              {exerciseForm.exerciseId
                ? muscleExercisesOptions.find(
                    (opt) => opt.value === exerciseForm.exerciseId,
                  )?.label
                : 'Selecione o exercício'}
              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0">
            <Command>
              <CommandInput
                placeholder="Pesquise o exercício..."
                value={registerExercise}
                onValueChange={(s) => setRegisterExercise(s.toUpperCase())}
              />
              <CommandList>
                {isLoadingExercises || isLoadingRegisterMuscleExercise ? (
                  <div className="space-y-2 p-2">
                    {Array.from({ length: 1 }).map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full" />
                    ))}
                  </div>
                ) : (
                  <CommandEmpty>
                    <Button
                      className="w-full"
                      variant="ghost"
                      type="button"
                      onClick={() => addMuscleExercise(registerExercise)}
                    >
                      Cadastrar{' '}
                      <span className="underline underline-offset-2">
                        {registerExercise}
                      </span>{' '}
                      ?
                    </Button>
                  </CommandEmpty>
                )}
                {isLoadingRegisterMuscleExercise ? (
                  <div className="space-y-2 p-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full" />
                    ))}
                  </div>
                ) : (
                  <CommandGroup>
                    {muscleExercisesOptions.map(({ label, value }) => (
                      <CommandItem
                        key={value}
                        value={label}
                        onSelect={() => {
                          updateField('exerciseName', label)
                          updateField('exerciseId', value)
                        }}
                      >
                        {label}
                        <Check
                          className={cn(
                            'ml-auto',
                            exerciseForm.exerciseId === value
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
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
            placeholder="Ex.: 3"
            value={exerciseForm.exerciseSeries}
            onChange={(e) => updateField('exerciseSeries', e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3">
          <Label>Repetições</Label>
          <Input
            type="number"
            placeholder="Ex.: 10"
            value={exerciseForm.exerciseReps}
            onChange={(e) => updateField('exerciseReps', e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3">
          <Label>Peso (KG)</Label>
          <Input
            type="number"
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

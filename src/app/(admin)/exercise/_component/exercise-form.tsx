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
import { MUSCLE_GROUP_OPTIONS } from '../_constant/muscle-group-options'
import { useExercise } from '../_hooks/useExercise'
import { useExerciseForm } from '../_hooks/useExerciseForm'

export function ExerciseForm() {
  const { exercisesOptions, addExercise } = useExercise()
  const { exerciseForm, updateField, clearForm } = useExerciseForm()

  const handleAddExercise = () => {
    const {
      exerciseId,
      exerciseName,
      exerciseMuscleGroup,
      exerciseWeight,
      exerciseReps,
      exerciseAnnotation,
    } = exerciseForm

    if (exerciseId && exerciseName && exerciseWeight && exerciseReps) {
      addExercise({
        id: exerciseId,
        name: exerciseName,
        exerciseImage: '',
        hasProgress: false,
        muscleGroup: exerciseMuscleGroup as MuscleGroup,
        weight: Number(exerciseWeight),
        reps: Number(exerciseReps),
        annotation: exerciseAnnotation,
      })
      clearForm()
    }
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2">
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
                ? exercisesOptions.find(
                    (opt) => opt.value === exerciseForm.exerciseId,
                  )?.label
                : 'Selecione o exercício'}
              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Pesquise o exercício..." />
              <CommandList>
                <CommandEmpty>Nenhum exercício encontrado</CommandEmpty>
                <CommandGroup>
                  {exercisesOptions.map(({ label, value }) => (
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

      <div className="flex gap-5">
        <div className="w-1/2">
          <Label>Peso (KG)</Label>
          <Input
            type="number"
            placeholder="Ex.: 120"
            value={exerciseForm.exerciseWeight}
            onChange={(e) => updateField('exerciseWeight', e.target.value)}
          />
        </div>
        <div className="w-1/2">
          <Label>Repetições</Label>
          <Input
            type="number"
            placeholder="Ex.: 10"
            value={exerciseForm.exerciseReps}
            onChange={(e) => updateField('exerciseReps', e.target.value)}
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

      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={clearForm} type="button">
          Limpar
        </Button>
        <Button size="sm" onClick={handleAddExercise} type="button">
          Adicionar
        </Button>
      </div>
    </div>
  )
}

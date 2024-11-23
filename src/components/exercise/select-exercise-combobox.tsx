import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
  useExerciseForm,
  type ExerciseFormType,
  type UpdateField,
} from '@/hooks/useExerciseForm'
import { useExercise } from '@/hooks/useExercise'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { Skeleton } from '../ui/skeleton'
import { useState } from 'react'
import { PopoverClose } from '@radix-ui/react-popover'

interface Props {
  exerciseForm: ExerciseFormType
  updateField: UpdateField
}

export function SelectExerciseCombobox({ exerciseForm, updateField }: Props) {
  const {
    muscleExercisesOptions,
    addMuscleExercise,
    isLoadingExercises,
    isLoadingRegisterMuscleExercise,
  } = useExercise()
  const [registerExercise, setRegisterExercise] = useState('')
  const [openPopover, setOpenPopover] = useState<boolean>(false)

  return (
    <div className="flex w-full flex-col gap-2">
      <span className="text-sm font-medium">Exercício</span>
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
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
        <PopoverContent
          className="w-[300px] p-0"
          side="bottom"
          avoidCollisions={false}
        >
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
                        setOpenPopover(false)
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
  )
}

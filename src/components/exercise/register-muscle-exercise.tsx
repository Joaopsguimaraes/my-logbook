import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PlusIcon } from 'lucide-react'

export function RegisterMuscleExercise() {
  return (
    <Popover>
      <TooltipProvider>
        <PopoverTrigger asChild>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" type="button" variant="outline">
                <PlusIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span>Cadastrar novo exercício muscular</span>
            </TooltipContent>
          </Tooltip>
        </PopoverTrigger>
      </TooltipProvider>
      <PopoverContent>
        <div>
          <Input placeholder="Ex.: Supino reto com halteres" />
        </div>
      </PopoverContent>
    </Popover>
  )
}

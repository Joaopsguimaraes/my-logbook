import { MuscleGroup } from '@prisma/client'
import { MUSCLE_GROUP_LABEL } from './muscle-group-label'

export const MUSCLE_GROUP_OPTIONS = [
  {
    label: MUSCLE_GROUP_LABEL[MuscleGroup.ARMS],
    value: MuscleGroup.ARMS,
  },
  {
    label: MUSCLE_GROUP_LABEL[MuscleGroup.BACK],
    value: MuscleGroup.BACK,
  },
  {
    label: MUSCLE_GROUP_LABEL[MuscleGroup.CHEST],
    value: MuscleGroup.CHEST,
  },
  {
    label: MUSCLE_GROUP_LABEL[MuscleGroup.LEGS],
    value: MuscleGroup.LEGS,
  },
  {
    label: MUSCLE_GROUP_LABEL[MuscleGroup.SHOULDERS],
    value: MuscleGroup.SHOULDERS,
  },
]

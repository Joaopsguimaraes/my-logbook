import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { NewWorkoutSchemaType } from '@/validations/new-workout-schema'

interface Params {
  id?: string
}

export function useGetWorkoutFromId({ id }: Params) {
  const queryKey = ['workout-detail', id]
  const queryFn = async () => {
    const { data: workout } = await axios.get<NewWorkoutSchemaType>(
      `/workout/api/${id}`,
    )

    return workout
  }

  return useQuery({
    queryKey,
    queryFn,
    enabled: Boolean(id),
  })
}

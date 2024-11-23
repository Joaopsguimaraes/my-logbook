import { PageRoutes } from '@/constants/page-routes'

type MainNavigationConfigType = {
  path: PageRoutes
  label: string
  isVisible: boolean
}

export const mainNavigationConfig: MainNavigationConfigType[] = [
  {
    path: PageRoutes.HOME,
    label: 'Inicio',
    isVisible: true,
  },
  {
    path: PageRoutes.WORKOUT,
    label: 'Workout',
    isVisible: true,
  },
]

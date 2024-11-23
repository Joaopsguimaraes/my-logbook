import Link from 'next/link'

import { cn } from '@/lib/utils'

interface MainNavigationLinkProps {
  path: string
  name: string
  isVisible: boolean
}

export function MainNavigationLink({
  path,
  name,
  isVisible,
}: MainNavigationLinkProps) {
  return (
    <Link
      href={path}
      className={cn('transition-colors hover:text-foreground/80')}
    >
      {name}
    </Link>
  )
}

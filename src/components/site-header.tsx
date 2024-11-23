import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/ui/icons'
import { MainNav } from '@/components/main-nav'
import { MobileNav } from '@/components/mobile-nav'
import { ModeToggle } from '@/components/mode-toggle'
import { buttonVariants } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-primary">
      <div className="container flex h-20 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <span />
          </div>
          <nav className="flex items-center gap-2">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'h-8 w-8 px-0',
                )}
              >
                <Icons.gitHub className="text-white h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'h-8 w-8 px-0 text-white',
                )}
              >
                <Icons.twitter className="h-3 w-3 fill-white" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ModeToggle />
            <UserButton />
          </nav>
        </div>
      </div>
    </header>
  )
}

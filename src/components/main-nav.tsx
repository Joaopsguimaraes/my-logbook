'use client'

import { PageRoutes } from '@/constants/page-routes'
import Link from 'next/link'

import { mainNavigationConfig } from '@/config/main-navigation-config'

import Image from 'next/image'
import { MainNavigationLink } from './main-navigation-link'

export function MainNav() {
  return (
    <div className="mr-4 hidden md:flex pt-10">
      <Link
        href={PageRoutes.HOME}
        className="mr-4 flex items-center space-x-2 lg:mr-6"
      >
        <Image src="/logo.png" alt="My logbook" width={200} height={60} />
      </Link>
      <nav className="hidden items-center gap-4 text-sm lg:gap-6">
        {mainNavigationConfig.map(({ label, path, isVisible }) => (
          <MainNavigationLink
            name={label}
            path={path as string}
            isVisible={isVisible}
            key={path}
          />
        ))}
      </nav>
    </div>
  )
}

'use client'

import * as React from 'react'
import Link from 'next/link'

import Image from 'next/image'
import { PageRoutes } from '@/constants/page-routes'

export function MobileNav() {
  return (
    <div className="mr-10 md:hidden">
      <Link
        href={PageRoutes.HOME}
        className="flex items-center space-x-2 lg:mr-6"
      >
        <Image src="/logo.png" alt="My logbook" width={200} height={80} />
      </Link>
    </div>
  )
}

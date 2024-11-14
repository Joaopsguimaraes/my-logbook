import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Logbook',
  description: 'Gerencie seus treinos e progressões',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} h-screen antialiased`}>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  )
}

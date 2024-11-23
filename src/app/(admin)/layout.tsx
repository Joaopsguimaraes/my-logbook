import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { QueryClientProvider } from '@/providers/query-client-provider'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryClientProvider>
      <SiteHeader />
      <main className="container relative my-14 flex-1">{children}</main>
      <SiteFooter />
    </QueryClientProvider>
  )
}

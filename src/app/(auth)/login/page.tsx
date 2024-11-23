import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { LogInIcon } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'

async function LoginPage() {
  const { userId } = await auth()

  if (userId) {
    redirect('/')
  }

  return (
    <div className="grid h-screen w-screen md:grid-cols-2 md:bg-black">
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <h1 className="mb-3 text-4xl font-bold md:text-white">Bem vindo</h1>
        <div className="relative md:hidden size-40 mx-auto">
        <Image src="/logo.png" alt="My logbook" fill className="object-cover" />
      </div>
        <p className="md:text-white mb-8">
          Gerencie seus treinos, evolução e progressão de seus exercisios para melhores resultados
        </p>
        <SignInButton>
          <Button variant="outline">
            <LogInIcon className="mr-2 size-4" />
            Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>
      <div className="hidden md:relative size-full bg-white">
        <Image src="/logo.png" alt="My logbook" fill className="object-cover" />
      </div>
    </div>
  )
}

export default LoginPage

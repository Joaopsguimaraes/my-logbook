import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  await prisma.muscleExercise.createMany({
    data: [
      {
        name: 'LEVANTAMENTO TERRA',
      },
      {
        name: 'REMADA CURVADA',
      },
      {
        name: 'REMADA CAVALO',
      },
      {
        name: 'REMADA UNILATERAL',
      },
      {
        name: 'REMADA BAIXA',
      },
      {
        name: 'SUPINO RETO',
      },
      {
        name: 'SUPINO INCLINADO',
      },
      {
        name: 'CROSS OVER',
      },
      {
        name: 'ELEVAÇÃO LATERAL',
      },
      {
        name: 'ELEVAÇÃO FRONTAL',
      },
    ],
    skipDuplicates: true,
  })
}

seed()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

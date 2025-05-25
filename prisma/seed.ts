import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Criar categorias
  const limpeza = await prisma.category.upsert({
    where: { name: 'Limpeza' },
    update: {},
    create: {
      name: 'Limpeza',
      description: 'Serviços de limpeza residencial e comercial'
    }
  })

  const obras = await prisma.category.upsert({
    where: { name: 'Obras' },
    update: {},
    create: {
      name: 'Obras',
      description: 'Pequenos reparos e reformas'
    }
  })

  const pintura = await prisma.category.upsert({
    where: { name: 'Pintura' },
    update: {},
    create: {
      name: 'Pintura',
      description: 'Pintura interna, externa e artística'
    }
  })

  // Criar usuário cliente de exemplo
  const hashedPassword = await bcrypt.hash('123456', 10)
  
  const cliente = await prisma.user.upsert({
    where: { email: 'cliente@exemplo.com' },
    update: {},
    create: {
      name: 'João Silva',
      email: 'cliente@exemplo.com',
      passwordHash: hashedPassword,
      phone: '(11) 99999-9999',
      role: 'CLIENT'
    }
  })

  // Criar usuário trabalhador de exemplo
  const trabalhador = await prisma.user.upsert({
    where: { email: 'trabalhador@exemplo.com' },
    update: {},
    create: {
      name: 'Maria Santos',
      email: 'trabalhador@exemplo.com',
      passwordHash: hashedPassword,
      phone: '(11) 88888-8888',
      role: 'WORKER'
    }
  })

  // Criar perfil do trabalhador
  const perfilTrabalhador = await prisma.workerProfile.upsert({
    where: { userId: trabalhador.id },
    update: {},
    create: {
      userId: trabalhador.id,
      bio: 'Profissional experiente em limpeza e pequenos reparos',
      location: 'São Paulo, SP',
      rating: 4.8
    }
  })

  // Associar categorias ao trabalhador
  await prisma.workerCategory.upsert({
    where: {
      workerId_categoryId: {
        workerId: perfilTrabalhador.id,
        categoryId: limpeza.id
      }
    },
    update: {},
    create: {
      workerId: perfilTrabalhador.id,
      categoryId: limpeza.id
    }
  })

  await prisma.workerCategory.upsert({
    where: {
      workerId_categoryId: {
        workerId: perfilTrabalhador.id,
        categoryId: obras.id
      }
    },
    update: {},
    create: {
      workerId: perfilTrabalhador.id,
      categoryId: obras.id
    }
  })

  console.log('Seed executado com sucesso!')
  console.log('Categorias criadas:', { limpeza, obras, pintura })
  console.log('Usuários criados:', { cliente, trabalhador })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 
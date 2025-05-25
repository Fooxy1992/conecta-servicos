import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Limpeza' },
      update: {},
      create: {
        name: 'Limpeza',
        description: 'Serviços de limpeza residencial e comercial'
      }
    }),
    prisma.category.upsert({
      where: { name: 'Obras' },
      update: {},
      create: {
        name: 'Obras',
        description: 'Serviços de construção e reforma'
      }
    }),
    prisma.category.upsert({
      where: { name: 'Pintura' },
      update: {},
      create: {
        name: 'Pintura',
        description: 'Serviços de pintura residencial e comercial'
      }
    })
  ])

  console.log('✅ Categories created')

  // Create test users
  const hashedPassword = await bcrypt.hash('123456', 10)

  const clientUser = await prisma.user.upsert({
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

  const workerUser = await prisma.user.upsert({
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

  console.log('✅ Users created')

  // Create worker profile
  const workerProfile = await prisma.workerProfile.upsert({
    where: { userId: workerUser.id },
    update: {},
    create: {
      userId: workerUser.id,
      bio: 'Profissional experiente em limpeza residencial e comercial',
      location: 'São Paulo, SP',
      rating: 4.8,
      availability: {
        monday: { start: '08:00', end: '18:00' },
        tuesday: { start: '08:00', end: '18:00' },
        wednesday: { start: '08:00', end: '18:00' },
        thursday: { start: '08:00', end: '18:00' },
        friday: { start: '08:00', end: '18:00' },
        saturday: { start: '09:00', end: '15:00' }
      }
    }
  })

  // Associate worker with categories
  await prisma.workerCategory.upsert({
    where: {
      workerId_categoryId: {
        workerId: workerProfile.id,
        categoryId: categories[0].id // Limpeza
      }
    },
    update: {},
    create: {
      workerId: workerProfile.id,
      categoryId: categories[0].id
    }
  })

  await prisma.workerCategory.upsert({
    where: {
      workerId_categoryId: {
        workerId: workerProfile.id,
        categoryId: categories[2].id // Pintura
      }
    },
    update: {},
    create: {
      workerId: workerProfile.id,
      categoryId: categories[2].id
    }
  })

  console.log('✅ Worker profile and categories associated')

  // Create additional test workers
  const worker2User = await prisma.user.upsert({
    where: { email: 'construtor@exemplo.com' },
    update: {},
    create: {
      name: 'Carlos Pereira',
      email: 'construtor@exemplo.com',
      passwordHash: hashedPassword,
      phone: '(11) 77777-7777',
      role: 'WORKER'
    }
  })

  const worker2Profile = await prisma.workerProfile.upsert({
    where: { userId: worker2User.id },
    update: {},
    create: {
      userId: worker2User.id,
      bio: 'Especialista em obras e reformas com 15 anos de experiência',
      location: 'São Paulo, SP',
      rating: 4.9,
      availability: {
        monday: { start: '07:00', end: '17:00' },
        tuesday: { start: '07:00', end: '17:00' },
        wednesday: { start: '07:00', end: '17:00' },
        thursday: { start: '07:00', end: '17:00' },
        friday: { start: '07:00', end: '17:00' }
      }
    }
  })

  await prisma.workerCategory.upsert({
    where: {
      workerId_categoryId: {
        workerId: worker2Profile.id,
        categoryId: categories[1].id // Obras
      }
    },
    update: {},
    create: {
      workerId: worker2Profile.id,
      categoryId: categories[1].id
    }
  })

  console.log('✅ Additional workers created')
  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 
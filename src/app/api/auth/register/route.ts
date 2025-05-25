import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  console.log('🚀 Register API called')
  
  try {
    // Teste de conexão primeiro
    console.log('🔍 Testing database connection...')
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ Database connection successful')

    const body = await request.json()
    console.log('📝 Request body:', { ...body, password: '[HIDDEN]' })
    
    const { name, email, password, phone, role, bio, location } = body

    // Validações básicas
    if (!name || !email || !password || !role) {
      console.log('❌ Missing required fields')
      return NextResponse.json(
        { message: 'Campos obrigatórios não preenchidos' },
        { status: 400 }
      )
    }

    console.log('🔍 Checking if user exists...')
    // Verificar se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      console.log('❌ User already exists')
      return NextResponse.json(
        { message: 'Email já cadastrado' },
        { status: 400 }
      )
    }

    console.log('🔐 Hashing password...')
    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    console.log('👤 Creating user...')
    // Criar usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        phone: phone || null,
        role: role as 'CLIENT' | 'WORKER'
      }
    })
    console.log('✅ User created:', user.id)

    // Se for trabalhador, criar perfil
    if (role === 'WORKER') {
      if (!location) {
        console.log('❌ Missing location for worker')
        return NextResponse.json(
          { message: 'Localização é obrigatória para trabalhadores' },
          { status: 400 }
        )
      }

      console.log('👷 Creating worker profile...')
      await prisma.workerProfile.create({
        data: {
          userId: user.id,
          bio: bio || '',
          location,
          rating: 0
        }
      })
      console.log('✅ Worker profile created')
    }

    // Remover senha do retorno
    const { passwordHash, ...userWithoutPassword } = user

    console.log('🎉 Registration successful')
    return NextResponse.json({
      message: 'Usuário criado com sucesso',
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('💥 Error in register API:', error)
    
    // Log mais detalhado do erro
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    // Log do tipo de erro do Prisma
    if (error && typeof error === 'object' && 'code' in error) {
      console.error('Prisma error code:', (error as any).code)
      console.error('Prisma error meta:', (error as any).meta)
    }
    
    return NextResponse.json(
      { 
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error : 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
} 
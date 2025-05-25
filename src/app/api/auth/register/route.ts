import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, phone, role, bio, location } = body

    // Validações básicas
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: 'Campos obrigatórios não preenchidos' },
        { status: 400 }
      )
    }

    // Verificar se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email já cadastrado' },
        { status: 400 }
      )
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        phone,
        role: role as 'CLIENT' | 'WORKER'
      }
    })

    // Se for trabalhador, criar perfil
    if (role === 'WORKER') {
      if (!location) {
        return NextResponse.json(
          { message: 'Localização é obrigatória para trabalhadores' },
          { status: 400 }
        )
      }

      await prisma.workerProfile.create({
        data: {
          userId: user.id,
          bio: bio || '',
          location,
          rating: 0
        }
      })
    }

    // Remover senha do retorno
    const { passwordHash, ...userWithoutPassword } = user

    return NextResponse.json({
      message: 'Usuário criado com sucesso',
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    
    // Log mais detalhado do erro
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    return NextResponse.json(
      { 
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
} 
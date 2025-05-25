import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validações básicas
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        workerProfile: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.passwordHash)

    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Remover senha do retorno
    const { passwordHash, ...userWithoutPassword } = user

    return NextResponse.json({
      message: 'Login realizado com sucesso',
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Erro ao fazer login:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 
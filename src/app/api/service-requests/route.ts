import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { clientId, workerId, categoryId, description } = body

    // Validações básicas
    if (!clientId || !workerId || !categoryId || !description) {
      return NextResponse.json(
        { message: 'Campos obrigatórios não preenchidos' },
        { status: 400 }
      )
    }

    // Criar solicitação de serviço
    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        clientId,
        workerId,
        categoryId,
        description,
        status: 'PENDING'
      },
      include: {
        client: {
          select: {
            name: true,
            email: true,
            phone: true
          }
        },
        worker: {
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        },
        category: {
          select: {
            name: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Solicitação criada com sucesso',
      serviceRequest
    })

  } catch (error) {
    console.error('Erro ao criar solicitação:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const userRole = searchParams.get('userRole')

    if (!userId || !userRole) {
      return NextResponse.json(
        { message: 'Parâmetros obrigatórios não fornecidos' },
        { status: 400 }
      )
    }

    let whereClause = {}
    
    if (userRole === 'CLIENT') {
      whereClause = { clientId: userId }
    } else if (userRole === 'WORKER') {
      // Para trabalhadores, buscar pelo perfil
      const workerProfile = await prisma.workerProfile.findUnique({
        where: { userId }
      })
      
      if (!workerProfile) {
        return NextResponse.json(
          { message: 'Perfil de trabalhador não encontrado' },
          { status: 404 }
        )
      }
      
      whereClause = { workerId: workerProfile.id }
    }

    const serviceRequests = await prisma.serviceRequest.findMany({
      where: whereClause,
      include: {
        client: {
          select: {
            name: true,
            email: true,
            phone: true
          }
        },
        worker: {
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        },
        category: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(serviceRequests)

  } catch (error) {
    console.error('Erro ao buscar solicitações:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 
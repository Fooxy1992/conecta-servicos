import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const location = searchParams.get('location')

    const workers = await prisma.workerProfile.findMany({
      where: {
        AND: [
          category ? {
            categories: {
              some: {
                categoryId: category
              }
            }
          } : {},
          location ? {
            location: {
              contains: location,
              mode: 'insensitive'
            }
          } : {}
        ]
      },
      include: {
        user: {
          select: {
            name: true,
            phone: true
          }
        },
        categories: {
          include: {
            category: {
              select: {
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        rating: 'desc'
      }
    })

    return NextResponse.json(workers)
  } catch (error) {
    console.error('Erro ao buscar trabalhadores:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 
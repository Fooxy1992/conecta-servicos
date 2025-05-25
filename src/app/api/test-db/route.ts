import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Teste simples de conexão
    const result = await prisma.$queryRaw`SELECT 1 as test`
    
    // Teste de contagem de categorias
    const categoriesCount = await prisma.category.count()
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      test: result,
      categoriesCount
    })
  } catch (error) {
    console.error('Database connection error:', error)
    
    return NextResponse.json({
      status: 'error',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 
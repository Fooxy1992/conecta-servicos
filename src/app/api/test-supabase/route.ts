import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('🧪 Testing Supabase connection...')
    
    // Teste de conexão básica
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .limit(5)
    
    if (categoriesError) {
      console.error('❌ Categories query failed:', categoriesError)
      throw categoriesError
    }
    
    // Teste de contagem de usuários
    const { count: usersCount, error: usersError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
    
    if (usersError) {
      console.error('❌ Users count failed:', usersError)
      throw usersError
    }
    
    console.log('✅ Supabase connection successful')
    
    return NextResponse.json({
      status: 'success',
      message: 'Supabase connection successful',
      data: {
        categories: categories || [],
        categoriesCount: categories?.length || 0,
        usersCount: usersCount || 0
      },
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('💥 Supabase connection error:', error)
    
    return NextResponse.json({
      status: 'error',
      message: 'Supabase connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error && typeof error === 'object' ? error : undefined,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 
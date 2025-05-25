import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('🔍 Checking table structure...')
    
    // Verificar se a tabela users existe e sua estrutura
    const { data: usersInfo, error: usersError } = await supabase
      .rpc('get_table_info', { table_name: 'users' })
    
    if (usersError) {
      console.log('❌ Error getting users table info:', usersError)
    }
    
    // Tentar uma query simples na tabela users
    const { data: usersData, error: usersQueryError } = await supabase
      .from('users')
      .select('*')
      .limit(1)
    
    // Verificar tabela worker_profiles
    const { data: workersData, error: workersQueryError } = await supabase
      .from('worker_profiles')
      .select('*')
      .limit(1)
    
    // Verificar tabela categories
    const { data: categoriesData, error: categoriesQueryError } = await supabase
      .from('categories')
      .select('*')
      .limit(1)
    
    return NextResponse.json({
      status: 'success',
      message: 'Table structure check',
      data: {
        users: {
          info: usersInfo || 'No RPC available',
          sample: usersData || [],
          error: usersQueryError?.message || null
        },
        worker_profiles: {
          sample: workersData || [],
          error: workersQueryError?.message || null
        },
        categories: {
          sample: categoriesData || [],
          error: categoriesQueryError?.message || null
        }
      },
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('💥 Error checking tables:', error)
    
    return NextResponse.json({
      status: 'error',
      message: 'Error checking table structure',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  console.log('🚀 Supabase Auth Login API called')
  
  try {
    const body = await request.json()
    console.log('📝 Login attempt for email:', body.email)
    
    const { email, password } = body

    // Validações básicas
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    console.log('🔐 Attempting login with Supabase Auth...')
    
    // Usar a autenticação nativa do Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    if (authError) {
      console.log('❌ Login failed:', authError.message)
      
      // Retornar erro mais amigável
      let errorMessage = 'Erro ao fazer login'
      if (authError.message.includes('Invalid login credentials')) {
        errorMessage = 'Email ou senha incorretos'
      } else if (authError.message.includes('Email not confirmed')) {
        errorMessage = 'Email não confirmado. Verifique sua caixa de entrada.'
      }
      
      return NextResponse.json(
        { message: errorMessage },
        { status: 401 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { message: 'Erro ao autenticar usuário' },
        { status: 401 }
      )
    }

    console.log('✅ Login successful for user:', authData.user.id)

    // Buscar dados adicionais do usuário se necessário
    const userData: any = {
      id: authData.user.id,
      email: authData.user.email,
      name: authData.user.user_metadata?.name || authData.user.email,
      role: authData.user.user_metadata?.role || 'CLIENT',
      phone: authData.user.user_metadata?.phone || null
    }

    // Se for trabalhador, buscar perfil adicional
    if (userData.role === 'WORKER') {
      console.log('👷 Fetching worker profile...')
      
      const { data: workerProfile, error: profileError } = await supabase
        .from('worker_profiles')
        .select('*')
        .eq('user_id', authData.user.id)
        .single()

      if (!profileError && workerProfile) {
        userData.workerProfile = workerProfile
        console.log('✅ Worker profile found')
      }
    }

    return NextResponse.json({
      message: 'Login realizado com sucesso',
      user: userData,
      session: {
        access_token: authData.session?.access_token,
        refresh_token: authData.session?.refresh_token,
        expires_at: authData.session?.expires_at
      }
    })

  } catch (error) {
    console.error('💥 Error in Supabase Auth login API:', error)
    
    return NextResponse.json(
      { 
        message: 'Erro interno do servidor',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
} 
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  console.log('🚀 Supabase Auth Register API called')
  
  try {
    const body = await request.json()
    console.log('📝 Request body:', { ...body, password: '[HIDDEN]' })
    
    const { name, email, password, phone, role, bio, location } = body

    // Validações básicas
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: 'Campos obrigatórios não preenchidos' },
        { status: 400 }
      )
    }

    console.log('👤 Creating user with Supabase Auth...')
    
    // Usar a autenticação nativa do Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
          phone: phone || null,
          role: role.toUpperCase(),
          bio: bio || null,
          location: location || null
        }
      }
    })

    if (authError) {
      console.log('❌ Error creating user with Supabase Auth:', authError)
      throw authError
    }

    console.log('✅ User created with Supabase Auth:', authData.user?.id)

    // Se o usuário foi criado e for trabalhador, criar perfil adicional
    if (authData.user && role === 'WORKER' && location) {
      console.log('👷 Creating worker profile...')
      
      const { data: profile, error: profileError } = await supabase
        .from('worker_profiles')
        .insert([{
          user_id: authData.user.id,
          bio: bio || '',
          location: location,
          rating: 0
        }])
        .select('*')
        .single()

      if (profileError) {
        console.log('❌ Error creating worker profile:', profileError)
        // Não falhar se o perfil não for criado
      } else {
        console.log('✅ Worker profile created')
      }
    }

    return NextResponse.json({
      message: 'Usuário criado com sucesso',
      user: {
        id: authData.user?.id,
        email: authData.user?.email,
        name: name,
        role: role.toUpperCase()
      }
    })

  } catch (error) {
    console.error('💥 Error in Supabase Auth register API:', error)
    
    return NextResponse.json(
      { 
        message: 'Erro interno do servidor',
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error && typeof error === 'object' ? error : undefined,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
} 
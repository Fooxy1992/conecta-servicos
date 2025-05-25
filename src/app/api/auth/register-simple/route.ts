import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  console.log('🚀 Simple Register API called')
  
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

    console.log('🔐 Hashing password...')
    const hashedPassword = await bcrypt.hash(password, 10)

    console.log('👤 Creating user with SQL...')
    
    // Usar SQL direto para inserir usuário
    const { data: userData, error: userError } = await supabase.rpc('create_user_simple', {
      p_name: name,
      p_email: email,
      p_password_hash: hashedPassword,
      p_phone: phone || null,
      p_role: role.toUpperCase()
    })

    if (userError) {
      console.log('❌ Error creating user with RPC:', userError)
      
      // Fallback: tentar inserção direta simples
      console.log('🔄 Trying direct insert...')
      
      const { data: directUser, error: directError } = await supabase
        .from('users')
        .insert([{
          name: name,
          email: email,
          password_hash: hashedPassword,
          phone: phone || null,
          role: role.toUpperCase()
        }])
        .select('*')
        .single()

      if (directError) {
        console.log('❌ Direct insert also failed:', directError)
        throw directError
      }

      console.log('✅ User created with direct insert:', directUser.id)
      
      // Se for trabalhador, criar perfil
      if (role === 'WORKER' && location) {
        const { data: profile, error: profileError } = await supabase
          .from('worker_profiles')
          .insert([{
            user_id: directUser.id,
            bio: bio || '',
            location: location,
            rating: 0
          }])
          .select('*')
          .single()

        if (profileError) {
          console.log('❌ Error creating worker profile:', profileError)
        } else {
          console.log('✅ Worker profile created')
        }
      }

      const { password_hash, ...userWithoutPassword } = directUser
      return NextResponse.json({
        message: 'Usuário criado com sucesso',
        user: userWithoutPassword
      })
    }

    console.log('✅ User created with RPC:', userData)
    return NextResponse.json({
      message: 'Usuário criado com sucesso',
      user: userData
    })

  } catch (error) {
    console.error('💥 Error in simple register API:', error)
    
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
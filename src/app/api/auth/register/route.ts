import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  console.log('🚀 Register API called (Supabase version)')
  
  try {
    // Teste de conexão com Supabase
    console.log('🔍 Testing Supabase connection...')
    const { data: testData, error: testError } = await supabase
      .from('users')
      .select('count')
      .limit(1)
    
    if (testError) {
      console.log('❌ Supabase connection failed:', testError)
    } else {
      console.log('✅ Supabase connection successful')
    }

    const body = await request.json()
    console.log('📝 Request body:', { ...body, password: '[HIDDEN]' })
    
    const { name, email, password, phone, role, bio, location } = body

    // Validações básicas
    if (!name || !email || !password || !role) {
      console.log('❌ Missing required fields')
      return NextResponse.json(
        { message: 'Campos obrigatórios não preenchidos' },
        { status: 400 }
      )
    }

    console.log('🔍 Checking if user exists...')
    // Verificar se o email já existe
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle() // Use maybeSingle instead of single to avoid error when no rows

    if (checkError) {
      console.log('❌ Error checking user:', checkError)
      throw checkError
    }

    if (existingUser) {
      console.log('❌ User already exists')
      return NextResponse.json(
        { message: 'Email já cadastrado' },
        { status: 400 }
      )
    }

    console.log('🔐 Hashing password...')
    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    console.log('👤 Creating user...')
    // Criar usuário - não incluir id, deixar o Supabase gerar
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        name,
        email,
        password_hash: hashedPassword,
        phone: phone || null,
        role: role.toUpperCase()
        // Removido created_at e updated_at - deixar o Supabase gerar automaticamente
      })
      .select()
      .single()

    if (userError) {
      console.log('❌ Error creating user:', userError)
      throw userError
    }

    console.log('✅ User created:', user.id)

    // Se for trabalhador, criar perfil
    if (role === 'WORKER') {
      if (!location) {
        console.log('❌ Missing location for worker')
        return NextResponse.json(
          { message: 'Localização é obrigatória para trabalhadores' },
          { status: 400 }
        )
      }

      console.log('👷 Creating worker profile...')
      const { data: workerProfile, error: profileError } = await supabase
        .from('worker_profiles')
        .insert({
          user_id: user.id,
          bio: bio || '',
          location,
          rating: 0
          // Removido created_at - deixar o Supabase gerar automaticamente
        })
        .select()
        .single()

      if (profileError) {
        console.log('❌ Error creating worker profile:', profileError)
        throw profileError
      }

      console.log('✅ Worker profile created')
    }

    // Remover senha do retorno
    const { password_hash, ...userWithoutPassword } = user

    console.log('🎉 Registration successful')
    return NextResponse.json({
      message: 'Usuário criado com sucesso',
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('💥 Error in register API:', error)
    
    // Log mais detalhado do erro
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    // Log do tipo de erro do Supabase
    if (error && typeof error === 'object' && 'code' in error) {
      console.error('Supabase error code:', (error as any).code)
      console.error('Supabase error details:', (error as any).details)
      console.error('Supabase error hint:', (error as any).hint)
    }
    
    return NextResponse.json(
      { 
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error : 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
} 
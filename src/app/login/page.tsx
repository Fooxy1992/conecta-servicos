'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, LogIn, Eye, EyeOff, Mail, Lock, User, Shield } from 'lucide-react'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/login-supabase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        // Salvar token ou sessão
        localStorage.setItem('user', JSON.stringify(data.user))
        
        // Redirecionar baseado no tipo de usuário
        if (data.user.role === 'CLIENT') {
          window.location.href = '/dashboard/client'
        } else {
          window.location.href = '/dashboard/worker'
        }
      } else {
        const error = await response.json()
        alert(error.message || 'Erro ao fazer login')
      }
    } catch (error) {
      alert('Erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const fillTestAccount = (type: 'client' | 'worker') => {
    if (type === 'client') {
      setFormData({
        email: 'cliente@exemplo.com',
        password: '123456'
      })
    } else {
      setFormData({
        email: 'trabalhador@exemplo.com',
        password: '123456'
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative sm:mx-auto sm:w-full sm:max-w-md lg:max-w-lg">
        {/* Back Button */}
        <Link href="/" className="group inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors duration-200">
          <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Voltar ao início</span>
        </Link>
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">
            Bem-vindo de volta
          </h2>
          <p className="text-lg text-gray-600">
            Entre na sua conta do <span className="gradient-text font-semibold">ConectaServiços</span>
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-6 sm:p-8 border border-white/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Entrando...
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-2" />
                    Entrar
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Não tem uma conta?{' '}
              <Link href="/register" className="font-semibold text-blue-600 hover:text-purple-600 transition-colors duration-200">
                Cadastre-se gratuitamente
              </Link>
            </p>
          </div>

          {/* Test Accounts */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="text-center mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-4">🚀 Contas de teste disponíveis:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => fillTestAccount('client')}
                  className="group flex items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-all duration-200 hover:shadow-md"
                >
                  <User className="h-4 w-4 text-blue-600 mr-2" />
                  <div className="text-left">
                    <div className="text-xs font-semibold text-blue-800">Cliente</div>
                    <div className="text-xs text-blue-600">cliente@exemplo.com</div>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => fillTestAccount('worker')}
                  className="group flex items-center justify-center p-3 bg-green-50 hover:bg-green-100 rounded-xl border border-green-200 transition-all duration-200 hover:shadow-md"
                >
                  <Shield className="h-4 w-4 text-green-600 mr-2" />
                  <div className="text-left">
                    <div className="text-xs font-semibold text-green-800">Trabalhador</div>
                    <div className="text-xs text-green-600">trabalhador@exemplo.com</div>
                  </div>
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-3">
                Clique em qualquer conta para preencher automaticamente
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Ao entrar, você concorda com nossos{' '}
            <a href="#" className="text-blue-600 hover:text-purple-600 transition-colors">Termos de Uso</a>
            {' '}e{' '}
            <a href="#" className="text-blue-600 hover:text-purple-600 transition-colors">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </div>
  )
} 
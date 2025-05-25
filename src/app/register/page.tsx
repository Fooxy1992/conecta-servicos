'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { User, Briefcase, ArrowLeft, Mail, Lock, Phone, MapPin, FileText, Eye, EyeOff, UserPlus, CheckCircle } from 'lucide-react'

function RegisterForm() {
  const searchParams = useSearchParams()
  const [userType, setUserType] = useState(searchParams.get('type') || 'client')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    bio: '',
    location: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/register-supabase-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: userType.toUpperCase()
        }),
      })

      if (response.ok) {
        // Redirecionar para login ou dashboard
        window.location.href = '/login'
      } else {
        const error = await response.json()
        alert(error.message || 'Erro ao criar conta')
      }
    } catch (error) {
      alert('Erro ao criar conta')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative sm:mx-auto sm:w-full sm:max-w-lg lg:max-w-xl">
        {/* Back Button */}
        <Link href="/" className="group inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors duration-200">
          <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Voltar ao início</span>
        </Link>
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">
            Criar sua conta
          </h2>
          <p className="text-lg text-gray-600">
            Junte-se ao <span className="gradient-text font-semibold">ConectaServiços</span> e comece hoje mesmo
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-6 sm:p-8 border border-white/20">
          {/* User Type Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Como você quer se cadastrar?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserType('client')}
                className={`group relative flex items-center justify-center px-4 py-4 text-sm font-semibold rounded-xl border-2 transition-all duration-200 ${
                  userType === 'client'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600 shadow-lg scale-105'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <User className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div>Cliente</div>
                  <div className="text-xs opacity-75">Preciso de serviços</div>
                </div>
                {userType === 'client' && (
                  <CheckCircle className="absolute -top-2 -right-2 h-6 w-6 text-green-500 bg-white rounded-full" />
                )}
              </button>
              
              <button
                type="button"
                onClick={() => setUserType('worker')}
                className={`group relative flex items-center justify-center px-4 py-4 text-sm font-semibold rounded-xl border-2 transition-all duration-200 ${
                  userType === 'worker'
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white border-green-600 shadow-lg scale-105'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-green-300 hover:bg-green-50'
                }`}
              >
                <Briefcase className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div>Trabalhador</div>
                  <div className="text-xs opacity-75">Ofereço serviços</div>
                </div>
                {userType === 'worker' && (
                  <CheckCircle className="absolute -top-2 -right-2 h-6 w-6 text-green-500 bg-white rounded-full" />
                )}
              </button>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Nome completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>

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
              <p className="text-xs text-gray-500">Mínimo 6 caracteres</p>
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                Telefone {userType === 'worker' && <span className="text-red-500">*</span>}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required={userType === 'worker'}
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            {/* Worker-specific fields */}
            {userType === 'worker' && (
              <div className="space-y-6 p-4 bg-green-50 rounded-xl border border-green-200">
                <h3 className="text-sm font-semibold text-green-800 flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Informações Profissionais
                </h3>
                
                {/* Location Field */}
                <div className="space-y-2">
                  <label htmlFor="location" className="block text-sm font-semibold text-gray-700">
                    Localização <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Ex: São Paulo, SP"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50"
                    />
                  </div>
                </div>

                {/* Bio Field */}
                <div className="space-y-2">
                  <label htmlFor="bio" className="block text-sm font-semibold text-gray-700">
                    Descrição profissional
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Conte sobre sua experiência, especialidades e diferenciais..."
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50 resize-none"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Descreva seus serviços para atrair mais clientes</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 ${
                  userType === 'client'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500'
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:ring-green-500'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Criando conta...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-2" />
                    Criar conta {userType === 'client' ? 'de Cliente' : 'de Trabalhador'}
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Já tem uma conta?{' '}
              <Link href="/login" className="font-semibold text-blue-600 hover:text-purple-600 transition-colors duration-200">
                Entrar agora
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl">
            <div className="text-2xl mb-2">🚀</div>
            <div className="text-sm font-semibold text-gray-700">Rápido</div>
            <div className="text-xs text-gray-500">Cadastro em minutos</div>
          </div>
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl">
            <div className="text-2xl mb-2">🔒</div>
            <div className="text-sm font-semibold text-gray-700">Seguro</div>
            <div className="text-xs text-gray-500">Dados protegidos</div>
          </div>
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl">
            <div className="text-2xl mb-2">💯</div>
            <div className="text-sm font-semibold text-gray-700">Gratuito</div>
            <div className="text-xs text-gray-500">Sem taxas iniciais</div>
          </div>
        </div>

        {/* Terms Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Ao criar sua conta, você concorda com nossos{' '}
            <a href="#" className="text-blue-600 hover:text-purple-600 transition-colors">Termos de Uso</a>
            {' '}e{' '}
            <a href="#" className="text-blue-600 hover:text-purple-600 transition-colors">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Register() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  )
} 
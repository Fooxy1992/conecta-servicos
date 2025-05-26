'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  User, 
  Star, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Briefcase,
  MapPin,
  Phone,
  Mail,
  Edit,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign
} from 'lucide-react'

interface WorkerProfile {
  id: string
  name: string
  email: string
  phone: string
  role: string
  workerProfile?: {
    bio: string
    location: string
    rating: number
  }
}

export default function WorkerDashboard() {
  const [user, setUser] = useState<WorkerProfile | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Carregar dados do usuário do localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold gradient-text">
                ConectaServiços
              </Link>
              <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                Trabalhador
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <MessageSquare className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="h-6 w-6" />
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Profile Info */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                {user.workerProfile && (
                  <div className="flex items-center justify-center mt-2">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{user.workerProfile.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'overview' 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Briefcase className="h-4 w-4 mr-3" />
                  Visão Geral
                </button>
                
                <button
                  onClick={() => setActiveTab('services')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'services' 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Calendar className="h-4 w-4 mr-3" />
                  Solicitações
                </button>
                
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <User className="h-4 w-4 mr-3" />
                  Meu Perfil
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Welcome Message */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">Bem-vindo, {user.name}! 👋</h2>
                  <p className="text-green-100">
                    Gerencie seus serviços e conecte-se com clientes em potencial.
                  </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Solicitações Pendentes</p>
                        <p className="text-2xl font-bold text-gray-900">3</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Serviços Concluídos</p>
                        <p className="text-2xl font-bold text-gray-900">12</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-yellow-100 rounded-lg">
                        <Star className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Avaliação Média</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {user.workerProfile?.rating.toFixed(1) || '0.0'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium text-gray-900">Nova solicitação de serviço</p>
                        <p className="text-xs text-gray-600">Limpeza residencial - há 2 horas</p>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        Nova
                      </span>
                    </div>

                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium text-gray-900">Serviço concluído</p>
                        <p className="text-xs text-gray-600">Pintura de parede - ontem</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Concluído
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Solicitações de Serviço</h2>
                  <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Serviço
                  </button>
                </div>

                {/* Service Requests */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Solicitações Pendentes</h3>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-gray-900">Limpeza Residencial</h4>
                          <p className="text-gray-600 mt-1">Casa de 3 quartos, limpeza completa</p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>São Paulo, SP</span>
                            <Clock className="h-4 w-4 ml-4 mr-1" />
                            <span>Há 2 horas</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            Aceitar
                          </button>
                          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                            Recusar
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-gray-900">Pintura de Parede</h4>
                          <p className="text-gray-600 mt-1">Pintura de sala e quarto</p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>Rio de Janeiro, RJ</span>
                            <Clock className="h-4 w-4 ml-4 mr-1" />
                            <span>Há 5 horas</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            Aceitar
                          </button>
                          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                            Recusar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Meu Perfil</h2>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Perfil
                  </button>
                </div>

                {/* Profile Information */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Pessoais</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <User className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{user.name}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Mail className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{user.email}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Phone className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{user.phone || 'Não informado'}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Localização</label>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{user.workerProfile?.location || 'Não informado'}</span>
                      </div>
                    </div>
                  </div>

                  {user.workerProfile?.bio && (
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Descrição Profissional</label>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-900">{user.workerProfile.bio}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 
'use client'

import { useState, useEffect } from 'react'
import { Search, Star, MapPin, Phone, MessageCircle, Plus } from 'lucide-react'

interface Worker {
  id: string
  user: {
    name: string
    phone: string
  }
  bio: string
  location: string
  rating: number
  categories: {
    category: {
      name: string
    }
  }[]
}

export default function ClientDashboard() {
  const [workers, setWorkers] = useState<Worker[]>([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchLocation, setSearchLocation] = useState('')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Carregar dados do usuário
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Carregar categorias
    fetchCategories()
    
    // Carregar trabalhadores
    fetchWorkers()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Erro ao carregar categorias:', error)
    }
  }

  const fetchWorkers = async () => {
    try {
      let url = '/api/workers'
      const params = new URLSearchParams()
      
      if (selectedCategory) params.append('category', selectedCategory)
      if (searchLocation) params.append('location', searchLocation)
      
      if (params.toString()) {
        url += '?' + params.toString()
      }

      const response = await fetch(url)
      const data = await response.json()
      setWorkers(data)
    } catch (error) {
      console.error('Erro ao carregar trabalhadores:', error)
    }
  }

  const handleSearch = () => {
    fetchWorkers()
  }

  const requestService = async (workerId: string) => {
    const description = prompt('Descreva o serviço que você precisa:')
    if (!description) return

    try {
      const response = await fetch('/api/service-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workerId,
          categoryId: selectedCategory,
          description,
          clientId: user?.id
        }),
      })

      if (response.ok) {
        alert('Solicitação enviada com sucesso!')
      } else {
        alert('Erro ao enviar solicitação')
      }
    } catch (error) {
      alert('Erro ao enviar solicitação')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Olá, {user?.name}!
            </h1>
            <button
              onClick={() => {
                localStorage.removeItem('user')
                window.location.href = '/'
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Encontre Profissionais
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todas as categorias</option>
                {categories.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Localização
              </label>
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Ex: São Paulo, SP"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
              >
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </button>
            </div>
          </div>
        </div>

        {/* Workers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workers.map((worker) => (
            <div key={worker.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {worker.user.name}
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">
                      {worker.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{worker.location}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="text-sm">{worker.user.phone}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {worker.bio}
                </p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {worker.categories.map((cat, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {cat.category.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => requestService(worker.id)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center text-sm"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Solicitar
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 flex items-center justify-center text-sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Mensagem
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {workers.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum profissional encontrado
            </h3>
            <p className="text-gray-600">
              Tente ajustar os filtros de busca
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 
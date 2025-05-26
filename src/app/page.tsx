import Link from 'next/link'
import { Search, Users, Star, Shield, ArrowRight, Menu, X, CheckCircle, Clock, MapPin } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" style={{background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #f3e8ff 100%)'}}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 lg:py-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CS</span>
              </div>
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ConectaServiços
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/search" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">
                Buscar
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">
                Sobre
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">
                Contato
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">
                Entrar
              </Link>
              <Link href="/register" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium">
                Cadastrar
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 lg:py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-8">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mais de 1000+ profissionais verificados
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Conecte-se com os
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                melhores profissionais
              </span>
            </h2>
            
            <p className="mt-6 text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Encontre trabalhadores qualificados para limpeza, obras e pintura. 
              <span className="block mt-2 font-medium text-gray-700">Rápido, seguro e confiável.</span>
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <Link href="/search" className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                <Search className="mr-3 h-5 w-5" />
                Buscar Profissionais
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/register?type=worker" className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                <Shield className="mr-3 h-5 w-5" />
                Sou Trabalhador
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/register?type=client" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Ou cadastre-se como cliente →
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-blue-600">1000+</div>
                <div className="text-sm text-gray-600 mt-1">Profissionais</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-green-600">5000+</div>
                <div className="text-sm text-gray-600 mt-1">Serviços Realizados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-purple-600">4.8★</div>
                <div className="text-sm text-gray-600 mt-1">Avaliação Média</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
              Como funciona
            </h3>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Simples, rápido e seguro. Em apenas 3 passos você encontra o profissional ideal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="group text-center p-6 rounded-2xl hover:bg-blue-50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                1. Busque
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Encontre profissionais por categoria, localização e avaliações. 
                Use nossos filtros avançados para encontrar exatamente o que precisa.
              </p>
            </div>

            <div className="group text-center p-6 rounded-2xl hover:bg-green-50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                2. Conecte
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Entre em contato direto com o profissional, negocie preços e 
                agende seu serviço de forma rápida e segura.
              </p>
            </div>

            <div className="group text-center p-6 rounded-2xl hover:bg-yellow-50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                3. Avalie
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Deixe sua avaliação e ajude outros usuários. 
                Construa uma comunidade de confiança e qualidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
              Categorias de Serviços
            </h3>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Profissionais especializados em diversas áreas para atender suas necessidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🧽</span>
                </div>
                <h4 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                  Limpeza
                </h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Limpeza residencial e comercial com profissionais qualificados e produtos de qualidade.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  Disponível 24/7
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🔨</span>
                </div>
                <h4 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                  Obras
                </h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Pequenos reparos e reformas para sua casa ou empresa com garantia de qualidade.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-2" />
                  Atendimento local
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🎨</span>
                </div>
                <h4 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                  Pintura
                </h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Pintura interna, externa e artística com acabamento profissional e materiais premium.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Garantia inclusa
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl mb-8">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-3xl lg:text-4xl font-extrabold text-white mb-6">
            Segurança e Confiança
          </h3>
          <p className="text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Todos os profissionais são verificados e avaliados pela comunidade. 
            Sua segurança é nossa prioridade número um.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">100%</div>
              <div className="text-blue-100">Verificados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-100">Suporte</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">Seguro</div>
              <div className="text-blue-100">Garantido</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CS</span>
              </div>
              <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ConectaServiços
              </h4>
            </div>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Conectando pessoas e serviços de qualidade em todo o Brasil
            </p>
            
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-500 text-sm">
                &copy; 2024 ConectaServiços. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 
import Link from 'next/link'
import { 
  ArrowLeft, 
  Users, 
  Target, 
  Shield, 
  Heart,
  CheckCircle,
  Star,
  Award,
  Zap
} from 'lucide-react'

export default function About() {
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
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/login"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Entrar
              </Link>
              <Link 
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Cadastrar
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/" className="group inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors duration-200">
          <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Voltar ao início</span>
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sobre o <span className="gradient-text">ConectaServiços</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conectamos pessoas que precisam de serviços com profissionais qualificados, 
            criando uma rede de confiança e qualidade.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nossa Missão</h3>
              <p className="text-gray-600">
                Facilitar a conexão entre clientes e prestadores de serviços, 
                promovendo qualidade, confiança e praticidade.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nossa Visão</h3>
              <p className="text-gray-600">
                Ser a principal plataforma de serviços domésticos e profissionais, 
                reconhecida pela excelência e inovação.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nossos Valores</h3>
              <p className="text-gray-600">
                Transparência, qualidade, respeito e compromisso com a 
                satisfação de clientes e profissionais.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nossa História</h2>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">
              O ConectaServiços nasceu da necessidade de simplificar a busca por profissionais 
              qualificados para serviços domésticos e comerciais. Percebemos que tanto clientes 
              quanto trabalhadores enfrentavam dificuldades para se conectar de forma eficiente e segura.
            </p>
            
            <p className="mb-4">
              Nossa plataforma foi desenvolvida com foco na experiência do usuário, oferecendo 
              ferramentas intuitivas para busca, contratação e avaliação de serviços. Priorizamos 
              a segurança e a qualidade em todas as interações.
            </p>
            
            <p>
              Hoje, conectamos milhares de clientes com profissionais especializados em limpeza, 
              obras, pintura e muito mais, sempre com o compromisso de entregar excelência e confiabilidade.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Por que escolher o ConectaServiços?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Profissionais Verificados</h3>
                <p className="text-gray-600">Todos os trabalhadores passam por processo de verificação.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Segurança Garantida</h3>
                <p className="text-gray-600">Plataforma segura com proteção de dados e transações.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Sistema de Avaliações</h3>
                <p className="text-gray-600">Avaliações reais de clientes para garantir qualidade.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Conexão Rápida</h3>
                <p className="text-gray-600">Encontre profissionais disponíveis na sua região rapidamente.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Qualidade Comprovada</h3>
                <p className="text-gray-600">Profissionais com experiência e qualificações verificadas.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Suporte Dedicado</h3>
                <p className="text-gray-600">Equipe de suporte pronta para ajudar quando precisar.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">ConectaServiços em Números</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Profissionais Cadastrados</div>
            </div>
            
            <div>
              <div className="text-3xl font-bold mb-2">5000+</div>
              <div className="text-blue-100">Serviços Realizados</div>
            </div>
            
            <div>
              <div className="text-3xl font-bold mb-2">4.8</div>
              <div className="text-blue-100">Avaliação Média</div>
            </div>
            
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Cidades Atendidas</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Faça parte da nossa comunidade
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Seja você um cliente em busca de serviços de qualidade ou um profissional 
            querendo expandir sua clientela, o ConectaServiços é o lugar certo para você.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register?type=client"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Users className="h-5 w-5 mr-2" />
              Cadastrar como Cliente
            </Link>
            
            <Link
              href="/register?type=worker"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              <Award className="h-5 w-5 mr-2" />
              Cadastrar como Profissional
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 
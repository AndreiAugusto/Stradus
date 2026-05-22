'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboard-service';

export default function Dashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    caminhoes: 0,
    manutencoes: 0,
    motoristas: 0,
    oficinas: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        setLoading(true);
        const [caminhoes, manutencoes, oficinas] = await Promise.all([
          dashboardService.getCaminhoeCount(),
          dashboardService.getManutencaoCount(),
          dashboardService.getOficinaCount(),
        ]);

        setStats({
          caminhoes: caminhoes || 0,
          manutencoes: manutencoes || 0,
          motoristas: 18, // Sem endpoint específico
          oficinas: oficinas || 0,
        });
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    document.cookie = 'token=; path=/; max-age=0';
    router.push('/login');
  };

  const menuItems = [
    { name: 'Caminhões', href: '/dashboard/caminhoes', icon: '🚚' },
    { name: 'Manutenção', href: '/dashboard/manutencao', icon: '🔧' },
    { name: 'Motoristas', href: '/dashboard/motorista', icon: '👨‍💼' },
    { name: 'Oficinas', href: '/dashboard/oficina', icon: '🏢' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 shadow-lg`}>
        <div className="p-6 border-b border-blue-700">
          <h1 className={`font-bold text-2xl ${!sidebarOpen && 'text-center'}`}>
            {sidebarOpen ? '🚛 Stradus' : '🚛'}
          </h1>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 px-6 py-4 hover:bg-blue-700 transition-colors duration-200 border-l-4 border-transparent hover:border-blue-400"
            >
              <span className="text-2xl">{item.icon}</span>
              {sidebarOpen && <span className="font-medium">{item.name}</span>}
            </Link>
          ))}
          
            <Link
              key='logout'
              href='/login'
              onClick={handleLogout}
              className="flex items-center gap-4 px-6 py-4 hover:bg-blue-700 transition-colors duration-200 border-l-4 border-transparent hover:border-blue-400"
            >
              <span className="text-2xl">🚪</span>
              {sidebarOpen && <span className="font-medium">Sair</span>}
            </Link>
        </nav>
{/* 
        <div className="absolute bottom-6 left-0 right-0 px-6">
          <button
            onClick={handleLogout}
            className={`w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 ${!sidebarOpen && 'px-2'}`}
          >
            Sair
          </button>
        </div> */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white shadow-md p-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-gray-600 mt-1">Bem-vindo ao Stradus</p>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {sidebarOpen ? '◀️' : '▶️'}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Card Caminhões */}
            <Link href="/dashboard/caminhoes" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Caminhões</p>
                  <p className="text-4xl font-bold text-gray-800 mt-2">
                    {loading ? '...' : stats.caminhoes}
                  </p>
                  <p className="text-green-600 text-sm mt-2">✓ Ativos</p>
                </div>
                <div className="text-5xl opacity-20">🚚</div>
              </div>
            </Link>

            {/* Card Manutenções */}
            <Link href="/dashboard/manutencao" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Manutenções Pendentes</p>
                  <p className="text-4xl font-bold text-gray-800 mt-2">
                    {loading ? '...' : stats.manutencoes}
                  </p>
                  <p className="text-red-600 text-sm mt-2">⚠️ Urgente</p>
                </div>
                <div className="text-5xl opacity-20">🔧</div>
              </div>
            </Link>

            {/* Card Motoristas */}
            <Link href="/dashboard/motorista" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Motoristas</p>
                  <p className="text-4xl font-bold text-gray-800 mt-2">
                    {loading ? '...' : stats.motoristas}
                  </p>
                  <p className="text-blue-600 text-sm mt-2">👥 Cadastrados</p>
                </div>
                <div className="text-5xl opacity-20">👨‍💼</div>
              </div>
            </Link>

            {/* Card Oficinas */}
            <Link href="/dashboard/oficina" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Oficinas</p>
                  <p className="text-4xl font-bold text-gray-800 mt-2">
                    {loading ? '...' : stats.oficinas}
                  </p>
                  <p className="text-purple-600 text-sm mt-2">🏢 Parceiras</p>
                </div>
                <div className="text-5xl opacity-20">🏢</div>
              </div>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Atividades Recentes</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4 pb-3 border-b">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">📋</div>
                <div>
                  <p className="text-gray-800 font-medium">Manutenção registrada</p>
                  <p className="text-gray-500 text-sm">Há 2 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-4 pb-3 border-b">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">✓</div>
                <div>
                  <p className="text-gray-800 font-medium">Caminhão adicionado</p>
                  <p className="text-gray-500 text-sm">Há 5 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">⚠️</div>
                <div>
                  <p className="text-gray-800 font-medium">Manutenção urgente</p>
                  <p className="text-gray-500 text-sm">Há 1 dia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
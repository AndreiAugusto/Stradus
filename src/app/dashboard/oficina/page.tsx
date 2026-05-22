'use client';

import Link from 'next/link';

export default function Oficina() {
  const oficinas = [
    { id: 1, nome: 'Stradus Service', cidade: 'São Paulo', telefone: '(11) 3456-7890', email: 'contato@stradus.com.br', status: 'Ativa' },
    { id: 2, nome: 'Oficina do João', cidade: 'Campinas', telefone: '(19) 3456-7890', email: 'joao@oficina.com.br', status: 'Ativa' },
    { id: 3, nome: 'Oficina MG', cidade: 'Belo Horizonte', telefone: '(31) 3456-7890', email: 'contato@oficina-mg.com.br', status: 'Ativa' },
    { id: 4, nome: 'Oficina Central', cidade: 'Rio de Janeiro', telefone: '(21) 3456-7890', email: 'central@oficina.com.br', status: 'Inativa' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block">
              ← Voltar
            </Link>
            <h1 className="text-4xl font-bold text-gray-800">Oficinas</h1>
            <p className="text-gray-600 mt-1">Gerenciamento de oficinas parceiras</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            + Nova Oficina
          </button>
        </div>

        {/* Cards View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {oficinas.map((oficina) => (
            <div key={oficina.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{oficina.nome}</h3>
                  <p className="text-gray-600 text-sm mt-1">📍 {oficina.cidade}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  oficina.status === 'Ativa' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {oficina.status}
                </span>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">📞</span>
                  <a href={`tel:${oficina.telefone}`} className="text-blue-600 hover:text-blue-800">
                    {oficina.telefone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">✉️</span>
                  <a href={`mailto:${oficina.email}`} className="text-blue-600 hover:text-blue-800">
                    {oficina.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded font-medium transition-colors">
                  Editar
                </button>
                <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded font-medium transition-colors">
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

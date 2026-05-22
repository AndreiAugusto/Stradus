'use client';

import Link from 'next/link';

export default function Motorista() {
  const motoristas = [
    { id: 1, nome: 'João Silva', cnh: '12345678901', categoria: 'E', vencimento: '2027-03-15', status: 'Ativo' },
    { id: 2, nome: 'Maria Santos', cnh: '98765432101', categoria: 'E', vencimento: '2026-11-20', status: 'Ativo' },
    { id: 3, nome: 'Carlos Oliveira', cnh: '55555555501', categoria: 'E', vencimento: '2025-08-10', status: 'Vencido' },
    { id: 4, nome: 'Ana Costa', cnh: '11111111111', categoria: 'E', vencimento: '2027-05-05', status: 'Ativo' },
    { id: 5, nome: 'Pedro Martins', cnh: '77777777701', categoria: 'D', vencimento: '2026-12-30', status: 'Ativo' },
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
            <h1 className="text-4xl font-bold text-gray-800">Motoristas</h1>
            <p className="text-gray-600 mt-1">Gerenciamento de motoristas</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            + Novo Motorista
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-600 text-sm font-medium">Total de Motoristas</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">18</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-600 text-sm font-medium">Ativos</p>
            <p className="text-3xl font-bold text-green-600 mt-2">17</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-600 text-sm font-medium">CNH Vencida</p>
            <p className="text-3xl font-bold text-red-600 mt-2">1</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nome</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">CNH</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Categoria</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Vencimento</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {motoristas.map((motorista) => (
                <tr key={motorista.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-800 font-medium">{motorista.nome}</td>
                  <td className="px-6 py-4 text-gray-600">{motorista.cnh}</td>
                  <td className="px-6 py-4 text-gray-600">Categoria {motorista.categoria}</td>
                  <td className="px-6 py-4 text-gray-600">{motorista.vencimento}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      motorista.status === 'Ativo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {motorista.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 mr-3 text-sm font-medium">
                      Editar
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';

export default function Caminhoes() {
  const caminhoes = [
    { id: 1, placa: 'ABC-1234', modelo: 'Volvo FH16', ano: 2021, status: 'Ativo' },
    { id: 2, placa: 'DEF-5678', modelo: 'Scania R440', ano: 2020, status: 'Ativo' },
    { id: 3, placa: 'GHI-9012', modelo: 'Mercedes Actros', ano: 2019, status: 'Manutenção' },
    { id: 4, placa: 'JKL-3456', modelo: 'Volvo FH16', ano: 2022, status: 'Ativo' },
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
            <h1 className="text-4xl font-bold text-gray-800">Caminhões</h1>
            <p className="text-gray-600 mt-1">Gerenciamento de frota</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            + Novo Caminhão
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Placa</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Modelo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ano</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {caminhoes.map((caminhao) => (
                <tr key={caminhao.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-800 font-medium">{caminhao.placa}</td>
                  <td className="px-6 py-4 text-gray-600">{caminhao.modelo}</td>
                  <td className="px-6 py-4 text-gray-600">{caminhao.ano}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      caminhao.status === 'Ativo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {caminhao.status}
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

'use client';

import Link from 'next/link';

export default function Manutencao() {
  const manutencoes = [
    { id: 1, caminhao: 'ABC-1234', tipo: 'Revisão', data: '2026-05-25', status: 'Pendente', oficina: 'Oficina do João' },
    { id: 2, caminhao: 'DEF-5678', tipo: 'Troca de óleo', data: '2026-05-20', status: 'Concluído', oficina: 'Stradus Service' },
    { id: 3, caminhao: 'GHI-9012', tipo: 'Reparo motor', data: '2026-05-18', status: 'Em Progresso', oficina: 'Oficina MG' },
    { id: 4, caminhao: 'JKL-3456', tipo: 'Inspeção', data: '2026-05-22', status: 'Pendente', oficina: 'Oficina Central' },
    { id: 5, caminhao: 'ABC-1234', tipo: 'Pneus', data: '2026-05-30', status: 'Agendado', oficina: 'Stradus Service' },
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
            <h1 className="text-4xl font-bold text-gray-800">Manutenções</h1>
            <p className="text-gray-600 mt-1">Controle de manutenção da frota</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            + Nova Manutenção
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex gap-4">
          <input 
            type="text" 
            placeholder="Buscar por placa..." 
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Todos os status</option>
            <option>Pendente</option>
            <option>Em Progresso</option>
            <option>Concluído</option>
            <option>Agendado</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Caminhão</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tipo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Oficina</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Data</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {manutencoes.map((manutencao) => (
                <tr key={manutencao.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-800 font-medium">{manutencao.caminhao}</td>
                  <td className="px-6 py-4 text-gray-600">{manutencao.tipo}</td>
                  <td className="px-6 py-4 text-gray-600">{manutencao.oficina}</td>
                  <td className="px-6 py-4 text-gray-600">{manutencao.data}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      manutencao.status === 'Pendente' ? 'bg-red-100 text-red-800' :
                      manutencao.status === 'Em Progresso' ? 'bg-yellow-100 text-yellow-800' :
                      manutencao.status === 'Concluído' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {manutencao.status}
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

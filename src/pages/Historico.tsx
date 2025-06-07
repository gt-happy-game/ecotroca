import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

interface Coleta {
  id: string;
  data: string;
  tipoDoacao: string;
  quantidade: number;
  status: 'pendente' | 'confirmada' | 'concluida';
  pontos: number;
}

export default function Historico() {
  const [coletas, setColetas] = useState<Coleta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // TODO: Implementar integração com Firebase
    // Dados mockados para exemplo
    const mockColetas: Coleta[] = [
      {
        id: '1',
        data: '2024-03-15',
        tipoDoacao: 'Móveis',
        quantidade: 5,
        status: 'concluida',
        pontos: 50
      },
      {
        id: '2',
        data: '2024-03-10',
        tipoDoacao: 'Livros',
        quantidade: 3,
        status: 'concluida',
        pontos: 30
      },
      {
        id: '3',
        data: '2024-03-20',
        tipoDoacao: 'Eletrodomésticos',
        quantidade: 4,
        status: 'pendente',
        pontos: 0
      },
            {
        id: '4',
        data: '2024-03-20',
        tipoDoacao: 'Roupa',
        quantidade: 4,
        status: 'pendente',
        pontos: 0
      }
    ];

    setColetas(mockColetas);
    setLoading(false);
  }, []);

  const getStatusColor = (status: Coleta['status']) => {
    switch (status) {
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmada':
        return 'bg-blue-100 text-blue-800';
      case 'concluida':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Coleta['status']) => {
    switch (status) {
      case 'pendente':
        return 'Pendente';
      case 'confirmada':
        return 'Confirmada';
      case 'concluida':
        return 'Concluída';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Histórico de Coletas</h1>
              <p className="mt-2 text-sm text-gray-700">
                Lista de todas as coletas solicitadas e seus status.
              </p>
            </div>
          </div>

          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Data
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Tipo
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Quantidade
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Pontos
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {coletas.map((coleta) => (
                        <tr key={coleta.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {new Date(coleta.data).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {coleta.tipoDoacao}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {coleta.quantidade} itens
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(coleta.status)}`}>
                              {getStatusText(coleta.status)}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {coleta.pontos}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
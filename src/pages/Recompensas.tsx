import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

interface Recompensa {
  id: string;
  titulo: string;
  descricao: string;
  pontos: number;
  imagem: string;
  parceiro: string;
  disponivel: boolean;
}

export default function Recompensas() {
  const [recompensas, setRecompensas] = useState<Recompensa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pontosUsuario, setPontosUsuario] = useState(1250); // TODO: Integrar com Firebase

  useEffect(() => {
    // TODO: Implementar integração com Firebase
    // Dados mockados para exemplo
    const mockRecompensas: Recompensa[] = [
      {
        id: '1',
        titulo: 'Cupom de 10% de Desconto',
        descricao: 'Válido em qualquer compra na loja EcoStore',
        pontos: 500,
        imagem: 'https://via.placeholder.com/150',
        parceiro: 'EcoStore',
        disponivel: true
      },
      {
        id: '2',
        titulo: 'Voucher de R$ 20',
        descricao: 'Válido em qualquer compra na rede Verde Vida',
        pontos: 1000,
        imagem: 'https://via.placeholder.com/150',
        parceiro: 'Verde Vida',
        disponivel: true
      },
      {
        id: '3',
        titulo: 'Desconto de 15%',
        descricao: 'Válido em produtos sustentáveis da EcoTech',
        pontos: 750,
        imagem: 'https://via.placeholder.com/150',
        parceiro: 'EcoTech',
        disponivel: true
      }
    ];

    setRecompensas(mockRecompensas);
    setLoading(false);
  }, []);

  const handleResgatar = async (recompensa: Recompensa) => {
    if (pontosUsuario < recompensa.pontos) {
      setError('Você não tem pontos suficientes para resgatar esta recompensa.');
      return;
    }

    try {
      // TODO: Implementar integração com Firebase
      console.log('Resgatando recompensa:', recompensa);
      setPontosUsuario(prev => prev - recompensa.pontos);
      setError('');
    } catch (err) {
      setError('Erro ao resgatar recompensa. Tente novamente.');
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
              <h1 className="text-xl font-semibold text-gray-900">Recompensas Disponíveis</h1>
              <p className="mt-2 text-sm text-gray-700">
                Troque seus pontos por benefícios exclusivos.
              </p>
              <p className="mt-2 text-sm font-medium text-primary-600">
                Seus pontos: {pontosUsuario}
              </p>
            </div>
          </div>

          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recompensas.map((recompensa) => (
              <div
                key={recompensa.id}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={recompensa.imagem}
                        alt={recompensa.titulo}
                      />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {recompensa.parceiro}
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {recompensa.titulo}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      {recompensa.descricao}
                    </p>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-primary-600">
                        {recompensa.pontos} pontos
                      </div>
                      <button
                        onClick={() => handleResgatar(recompensa)}
                        disabled={!recompensa.disponivel || pontosUsuario < recompensa.pontos}
                        className={`btn ${
                          pontosUsuario >= recompensa.pontos
                            ? 'btn-primary'
                            : 'btn-secondary opacity-50 cursor-not-allowed'
                        }`}
                      >
                        Resgatar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 
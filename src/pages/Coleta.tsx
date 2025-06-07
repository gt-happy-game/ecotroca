import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

interface ColetaFormData {
  tipoDoacao: string;
  quantidade: string;
  endereco: string;
  complemento: string;
  observacoes: string;
}

export default function Coleta() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<ColetaFormData>({
    tipoDoacao: '',
    quantidade: '',
    endereco: '',
    complemento: '',
    observacoes: ''
  });

  const tiposResiduo = [
    { id: 'roupa', nome: 'Roupa' },
    { id: 'moveis', nome: 'Móveis' },
    { id: 'livros', nome: 'Livros' },
    { id: 'eletronicos', nome: 'Eletrônicos' },
    { id: 'eletronicos', nome: 'Eletrodomésticos' },
    { id: 'outros', nome: 'Outros' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Implementar integração com Firebase
      console.log('Dados da coleta:', formData);
      navigate('/');
    } catch (err) {
      setError('Erro ao solicitar coleta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Solicitar Coleta
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Preencha os dados abaixo para solicitar a coleta dos seus itens para doação.
              </p>
            </div>
          </div>

          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                      <span className="block sm:inline">{error}</span>
                    </div>
                  )}

                  <div>
                    <label htmlFor="tipoDoacao" className="block text-sm font-medium text-gray-700">
                      Tipo de Item
                    </label>
                    <select
                      id="tipoDoacao"
                      name="tipoDoacao"
                      required
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      value={formData.tipoDoacao}
                      onChange={handleChange}
                    >
                      <option value="">Selecione um tipo</option>
                      {tiposResiduo.map(tipo => (
                        <option key={tipo.id} value={tipo.id}>
                          {tipo.nome}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">
                      Quantidade Estimada
                    </label>
                    <input
                      type="number"
                      name="quantidade"
                      id="quantidade"
                      required
                      min="1"
                      className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={formData.quantidade}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">
                      Endereço
                    </label>
                    <input
                      type="text"
                      name="endereco"
                      id="endereco"
                      required
                      className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={formData.endereco}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="complemento" className="block text-sm font-medium text-gray-700">
                      Complemento
                    </label>
                    <input
                      type="text"
                      name="complemento"
                      id="complemento"
                      className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={formData.complemento}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700">
                      Observações
                    </label>
                    <textarea
                      id="observacoes"
                      name="observacoes"
                      rows={3}
                      className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={formData.observacoes}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                  >
                    {loading ? 'Enviando...' : 'Solicitar Coleta'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
} 
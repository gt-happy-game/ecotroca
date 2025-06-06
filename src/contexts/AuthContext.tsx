import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { localAuth } from '../services/localAuth';

interface User {
  id: string;
  email: string;
  name: string;
  points: number;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updatePoints: (points: number) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Inicializa o banco de dados local
    localAuth.init();
    
    // Verifica se há um usuário salvo
    const user = localAuth.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const signup = async (email: string, password: string, name: string) => {
    try {
      const { user, error } = await localAuth.signup(email, password, name);
      if (error) {
        throw new Error(error);
      }
      if (user) {
        setCurrentUser(user);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { user, error } = await localAuth.login(email, password);
      if (error) {
        throw new Error(error);
      }
      if (user) {
        setCurrentUser(user);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await localAuth.logout();
      setCurrentUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Erro no logout:', error);
      throw error;
    }
  };

  const updatePoints = (points: number) => {
    if (currentUser) {
      localAuth.updateUserPoints(currentUser.id, points);
      setCurrentUser(prev => prev ? { ...prev, points: prev.points + points } : null);
    }
  };

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    updatePoints
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 
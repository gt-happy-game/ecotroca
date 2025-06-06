interface User {
  id: string;
  email: string;
  name: string;
  points: number;
}

interface AuthResponse {
  user: User | null;
  error?: string;
}

const USERS_KEY = 'ecotroca_users';
const CURRENT_USER_KEY = 'ecotroca_current_user';

// Inicializa o banco de dados local se não existir
const initializeLocalDB = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
  }
};

// Função auxiliar para gerar ID único
const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const localAuth = {
  // Inicializa o banco de dados
  init: () => {
    initializeLocalDB();
  },

  // Registra um novo usuário
  signup: async (email: string, password: string, name: string): Promise<AuthResponse> => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    // Verifica se o email já está em uso
    if (users.some((user: User) => user.email === email)) {
      return { user: null, error: 'Email já está em uso' };
    }

    const newUser: User = {
      id: generateId(),
      email,
      name,
      points: 0
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

    return { user: newUser };
  },

  // Realiza login
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const user = users.find((u: User) => u.email === email);

    if (!user) {
      return { user: null, error: 'Usuário não encontrado' };
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return { user };
  },

  // Realiza logout
  logout: async (): Promise<void> => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // Obtém o usuário atual
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem(CURRENT_USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  // Atualiza os pontos do usuário
  updateUserPoints: (userId: string, points: number): void => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const userIndex = users.findIndex((u: User) => u.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].points += points;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      
      // Atualiza também o usuário atual se for o mesmo
      const currentUser = localAuth.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        currentUser.points += points;
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
      }
    }
  }
}; 
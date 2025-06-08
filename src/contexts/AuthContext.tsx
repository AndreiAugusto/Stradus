'use client'

import { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { api } from '../services/api'

// Tipos TypeScript
interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  createUser: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Criação do contexto
export const AuthContext = createContext<AuthContextType | null>(null);

// Provider do contexto
export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const apiUrl = 'https://back-caminhao.vercel.app'


  // Função de login
  const login = async (data: LoginData) => {
    try {
      setLoading(true);
      
      const response = await api.post(`${apiUrl}/auth/login`, data);

      if (response.status !== 200) {
        const errorData = response.data;
        throw new Error(errorData.error || 'Erro no login');
      }

      const result = response.data;

      // Salvar token no localStorage (no Next.js funciona no client-side)
      localStorage.setItem('token', result.accessToken);
      
      // Definir usuário
      setUser(result.user);
      
      // Navegar para dashboard
      router.push('/dashboard');
      
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      toast.error(`Houve um erro no Login: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setLoading(false);
    }
  };

  // Função de registro
  const createUser = async (data: RegisterData) => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro no registro');
      }

      const result = await response.json();
      
      localStorage.setItem('token', result.accessToken);
      setUser(result.user);
      
      router.push('/dashboard');
      
      toast.success('Usuário criado com sucesso!');
    } catch (error) {
      toast.error(`Houve um erro ao cadastrar: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
    toast.info('Logout realizado com sucesso!');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        createUser,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthContextProvider');
  }
  
  return context;
}
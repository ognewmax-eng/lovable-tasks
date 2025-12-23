import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole, Department } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole, department?: Department) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: Record<string, User> = {
  director: {
    id: '1',
    name: 'Иванов Алексей Петрович',
    email: 'director@example.com',
    role: 'director',
    avatar: undefined,
  },
  head_project: {
    id: '2',
    name: 'Сидорова Мария Ивановна',
    email: 'head.project@example.com',
    role: 'head',
    department: 'project',
  },
  head_school: {
    id: '3',
    name: 'Козлов Дмитрий Сергеевич',
    email: 'head.school@example.com',
    role: 'head',
    department: 'school',
  },
  head_support: {
    id: '4',
    name: 'Новикова Елена Андреевна',
    email: 'head.support@example.com',
    role: 'head',
    department: 'support',
  },
  specialist: {
    id: '5',
    name: 'Петров Сергей Николаевич',
    email: 'specialist@example.com',
    role: 'specialist',
    department: 'project',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole, department?: Department) => {
    let userKey = role;
    if (role === 'head' && department) {
      userKey = `head_${department}` as any;
    }
    setUser(mockUsers[userKey] || mockUsers.specialist);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

import React, { createContext, useContext, useState } from 'react';

type User = { id: string; name: string; email: string } | null;

type AuthContextType = {
  user: User;
  token?: string;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | undefined>(undefined);

  const signIn = async (email: string, _password: string) => {
    // TODO: call real API
    setToken('mock-token');
    setUser({ id: 'u1', name: 'Jane Doe', email });
  };

  const signOut = () => {
    setToken(undefined);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

import { createContext, useContext } from 'react';

export type AuthContextType = {
  isSignedIn: boolean;
  signIn: () => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}

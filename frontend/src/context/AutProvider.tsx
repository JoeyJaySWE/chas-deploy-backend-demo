import { type ReactNode, useEffect, useState } from 'react';
import { api } from '../api/axios';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    api
      .get('/users/profile')
      .then(() => setIsSignedIn(true))
      .catch(() => setIsSignedIn(false));
  }, []);

  const signIn = () => setIsSignedIn(true);
  const signOut = () => setIsSignedIn(false);

  return <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>{children}</AuthContext.Provider>;
}

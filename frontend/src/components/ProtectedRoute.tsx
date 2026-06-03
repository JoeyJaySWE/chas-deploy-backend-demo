import { type ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../api/axios';

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    api
      .get('/users/profile')
      .then(() => {
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

import { type ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../api/axios';

type Props = {
  children: ReactNode;
};

export default function AdminRoute({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    api
      .get('/users/profile')
      .then((res) => {
        const roles: string[] = res.data.user.role;
        setIsAdmin(roles.includes('admin'));
      })
      .catch(() => {
        setIsAdmin(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

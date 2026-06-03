import { useEffect, useState } from 'react';
import { api } from '../api/axios';

type User = {
  userId: string;
  email: string;
  username: string;
  role: string[];
};

type Response = {
  message: string;
  user: User;
};

export default function AdminToolsPage() {
  const [data, setData] = useState<Response | null>(null);

  useEffect(() => {
    api
      .get('/users/admin-tools')
      .then((res) => setData(res.data))
      .catch(() => setData(null));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Admin Tools</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

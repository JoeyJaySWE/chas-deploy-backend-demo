import { useEffect, useState } from 'react';
import { api } from '../api/axios';

type User = {
  userId: string;
  email: string;
  username: string;
  role: string[];
};

type ProfileResponse = {
  message: string;
  user: User;
};

export default function ProfilePage() {
  const [data, setData] = useState<ProfileResponse | null>(null);

  useEffect(() => {
    api
      .get('/users/profile')
      .then((res) => setData(res.data))
      .catch(() => setData(null));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Profile</h1>

      <p>{data.message}</p>

      <p>Username: {data.user.username}</p>
      <p>Email: {data.user.email}</p>

      <ul>
        {data.user.role.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  );
}

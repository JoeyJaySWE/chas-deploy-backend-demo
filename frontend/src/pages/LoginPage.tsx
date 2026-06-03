import { type SubmitEvent, useState } from 'react';
import { api } from '../api/axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

type ApiError = {
  message: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    try {
      await api.post('/users/login', form);
      signIn();
      navigate('/profile');
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiError>(error)) {
        setError(error.response?.data?.message ?? 'Login failed');
        await fetch('/api/v1/health').then((res) => console.log(res));
      } else {
        setError('Unexpected error');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      <input placeholder="Email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />

      <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} />

      <button type="submit">Login</button>

      {error && <p>{error}</p>}
    </form>
  );
}

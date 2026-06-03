import { type SubmitEvent, useState } from 'react';
import { api } from '../api/axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type ApiError = {
  message: string;
};

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    try {
      await api.post('/users/register', form);
      navigate('/login');
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiError>(error)) {
        setError(error.response?.data?.message ?? 'Register failed');
      } else {
        setError('Unexpected error');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>

      <input placeholder="Username" value={form.username} onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))} />

      <input placeholder="Email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />

      <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} />

      <button type="submit">Create Account</button>

      {error && <p>{error}</p>}
    </form>
  );
}

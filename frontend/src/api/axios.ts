import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? '';
const NODE_ENV = import.meta.env.VITE_NODE_ENV;

if (!BACKEND_URL && NODE_ENV === 'production') {
  throw new Error('VITE_BACKEND_URL is not defined');
}

export const api = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  withCredentials: true,
});

console.log('BACKEND_URL:', JSON.stringify(BACKEND_URL));
console.log('BASE_URL:', `${BACKEND_URL}/api/v1`);

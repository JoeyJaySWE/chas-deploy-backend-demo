import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>

      <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Page not found</p>

      <button
        onClick={() => navigate('/')}
        style={{
          padding: '0.75rem 1.25rem',
          cursor: 'pointer',
        }}
      >
        Go Home
      </button>
    </div>
  );
}

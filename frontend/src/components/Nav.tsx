import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  async function handleLogout() {
    try {
      await api.get('/users/logout');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  }

  return (
    <nav
      style={{
        display: 'flex',
        gap: '1rem',
        padding: '1rem',
        borderBottom: '1px solid #ddd',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* Left side links */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        {!isSignedIn && (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>

      {isSignedIn && (
        <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
          Logout
        </button>
      )}
    </nav>
  );
}

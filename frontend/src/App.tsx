import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminToolsPage from './pages/AdminToolsPage';

import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Nav';
import React from 'react';
import { AuthProvider } from './context/AutProvider';

export default function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminToolsPage />
                </AdminRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
}

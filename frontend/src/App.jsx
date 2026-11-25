/**
 * src/App.jsx — Routing and authentication state management.
 *
 * WHY: This file defines which URL path shows which page.
 * It also keeps track of whether the user is logged in (via JWT token).
 *
 * HOW:
 * - If a JWT token exists in localStorage, the user is "logged in".
 * - <ProtectedRoute> wraps Dashboard so unauthenticated users get
 *   redirected to /login.
 * - After login/register, we store the token and navigate to /dashboard.
 */
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import GoogleCallback from './pages/GoogleCallback';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Keep localStorage in sync whenever token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const logout = () => setToken(null);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/auth/google/callback" element={<GoogleCallback setToken={setToken} />} />

      {/* Protected route — only accessible with a valid token */}
      <Route
        path="/dashboard"
        element={
          token
            ? <Dashboard token={token} logout={logout} />
            : <Navigate to="/login" replace />
        }
      />

      {/* Default: go to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

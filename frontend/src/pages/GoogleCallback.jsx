/**
 * src/pages/GoogleCallback.jsx — Handles the redirect after Google login.
 *
 * WHAT IT DOES:
 *   After the user authenticates with Google, the backend redirects
 *   the browser to:
 *     http://localhost:5173/auth/google/callback#token=<JWT>
 *
 *   The JWT is in the URL "fragment" (after #). This is intentional —
 *   fragments are never sent to any server, so the token stays private.
 *
 *   This page reads the token from the URL, stores it, and navigates
 *   to the Dashboard.
 */
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

export default function GoogleCallback({ setToken }) {
  const navigate = useNavigate();
  const handled = useRef(false);

  useEffect(() => {
    // Prevent React 18 StrictMode double-execution from running after the hash is cleared
    if (handled.current) return;
    handled.current = true;

    // Read the token from the URL fragment:  #token=abc123
    const hash = window.location.hash.substring(1);    // remove the leading '#'
    const params = new URLSearchParams(hash);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      setToken(token);
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/login?error=Google authentication failed', { replace: true });
    }
  }, [setToken, navigate]);

  // Show a loading spinner while we process the token
  return (
    <div className="auth-page">
      <div className="callback-container">
        <Loader />
        <p>Completing Google sign-in…</p>
      </div>
    </div>
  );
}

/**
 * src/services/api.js — All communication with the backend.
 *
 * WHY: Instead of writing fetch() calls in every page, we put them
 * all here. This keeps pages clean and makes it easy to change the
 * API URL in one place.
 *
 * HOW: Each function calls a backend endpoint and returns the response.
 * The base URL comes from the VITE_API_URL environment variable
 * (set in frontend/.env).
 */

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * POST /api/auth/register
 * Sends username, email, password, confirm_password to create an account.
 */
export async function registerUser({ username, email, password, confirmPassword }) {
  const res = await fetch(`${API}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      email,
      password,
      confirm_password: confirmPassword,   // backend expects snake_case
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || 'Registration failed');
  return data;
}

/**
 * POST /api/auth/login
 * Sends identifier (username or email) + password.
 * Returns { access_token, token_type }.
 */
export async function loginUser({ identifier, password }) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || 'Login failed');
  return data;
}

/**
 * GET /api/auth/me
 * Fetches the current user's profile using the JWT token.
 */
export async function getMe(token) {
  const res = await fetch(`${API}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || 'Not authenticated');
  return data;
}

/**
 * Returns the URL that starts the Google login flow.
 * The browser navigates here — the backend redirects to Google.
 */
export function getGoogleLoginUrl() {
  return `${API}/api/auth/google/login`;
}

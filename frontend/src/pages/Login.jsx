/**
 * src/pages/Login.jsx — User login page styled after the Dribbble reference.
 */
import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { loginUser } from '../services/api';
import InputField from '../components/InputField';
import GoogleButton from '../components/GoogleButton';
import Notification from '../components/Notification';
import AuthBrandPanel, { WowelseLogo } from '../components/AuthBrandPanel';

export default function Login({ setToken }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (searchParams.get('registered')) {
      setSuccess('Account created successfully! Please sign in.');
    }
    if (searchParams.get('error')) {
      setError(decodeURIComponent(searchParams.get('error')));
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const data = await loginUser({ identifier, password });
      setToken(data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left panel — Sand/Greige (#ECECE2) with Logo & Form */}
        <div className="auth-form-panel">
          <div className="panel-header">
            <WowelseLogo />
          </div>

          <div className="auth-form-wrapper">
            <div className="auth-heading">
              <h2>Sign In</h2>
              <p className="auth-subtitle">Welcome back! Please enter your details to continue</p>
            </div>

            <Notification message={error} type="error" onClose={() => setError('')} />
            <Notification message={success} type="success" onClose={() => setSuccess('')} />

            <GoogleButton label="Sign in with Google" />

            <div className="divider"><span>OR</span></div>

            <form onSubmit={handleSubmit}>
              <InputField
                label="Username or Email"
                type="text"
                icon="email"
                placeholder="Enter username or email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
              <InputField
                label="Password"
                type="password"
                icon="lock"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit" className="primary-btn" disabled={loading}>
                {loading ? <span className="btn-spinner" /> : null}
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <p className="auth-footer">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>

        {/* Right panel — Ivory Cream (#FAF9F2) with Testimonial & Illustration */}
        <AuthBrandPanel />
      </div>
    </div>
  );
}

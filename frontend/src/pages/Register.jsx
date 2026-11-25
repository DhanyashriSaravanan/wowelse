/**
 * src/pages/Register.jsx — User registration page styled after the Dribbble reference.
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import InputField from '../components/InputField';
import GoogleButton from '../components/GoogleButton';
import Notification from '../components/Notification';
import AuthBrandPanel, { WowelseLogo } from '../components/AuthBrandPanel';

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser({ username, email, password, confirmPassword });
      setSuccess(data.message || 'Account created! Redirecting to sign in…');
      setTimeout(() => navigate('/login?registered=true'), 1500);
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
              <h2>Create Account</h2>
              <p className="auth-subtitle">Join Wowelse! Enter your details to get started</p>
            </div>

            <Notification message={error} type="error" onClose={() => setError('')} />
            <Notification message={success} type="success" onClose={() => setSuccess('')} />

            <GoogleButton label="Sign up with Google" />

            <div className="divider"><span>OR</span></div>

            <form onSubmit={handleSubmit}>
              <InputField
                label="Username"
                type="text"
                icon="user"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <InputField
                label="Email Address"
                type="email"
                icon="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                label="Password"
                type="password"
                icon="lock"
                placeholder="Min. 8 chars, letter + number"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputField
                label="Confirm Password"
                type="password"
                icon="lock"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button type="submit" className="primary-btn" disabled={loading}>
                {loading ? <span className="btn-spinner" /> : null}
                {loading ? 'Creating Account…' : 'Register'}
              </button>
            </form>

            <p className="auth-footer">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>

        {/* Right panel — Ivory Cream (#FAF9F2) with Testimonial & Illustration */}
        <AuthBrandPanel
          quote="Setting up my Wowelse account was instant. Clean interface, fast Google sign-up, and total peace of mind knowing my credentials are protected."
          author="Maya Lin"
          location="Software Engineer"
        />
      </div>
    </div>
  );
}

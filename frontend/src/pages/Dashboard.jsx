/**
 * src/pages/Dashboard.jsx — Protected dashboard styled in the same forest-green & cream palette.
 */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../services/api';
import Loader from '../components/Loader';
import { WowelseLogo } from '../components/AuthBrandPanel';

export default function Dashboard({ token, logout }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe(token)
      .then(setUser)
      .catch(() => {
        logout();
        navigate('/login?error=Session expired. Please sign in again.', { replace: true });
      })
      .finally(() => setLoading(false));
  }, [token, logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="auth-page">
        <div className="callback-card">
          <Loader />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="dashboard-page">
      <nav className="dashboard-nav">
        <WowelseLogo />
        <div className="nav-actions">
          <span className="nav-user">
            {user.picture && <img src={user.picture} alt="" className="nav-avatar" />}
            <span>{user.full_name || user.username}</span>
          </span>
          <button className="logout-btn" onClick={handleLogout}>Log out</button>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="welcome-card">
          <div className="welcome-header">
            {user.picture ? (
              <img src={user.picture} alt="" className="profile-avatar" />
            ) : (
              <div className="profile-avatar-placeholder">
                {(user.full_name || user.username).charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h1>Welcome, {user.full_name || user.username}!</h1>
              <p className="welcome-subtitle">You are successfully authenticated on Wowelse.</p>
            </div>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <div className="info-label">Username</div>
            <div className="info-value">{user.username}</div>
          </div>
          <div className="info-card">
            <div className="info-label">Email Address</div>
            <div className="info-value">{user.email}</div>
          </div>
          <div className="info-card">
            <div className="info-label">Auth Provider</div>
            <div className="info-value">
              <span className={`auth-badge ${user.auth_provider}`}>
                {user.auth_provider === 'google' ? 'Google OAuth' : 'Local Password'}
              </span>
            </div>
          </div>
          <div className="info-card">
            <div className="info-label">Member Since</div>
            <div className="info-value">
              {new Date(user.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

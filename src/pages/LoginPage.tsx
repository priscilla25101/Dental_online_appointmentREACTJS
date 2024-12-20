import React, { useState } from 'react';
import '../styles/login-page.scss';

interface LoginPageProps {
  onLogin?: (email: string, password: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [logoutMessage, setLogoutMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      onLogin?.(email, password);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container login-container">
      <div className="login-grid">
        <div className="login-image">
          <div>
            <i className="fas fa-tooth brand-icon"></i>
            <h2>Welcome to DentCare Connect</h2>
            <p className="mb-4">Your trusted platform for dental care management</p>

            <ul className="features-list">
              <li><i className="fas fa-calendar-check"></i> Easy appointment scheduling</li>
              <li><i className="fas fa-history"></i> View treatment history</li>
              <li><i className="fas fa-comment-medical"></i> Direct communication with dentists</li>
              <li><i className="fas fa-bell"></i> Appointment reminders</li>
            </ul>
          </div>
        </div>

        <div className="login-form">
          {error && (
            <div className="alert alert-danger">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}
          {logoutMessage && (
            <div className="alert alert-success">
              <i className="fas fa-check-circle"></i> {logoutMessage}
            </div>
          )}

          <h3 className="mb-4">Patient Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Email Address</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                <input
                  type="email"
                  className="form-control"
                  id="username"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-lock"></i></span>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-login">
              <i className="fas fa-sign-in-alt me-2"></i>Sign In
            </button>

            <div className="links-section">
              <a href="/register" className="text-decoration-none">
                <i className="fas fa-user-plus"></i> New Patient? Register
              </a>
              <a href="/forgot-password" className="text-decoration-none">
                <i className="fas fa-key"></i> Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
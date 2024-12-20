import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/reset-password-page.scss';

interface AlertMessage {
  type: 'success' | 'error';
  text: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState<AlertMessage | null>(null);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    updatePasswordStrength(value);
  };

  const updatePasswordStrength = (password: string) => {
    const strength = password.length;
    const meter = document.querySelector('.strength-meter') as HTMLElement;

    if (!meter) return;

    if (strength === 0) {
      meter.style.width = '0%';
    } else if (strength < 6) {
      meter.style.width = '33%';
      meter.style.background = '#ff7675';
    } else if (strength < 10) {
      meter.style.width = '66%';
      meter.style.background = '#ffeaa7';
    } else {
      meter.style.width = '100%';
      meter.style.background = '#84fab0';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your password reset logic here
    if (password === confirmPassword) {
      setAlert({ type: 'success', text: 'Password reset successful!' });
      // Reset form or redirect
    } else {
      setAlert({ type: 'error', text: 'Passwords do not match!' });
    }
  };

  return (
    <div className="page-wrapper">
      <div className="decorative-circle circle-1" />
      <div className="decorative-circle circle-2" />

      <div className="floating-teeth tooth-1">
        <i className="fas fa-tooth" />
      </div>
      <div className="floating-teeth tooth-2">
        <i className="fas fa-tooth" />
      </div>
      <div className="floating-teeth tooth-3">
        <i className="fas fa-tooth" />
      </div>

      <div className="container form-container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            {alert && (
              <div className={`alert alert-${alert.type === 'error' ? 'danger' : 'success'}`}>
                <i className={`fas fa-${alert.type === 'error' ? 'exclamation' : 'check'}-circle fa-lg`} />
                <span>{alert.text}</span>
              </div>
            )}

            <div className="form-section">
              <div className="tooth-decoration">
                <i className="fas fa-tooth tooth-icon" />
              </div>

              <div className="form-header">
                <h1 className="form-title">Reset Your Password</h1>
                <p className="form-subtitle">SmileCare Hub - Your Dental Journey Begins Here</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="password"
                    className="custom-input"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                    required
                  />
                  <i className="fas fa-lock input-icon" />
                  <div className="password-strength">
                    <div className="strength-meter" />
                  </div>
                </div>

                <div className="input-group">
                  <input
                    type="password"
                    className="custom-input"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                  />
                  <i className="fas fa-shield-alt input-icon" />
                </div>

                <button type="submit" className="btn-reset">
                  <i className="fas fa-key me-2" />Reset Password
                </button>

                <div className="text-center">
                  <a onClick={() => navigate('/login')} className="back-link">
                    <i className="fas fa-chevron-left" />
                    <span>Return to Login</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/forgot-password-page.scss';

interface AlertMessage {
  type: 'success' | 'error';
  text: string;
}

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState<AlertMessage | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Replace with your actual API call
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setAlert({
          type: 'success',
          text: 'Recovery link has been sent to your email',
        });
      } else {
        setAlert({
          type: 'error',
          text: 'Failed to send recovery link. Please try again.',
        });
      }
    } catch (error) {
      setAlert({
        type: 'error',
        text: 'An error occurred. Please try again later.',
      });
    }
  };

  return (
    <div className="page-wrapper">
      <div className="animated-tooth" aria-hidden="true">
        <i className="fas fa-tooth tooth-pattern" style={{ top: '10%', left: '10%' }}></i>
        <i className="fas fa-tooth tooth-pattern" style={{ top: '30%', left: '45%' }}></i>
        <i className="fas fa-tooth tooth-pattern" style={{ top: '70%', left: '75%' }}></i>
        <i className="fas fa-tooth tooth-pattern" style={{ top: '50%', left: '25%' }}></i>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            {alert && (
              <div className={`alert alert-${alert.type}`} role="alert">
                <i className={`fas fa-${alert.type === 'success' ? 'check' : 'exclamation'}-circle`}></i>
                <span>{alert.text}</span>
              </div>
            )}

            <div className="form-container">
              <div className="form-content">
                <div className="brand-logo">
                  <i className="fas fa-tooth"></i>
                </div>

                <h2 className="text-center mb-4">Recover Access</h2>
                <p className="text-center text-muted mb-4">Enter your email to reset your password</p>

                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-4">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label htmlFor="email">Email address</label>
                  </div>

                  <button type="submit" className="btn btn-reset text-white w-100 mb-4">
                    Send Recovery Link
                    <i className="fas fa-arrow-right ms-2"></i>
                  </button>

                  <div className="text-center">
                    <a onClick={() => navigate('/login')} className="back-link">
                      <i className="fas fa-chevron-left"></i>
                      Return to Login
                    </a>
                  </div>
                </form>

                <div className="security-info">
                  <i className="fas fa-shield-alt"></i>
                  <span>Secure Recovery Process | DentCare Connect</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
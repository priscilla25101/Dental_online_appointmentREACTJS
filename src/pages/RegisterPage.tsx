import React, { useState } from 'react';
import '../styles/register-page.scss';

interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<UserForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    dateOfBirth: '',
  });

  const [errors, setErrors] = useState<Partial<UserForm>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form validation and submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container">
      <div className="wave-container"></div>
      <div className="side-decoration"></div>

      <div className="brand-section">
        <div className="logo-container">
          <i className="fas fa-teeth fa-2x"></i>
        </div>
        <h1>SmileTech Portal</h1>
        <p>Next-generation dental care management</p>
      </div>

      <div className="registration-container">
        <div className="form-card">
          <div className="feature-tag">Beta Access</div>

          <div className="form-header">
            <h2>Join Our Digital Health Network</h2>
            <p>Complete your profile to access smart scheduling and virtual consultations</p>

            <div className="progress-indicator">
              <div className="progress-line"></div>
              <div className="progress-step active">1</div>
              <div className="progress-step">2</div>
              <div className="progress-step">3</div>
            </div>
          </div>

          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="custom-input-group">
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                    />
                    {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="custom-input-group">
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                    />
                    {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                  </div>
                </div>

                <div className="col-12">
                  <div className="custom-input-group">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                    />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="custom-input-group">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create Password"
                    />
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="custom-input-group">
                    <i className="fas fa-phone"></i>
                    <input
                      type="tel"
                      className="form-control"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Phone Number"
                    />
                    {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                  </div>
                </div>

                <div className="col-12">
                  <div className="custom-input-group">
                    <i className="fas fa-calendar"></i>
                    <input
                      type="date"
                      className="form-control"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                    {errors.dateOfBirth && <div className="text-danger">{errors.dateOfBirth}</div>}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="d-flex justify-content-between align-items-center">
                  <button type="submit" className="btn btn-register">
                    Continue to Step 2
                    <i className="fas fa-arrow-right ms-2"></i>
                  </button>
                  <span>
                    Already registered?
                    <a className="login-link" href="/login">Sign in</a>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
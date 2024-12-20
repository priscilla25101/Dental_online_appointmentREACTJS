import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/edit-profile-page.scss';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
}

const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [language, setLanguage] = useState('en');
  const [errors, setErrors] = useState<FormErrors>({});
  
  // This would typically come from your app's state management
  const [user, setUser] = useState<User>({
    id: '1',
    firstName: '',
    lastName: '',
    email: 'user@example.com',
    phoneNumber: '',
    dateOfBirth: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validation would go here
    const newErrors: FormErrors = {};
    if (!user.firstName) newErrors.firstName = 'First name is required';
    if (!user.lastName) newErrors.lastName = 'Last name is required';
    if (!user.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!user.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // API call would go here
      // await updateUser(user);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Wave Background */}
      <div className="wave-container">
        <div className="wave"></div>
        <div className="wave2"></div>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container">
          <a className="navbar-brand" href="/">
            <i className="fas fa-tooth me-2"></i>
            <span className="brand-highlight">DentaCare</span>
          </a>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <div className="d-flex align-items-center gap-3">
              <div className="dropdown">
                <button 
                  className="language-switch" 
                  type="button" 
                  id="languageDropdown" 
                  data-bs-toggle="dropdown"
                >
                  <i className="fas fa-globe me-2"></i>
                  <span>{language === 'en' ? 'English' : 'Kinyarwanda'}</span>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={() => setLanguage('en')}
                    >
                      English
                    </button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={() => setLanguage('rw')}
                    >
                      Kinyarwanda
                    </button>
                  </li>
                </ul>
              </div>
              <button 
                className="btn btn-custom btn-outline"
                onClick={() => navigate('/logout')}
              >
                <i className="fas fa-sign-out-alt me-2"></i>Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-4">
        <div className="row">
          <div className="col-12">
            <div className="profile-container">
              <div className="row g-0">
                {/* Sidebar */}
                <div className="col-md-4 profile-sidebar">
                  <div className="tooth-pattern"></div>
                  <div className="profile-image-container">
                    <i className="fas fa-user"></i>
                  </div>
                  <h4>Profile Settings</h4>
                  <p className="mb-4">
                    Update your personal information to keep your dental care profile up to date.
                  </p>
                  <div className="d-none d-md-block">
                    <h6 className="mb-3">Why update your profile?</h6>
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <i className="fas fa-check-circle me-2"></i>
                        Accurate medical records
                      </li>
                      <li className="mb-2">
                        <i className="fas fa-check-circle me-2"></i>
                        Better appointment scheduling
                      </li>
                      <li className="mb-2">
                        <i className="fas fa-check-circle me-2"></i>
                        Emergency contact info
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Form Section */}
                <div className="col-md-8">
                  <div className="p-4">
                    {showSuccess && (
                      <div className="success-popup">
                        <i className="fas fa-check-circle fa-lg"></i>
                        <span>Your profile has been updated successfully!</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          placeholder="First Name"
                          value={user.firstName}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="firstName">
                          <i className="fas fa-user me-2"></i>First Name
                        </label>
                        {errors.firstName && (
                          <div className="text-danger">{errors.firstName}</div>
                        )}
                      </div>

                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          placeholder="Last Name"
                          value={user.lastName}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="lastName">
                          <i className="fas fa-user me-2"></i>Last Name
                        </label>
                        {errors.lastName && (
                          <div className="text-danger">{errors.lastName}</div>
                        )}
                      </div>

                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Email"
                          value={user.email}
                          readOnly
                        />
                        <label htmlFor="email">
                          <i className="fas fa-envelope me-2"></i>Email
                        </label>
                      </div>

                      <div className="form-floating">
                        <input
                          type="tel"
                          className="form-control"
                          id="phoneNumber"
                          name="phoneNumber"
                          placeholder="Phone Number"
                          value={user.phoneNumber}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="phoneNumber">
                          <i className="fas fa-phone me-2"></i>Phone Number
                        </label>
                        {errors.phoneNumber && (
                          <div className="text-danger">{errors.phoneNumber}</div>
                        )}
                      </div>

                      <div className="form-floating">
                        <input
                          type="date"
                          className="form-control"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={user.dateOfBirth}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="dateOfBirth">
                          <i className="fas fa-calendar me-2"></i>Date of Birth
                        </label>
                        {errors.dateOfBirth && (
                          <div className="text-danger">{errors.dateOfBirth}</div>
                        )}
                      </div>

                      <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                        <button
                          type="button"
                          className="btn btn-custom btn-outline me-md-2"
                          onClick={() => navigate('/profile')}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-custom">
                          <i className="fas fa-save me-2"></i>Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfilePage;
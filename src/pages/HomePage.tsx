import React from 'react';
import '../styles/home-page.scss';

const HomePage: React.FC = () => {
  const [language, setLanguage] = React.useState<'en' | 'rw'>('en');

  const translations = {
    en: {
      register: 'Register',
      login: 'Login',
      welcome_fantasy: 'Welcome to DentalCare Connect',
      enjoy_rpl: 'Experience hassle-free dental appointment booking with our modern online platform. Your smile is our priority!',
      all_rights_reserved: 'All Rights Reserved'
    },
    rw: {
      register: 'Iyandikishe',
      login: 'Injira',
      welcome_fantasy: 'Murakaza neza kuri DentalCare Connect',
      enjoy_rpl: 'Kora gahunda yawe yo kwa muganga w\'amenyo ku buryo bworoshye. Guseka kwawe ni priority yacu!',
      all_rights_reserved: 'Uburenganzira Bwose Burarinzwe'
    }
  };

  const t = translations[language];

  const handleLanguageChange = (lang: 'en' | 'rw') => {
    setLanguage(lang);
  };

  return (
    <div className="dental-care-app">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <i className="fas fa-tooth tooth-icon"></i>
            DentalCare Connect
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  <i className="fas fa-user-plus me-1"></i>
                  <span>{t.register}</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  <i className="fas fa-sign-in-alt me-1"></i>
                  <span>{t.login}</span>
                </a>
              </li>
            </ul>
            <div className="language-selector">
              <div className="dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="languageDropdown" data-bs-toggle="dropdown">
                  <i className="fas fa-globe me-1"></i>
                  <span>{language === 'en' ? 'English' : 'Kinyarwanda'}</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><a className="dropdown-item" href="#" onClick={() => handleLanguageChange('en')}>English</a></li>
                  <li><a className="dropdown-item" href="#" onClick={() => handleLanguageChange('rw')}>Kinyarwanda</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="hero-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="welcome-card">
                <h1 className="text-center">{t.welcome_fantasy}</h1>
                <p className="lead text-center">{t.enjoy_rpl}</p>
                <div className="text-center mt-4">
                  <a href="/register" className="btn btn-primary btn-dental btn-lg me-3">
                    <i className="fas fa-user-plus me-2"></i>
                    <span>{t.register}</span>
                  </a>
                  <a href="/login" className="btn btn-secondary btn-dental btn-lg">
                    <i className="fas fa-sign-in-alt me-2"></i>
                    <span>{t.login}</span>
                  </a>
                </div>

                <div className="features-grid">
                  <div className="feature-card">
                    <i className="fas fa-calendar-check feature-icon"></i>
                    <h4>Easy Booking</h4>
                    <p>Schedule appointments with just a few clicks</p>
                  </div>
                  <div className="feature-card">
                    <i className="fas fa-clock feature-icon"></i>
                    <h4>24/7 Access</h4>
                    <p>Book appointments anytime, anywhere</p>
                  </div>
                  <div className="feature-card">
                    <i className="fas fa-bell feature-icon"></i>
                    <h4>Reminders</h4>
                    <p>Never miss your dental appointment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <p>© 2024 DentalCare Connect. <span>{t.all_rights_reserved}</span></p>
      </footer>
    </div>
  );
};

export default HomePage;
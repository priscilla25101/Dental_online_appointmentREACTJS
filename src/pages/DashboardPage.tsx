import Chart from 'chart.js/auto';
import React, { useEffect, useRef } from 'react';
import '../styles/dashboard-page.scss';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
  roles: { name: string }[];
}

interface DashboardPageProps {
  user: User;
  locale: string;
  messageSuccess?: string;
  messageError?: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  locale,
  messageSuccess,
  messageError,
}) => {
  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const barChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (lineChartRef.current && barChartRef.current) {
      // Line Chart
      new Chart(lineChartRef.current, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            label: 'Appointments',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(79, 70, 229, 0.2)',
            borderColor: 'rgba(79, 70, 229, 1)',
            borderWidth: 1,
            fill: true
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            title: {
              display: true,
              text: 'Appointments Over Time'
            }
          }
        }
      });

      // Bar Chart
      new Chart(barChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          datasets: [{
            label: 'Patients Seen',
            data: [12, 15, 20, 10, 8],
            backgroundColor: 'rgba(79, 70, 229, 0.6)',
            borderColor: 'rgba(79, 70, 229, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            title: {
              display: true,
              text: 'Patients Seen Per Day'
            }
          }
        }
      });
    }
  }, []);

  const handleProfilePictureUpload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Implement your upload logic here
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <a href="#" className="sidebar-brand">
          <i className="fas fa-tooth me-2" />
          SmileCare
        </a>
        <ul className="sidebar-nav">
          <li>
            <a href="#" className="sidebar-link">
              <i className="fas fa-home" />
              Dashboard
            </a>
          </li>
          {user.roles[0].name === 'ROLE_ADMIN' && (
            <li>
              <a href="/users" className="sidebar-link">
                <i className="fas fa-users" />
                Patients
              </a>
            </li>
          )}
          <li>
            <a href="#" className="sidebar-link">
              <i className="fas fa-calendar-alt" />
              Appointments
            </a>
          </li>
          <li>
            <a href="#" className="sidebar-link">
              <i className="fas fa-clipboard-list" />
              Treatment Plans
            </a>
          </li>
          <li>
            <a href="/logout" className="sidebar-link">
              <i className="fas fa-sign-out-alt" />
              Logout
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Language Switcher */}
        <div className="language-switcher">
          <div className="dropdown">
            <button className="btn btn-light dropdown-toggle" type="button" id="languageDropdown" data-bs-toggle="dropdown">
              <i className="fas fa-globe me-2" />
              <span>{locale === 'en' ? 'English' : 'Kinyarwanda'}</span>
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="?lang=en">English</a></li>
              <li><a className="dropdown-item" href="?lang=rw">Kinyarwanda</a></li>
            </ul>
          </div>
        </div>

        {/* Profile Section */}
        <div className="profile-card">
          <div className="profile-header">
            {user.profilePicture && (
              <img 
                src={`/download-profile?fileName=${user.profilePicture}`}
                className="profile-pic" 
                alt="Profile Picture" 
              />
            )}
            <div className="profile-info">
              <h2 className="profile-name">{`${user.firstName} ${user.lastName}`}</h2>
              <p className="mb-1">
                <i className="fas fa-envelope me-2" />
                <span>{user.email}</span>
              </p>
              <p className="mb-1">
                <i className="fas fa-user-shield me-2" />
                <span>{user.roles[0].name}</span>
              </p>
            </div>
          </div>

          {/* Upload Section */}
          <div className="upload-area">
            <form onSubmit={handleProfilePictureUpload}>
              <i className="fas fa-cloud-upload-alt fa-3x mb-3" />
              <h4>Update Profile Picture</h4>
              <p className="text-muted">Drop your image here or click to browse</p>
              <input 
                className="form-control mb-3" 
                type="file" 
                id="profilePicture"
                name="profilePicture" 
                accept="image/*" 
              />
              <button type="submit" className="btn-custom">
                <i className="fas fa-upload me-2" />
                Upload Picture
              </button>
            </form>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <i className="fas fa-calendar-check stat-icon" />
            <h3>Today's Appointments</h3>
            <p className="h2 mb-0">8</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-user-check stat-icon" />
            <h3>Patients Seen</h3>
            <p className="h2 mb-0">124</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-clock stat-icon" />
            <h3>Next Available</h3>
            <p className="h2 mb-0">2:30 PM</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="chart-container">
          <canvas ref={lineChartRef} />
        </div>
        <div className="chart-container">
          <canvas ref={barChartRef} />
        </div>

        {/* Alerts */}
        {messageSuccess && (
          <div className="custom-alert custom-alert-success">
            <i className="fas fa-check-circle me-2" />
            <span>{messageSuccess}</span>
          </div>
        )}
        {messageError && (
          <div className="custom-alert custom-alert-error">
            <i className="fas fa-exclamation-circle me-2" />
            <span>{messageError}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
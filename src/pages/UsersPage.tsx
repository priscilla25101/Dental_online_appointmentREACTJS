import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../styles/users-page.scss';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
}

interface AlertMessage {
  type: 'success' | 'error';
  message: string;
}

const UsersPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortField, setSortField] = useState('firstName');
  const [sortDir, setSortDir] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState<AlertMessage | null>(null);
  const [language, setLanguage] = useState('en');
  
  const size = 10; // Items per page

  useEffect(() => {
    // Fetch users based on current filters
    fetchUsers();
  }, [currentPage, sortField, sortDir, searchTerm]);

  const fetchUsers = async () => {
    // Implementation would depend on your API
    try {
      const response = await fetch(`/api/users?page=${currentPage}&size=${size}&sort=${sortField}&dir=${sortDir}&search=${searchTerm}`);
      const data = await response.json();
      setUsers(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to fetch users' });
    }
  };

  const handleSort = (field: string) => {
    const newDir = field === sortField && sortDir === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDir(newDir);
    setSearchParams({ sort: field, dir: newDir });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(0);
    fetchUsers();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this patient record?')) {
      try {
        await fetch(`/api/users/${id}`, { method: 'DELETE' });
        setAlert({ type: 'success', message: 'Patient deleted successfully' });
        fetchUsers();
      } catch (error) {
        setAlert({ type: 'error', message: 'Failed to delete patient' });
      }
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <i className="bi bi-hospital"></i>
            DentCare Management
          </a>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="/dashboard">
                  <i className="bi bi-grid"></i> Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/logout">
                  <i className="bi bi-box-arrow-right"></i> Logout
                </a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle" 
                  href="#" 
                  id="languageDropdown" 
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-globe"></i>
                  <span>{language === 'en' ? 'English' : 'Kinyarwanda'}</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a 
                      className="dropdown-item" 
                      href="#" 
                      onClick={() => setLanguage('en')}
                    >
                      English
                    </a>
                  </li>
                  <li>
                    <a 
                      className="dropdown-item" 
                      href="#" 
                      onClick={() => setLanguage('rw')}
                    >
                      Kinyarwanda
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            <i className="bi bi-people-fill"></i>
            Patient Records
          </h1>
        </div>

        {alert && (
          <div className={`alert alert-${alert.type} alert-dismissible fade show`}>
            <i className={`bi bi-${alert.type === 'success' ? 'check-circle' : 'exclamation-triangle'}-fill`}></i>
            <span>{alert.message}</span>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setAlert(null)}
            ></button>
          </div>
        )}

        <div className="table-container">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="input-group search-box">
              <input
                type="text"
                className="form-control"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn" type="submit">
                <i className="bi bi-search"></i> Search
              </button>
            </div>
          </form>

          <table className="table">
            <thead>
              <tr>
                <th onClick={() => handleSort('firstName')}>
                  First Name <i className="bi bi-arrow-down-up"></i>
                </th>
                <th onClick={() => handleSort('lastName')}>
                  Last Name <i className="bi bi-arrow-down-up"></i>
                </th>
                <th onClick={() => handleSort('email')}>
                  Email <i className="bi bi-arrow-down-up"></i>
                </th>
                <th onClick={() => handleSort('phoneNumber')}>
                  Phone <i className="bi bi-arrow-down-up"></i>
                </th>
                <th onClick={() => handleSort('dateOfBirth')}>
                  Date of Birth <i className="bi bi-arrow-down-up"></i>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{formatDate(user.dateOfBirth)}</td>
                  <td>
                    <a 
                      href={`/users/edit/${user.id}`} 
                      className="btn btn-dental btn-sm"
                    >
                      <i className="bi bi-pencil"></i> Edit
                    </a>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-dental-danger btn-sm ms-2"
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 0}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li 
                  key={i} 
                  className={`page-item ${i === currentPage ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default UsersPage;
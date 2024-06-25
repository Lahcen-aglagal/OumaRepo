import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import './Nav.css';

function Nav({ Toggle }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      console.log('User logged out');
      navigate('/login');
    }
  };

  return (
    <nav className="navbar navbar-expand-sm custom-navbar navbar-dark fixed-top">
      <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}></i>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="bi bi-justify"></i>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle text-white"
              href="#"
              id="dropdownId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Admin
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownId">
              <Link className="dropdown-item" to="/profile">Profile</Link>
              <Link className="dropdown-item" to="/settings">Settings</Link>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
                <i className="bi bi-box-arrow-right logout-icon"></i>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;

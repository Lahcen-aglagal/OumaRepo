import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Liste des chemins où afficher la barre latérale
  const showSidebarPaths = ['/', '/users', '/profile', '/settings', '/reclamation', '/agenda'];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      // Effectuer ici la logique de déconnexion
      console.log('User logged out');
      navigate('/login');
    }
  };

  return (
    <div className={`bg-white sidebar p-3 ${showSidebarPaths.some(path => location.pathname.startsWith(path)) ? '' : 'd-none'}`}>
      <div className='d-flex align-items-center mb-3'>
        <i className='bi bi-bootstrap-fill me-3 fs-3'></i>
        <span className='brand-name fs-3'>Fix-My-Street</span>
      </div>
      <hr className='text-dark' />
      <div className='list-group list-group-flush'>
        <Link to='/' className={`list-group-item list-group-item-action py-2 ${location.pathname === '/' ? 'active' : ''}`}>
          <i className='bi bi-house fs-5 me-3'></i>
          <span>Home</span>
        </Link>
        <Link to='/users' className={`list-group-item list-group-item-action py-2 ${location.pathname === '/users' ? 'active' : ''}`}>
          <i className='bi bi-people fs-5 me-3'></i>
          <span>Users</span>
        </Link>
        <Link to='/profile' className={`list-group-item list-group-item-action py-2 ${location.pathname === '/profile' ? 'active' : ''}`}>
          <i className='bi bi-person fs-5 me-3'></i>
          <span>Profile</span>
        </Link>
        <Link to='/settings' className={`list-group-item list-group-item-action py-2 ${location.pathname === '/settings' ? 'active' : ''}`}>
          <i className='bi bi-gear fs-5 me-3'></i>
          <span>Settings</span>
        </Link>
        <Link to='/agenda' className={`list-group-item list-group-item-action py-2 ${location.pathname === '/agenda' ? 'active' : ''}`}>
          <i className='bi bi-calendar fs-5 me-3'></i>
          <span>Agenda</span>
        </Link>
        <Link to='/reports' className={`list-group-item list-group-item-action py-2 ${location.pathname === '/reports' ? 'active' : ''}`}>
          <i className='bi bi-clipboard-data fs-5 me-3'></i>
          <span>Report</span>
        </Link>
        <button className='list-group-item list-group-item-action py-2' onClick={handleLogout}>
          <i className='bi bi-power fs-5 me-3'></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;

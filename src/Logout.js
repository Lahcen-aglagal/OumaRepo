import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Log out logic (e.g., clear user session, tokens, etc.)
    // For demonstration, we'll just use localStorage.clear()
    localStorage.clear();

    // Redirect to login page
    navigate('/login');
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2>Déconnexion</h2>
      <p>Vous êtes en train de vous déconnecter...</p>
    </div>
  );
}

export default Logout;

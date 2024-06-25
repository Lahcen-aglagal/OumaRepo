import React, { useState } from 'react';
import './Login.css';
import Server from './Server/Server';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Authentication request
      const authResponse = await Server.post('/Login', loginData);
      console.log('Auth response:', authResponse);
      const { token } = authResponse.data;

      // Store the token
      localStorage.setItem('authToken', token);

      // Update Server instance to use the new token
      Server.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Fetch user details
      const userResponse = await Server.get('/api/user/me');
      console.log('User response:', userResponse);
      const userData = userResponse.data;
      localStorage.setItem('user', JSON.stringify(userData));

      // Redirect based on user role
      const isAdmin = userData.roles.includes('ROLE_ADMIN');
      if (isAdmin) {
        console.log('User logged in as Admin');
        navigate('/admin-dashboard');
      } else {
        console.log('User logged in as regular user');
        navigate('/user-dashboard');
      }

    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'An error occurred during login');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="text-center mb-4">Login</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={loginData.username}
              onChange={(e) => setLoginData({...loginData, username: e.target.value})}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
            <a href="#" className="ms-2">Forgot password?</a>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Settings.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Server from './Server/Server';

function Settings() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    role: '',
    password: '',
    phoneNumber: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const user = {
      email: userData.email,
      roles: [userData.role], // Ensure roles is an array
      password: userData.password,
      nomComplet: userData.username, // Assuming username is used as nomComplet
      ville: userData.address,
      numTel: userData.phoneNumber,
      cin: '', // Add this if required, or remove from backend if not needed
      service: '' // Add this if required, or remove from backend if not needed
    };
  
    console.log('Submitting user:', user);
  
    try {
      const response = await Server.post('/api/users', user);
      console.log('User created:', response.data);
      toast.success('User created successfully!');
    } catch (error) {
      console.error('There was an error creating the user!', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      }
      toast.error('Error creating user: ' + (error.response?.data?.message || error.message));
    }
  };
  return (
    <div className="container settings-page">
      <ToastContainer />
      <div className="settings-container">
        <h2>Create New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={userData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              className="form-control"
              value={userData.role}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="form-control"
              value={userData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              value={userData.address}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Save Settings</button>
        </form>
      </div>
    </div>
  );
}

export default Settings;

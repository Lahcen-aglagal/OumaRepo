// Settings.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Settings.css';

function Settings() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Settings saved:', { username, email, password, phoneNumber, address });
  };
   //can you POST the users that will get replired in the form and when click on the Save Settings botton save them in this endpoint http://127.0.0.1:8000/api/users the methode is POST 
//here is the exemple {
// {
  // "@context": "/api/contexts/User",
  // "@id": "/api/users",
  // "@type": "hydra:Collection",
  // "hydra:totalItems": 3,
  // "hydra:member": [
  //     {
  //         "@id": "/api/users/1",
  //         "@type": "User",
  //         "id": 1,
  //         "email": "oumaima123@gmail.com",
  //         "roles": [
  //             "ROLE_USER"
  //         ],
  //         "password": "$2a$12$IfTrwuCivvZ5Vz1froQBiO2bNlFRSI2DpQdJjVSJoG5SO6WBpjS1W",
  //         "NomComplet": "string",
  //         "ville": "string",
  //         "cin": "string",
  //         "service": "string",
  //         "numTel": "string",
  //         "createdAt": "2024-06-08T17:36:16+02:00",
  //         "reclamations": [],
  //         "userIdentifier": "oumaima123@gmail.com",
  //         "nomComplet": "string"
  //     },
  //     {
  //         "@id": "/api/users/2",
  //         "@type": "User",
  //         "id": 2,
  //         "email": "richa@example.com'",
  //         "roles": [
  //             "ROLE_USER"
  //         ],
  //         "password": "Richauy",
  //         "NomComplet": "string",
  //         "ville": "string",
  //         "cin": "string",
  //         "service": "string",
  //         "numTel": "string",
  //         "createdAt": "2024-06-08T17:36:16+02:00",
  //         "reclamations": [],
  //         "userIdentifier": "richa@example.com'",
  //         "nomComplet": "string"
  //     
// }]}
  return (
    <div className="container settings-page">
      <div className="settings-container">
        <h2>Settings</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
            <input type="text" id="phoneNumber" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" id="address" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Save Settings</button>
        </form>
      </div>
    </div>
  );
}

export default Settings;

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Profile.css';
import Server from './Server/Server';
import axios from 'axios';
const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA',
    profilePicture: 'https://via.placeholder.com/150'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleEdit = () => {
    setIsEditing(true);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser({ ...editedUser, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="card">
          <div className="card-header text-center">
            <h2>Profile</h2>
          </div>
          <div className="card-body text-center">
            <img src={user.profilePicture} alt="Profile" className="rounded-circle mb-3" width="150" />
            {isEditing ? (
              <div>
                <div className="mb-3">
                  <input type="file" className="form-control" onChange={handleImageChange} />
                </div>
                <div className="mb-3">
                  <input type="text" name="name" className="form-control" value={editedUser.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <input type="email" name="email" className="form-control" value={editedUser.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <input type="text" name="phone" className="form-control" value={editedUser.phone} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <input type="text" name="address" className="form-control" value={editedUser.address} onChange={handleChange} />
                </div>
                <button className="btn btn-success" onClick={handleSave}>Save</button>
              </div>
            ) : (
              <div>
                <h4 className="card-title">{user.name}</h4>
                <p className="card-text"><strong>Email:</strong> {user.email}</p>
                <p className="card-text"><strong>Phone:</strong> {user.phone}</p>
                <p className="card-text"><strong>Address:</strong> {user.address}</p>
                <button className="btn btn-primary mt-3" onClick={handleEdit}><i className="bi bi-pencil"></i> Edit Profile</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

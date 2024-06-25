import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Server from './Server/Server';
import './Users.css';
import './customButtons.css';
import Password from 'antd/es/input/Password';
function Users() {
  const [show, setShow] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [search, setSearch] = useState('');
  useEffect(() => {
    const source = axios.CancelToken.source();
  
    const fetchUsers = async () => {
      try {
        const response = await Server.get('/api/users', { cancelToken: source.token });
        const formattedUsers = response.data['hydra:member'].map(user => ({
          id: user.id,
          name: user.nomComplet,
          email: user.email,
          phone: user.numTel,
          address: user.ville,
          cin: user.cin,
          role: user.roles.join(', ')
        }));
        setUsers(formattedUsers);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.log(error);
        }
      }
    };
  
    fetchUsers();
  
    return () => {
      source.cancel('Component unmounted');
    };
  }, []);
//   useEffect(async () => {
//   await Server.get('/api/users' )
//   .then(data => {
//     const formattedUsers = data.data['hydra:member'].map(user => ({
//       id: user.id,
//       name: user.nomComplet,
//       email: user.email,
//       phone: user.numTel,
//       address: user.ville,
//       cin: user.cin,
//       role: user.roles.join(', ') 
//     }));
//     setUsers(formattedUsers);
//   }).catch(error =>{
//     console.log(error)
//   })
// } , [])


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleViewClose = () => setShowView(false);
  const handleViewShow = (user) => {
    setCurrentUser(user);
    setShowView(true);
  };

  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = (user) => {
    setCurrentUser(user);
    setShowEdit(true);
  };

  const handleAddUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const newUser = {
      id: users.length + 1,
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      cin: form.cin.value,
      role: form.role.value,
    };
    setUsers([...users, newUser]);
    handleClose();
  };

  const handleEditUser = async (event) => {
    event.preventDefault();
    const form = event.target;
    console.log('Current user:', currentUser);
    const updatedUser = {
      email: form.email.value,
      roles: [""],
      NomComplet: form.name.value,
      ville: form.address.value,
      cin: form.cin.value,
      service: currentUser.service,
      numTel: form.phone.value,
      createdAt: currentUser.createdAt,
      nomComplet: form.name.value
    };

    console.log('Updated user:', updatedUser);
    
    try {
      const response = await Server.put(`api/users/${currentUser.id}`, updatedUser);
      console.log('Update response:', response);
      
      if (response.status >= 200 && response.status < 300) {
        const updatedUsers = users.map(user => 
          user.id === currentUser.id ? {
            ...user,
            name: updatedUser.NomComplet,
            email: updatedUser.email,
            phone: updatedUser.numTel,
            address: updatedUser.ville,
            cin: updatedUser.cin,
            role: updatedUser.roles.join(', ')
          } : user
        );
        setUsers(updatedUsers);
        handleEditClose();
      } else {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      console.error('Error details:', error.response ? error.response.data : 'No response data');
    }
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`http://127.0.0.1:8000/api/users/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          setUsers(users.filter(user => user.id !== id));
        })
        .catch(error => console.error('Error deleting user:', error));
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.phone.includes(search) ||
    user.address.toLowerCase().includes(search.toLowerCase()) ||
    user.cin.includes(search) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row">
          <div className="col-sm-12 col-md-6 mt-5 mb-4 text-gred">
            <div className="search">
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search User"
                  aria-label="Search"
                  onChange={e => setSearch(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 mt-5 mb-4 text-gred" style={{ color: "blue" }}>
            <h2><b>User Details</b></h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>CIN</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.address}</td>
                      <td>{user.cin}</td>
                      <td>{user.role}</td>
                      <td>
                        <button className="btn btn-sm btn-primary" title="View" style={{ backgroundColor: '#7E95AB' }} onClick={() => handleViewShow(user)}><i className="material-icons">&#xE417;</i></button>
                        <button className="btn btn-sm btn-warning" title="Edit" style={{ color: 'white', backgroundColor: '#4E7D85' }} onClick={() => handleEditShow(user)}><i className="material-icons">&#xE254;</i></button>
                        <button className="btn btn-sm btn-danger" title="Delete" style={{ backgroundColor: '#1E4D57' }} onClick={() => handleDelete(user.id)}><i className="material-icons">&#xE872;</i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleEditUser}>
            <Form.Group>
              <Form.Control type="text" name="name" defaultValue={currentUser.name} required />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Control type="email" name="email" defaultValue={currentUser.email} required />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Control type="text" name="phone" defaultValue={currentUser.phone} required />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Control type="text" name="address" defaultValue={currentUser.address} required />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Control type="text" name="cin" defaultValue={currentUser.cin} required />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Control type="text" name="role" defaultValue={currentUser.role} required />
            </Form.Group>
            {/* Add any additional fields your server requires */}
            <Button type="submit" className="btn btn-success mt-4">Update User</Button>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showView} onHide={handleViewClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>View User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Name:</strong> {currentUser.name}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Phone:</strong> {currentUser.phone}</p>
            <p><strong>Address:</strong> {currentUser.address}</p>
            <p><strong>CIN:</strong> {currentUser.cin}</p>
            <p><strong>Role:</strong> {currentUser.role}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleViewClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showEdit} onHide={handleEditClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditUser}>
              <Form.Group>
                <Form.Control type="text" name="name" defaultValue={currentUser.name} required />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Control type="email" name="email" defaultValue={currentUser.email} required />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Control type="text" name="phone" defaultValue={currentUser.phone} required />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Control type="text" name="address" defaultValue={currentUser.address} required />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Control type="text" name="cin" defaultValue={currentUser.cin} required />
              </Form.Group>
              <Button type="submit" className="btn btn-success mt-4">Update User</Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
export default Users;
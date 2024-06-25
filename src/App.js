import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Agenda from './Agenda';
import Home from './Home';
import Login from './Login';
import Nav from './Navbar';
import Profile from './Profile';
import Reclamation from './Reclamation';
import ReportsPage from './ReportsPage';
import Settings from './Settings';
import Sidebar from './Sidebar';
import Users from './Users';

const MainLayout = ({ children }) => (
  <div className="container-fluid bg-secondary min-vh-100">
    <Nav />
    <div className="row">
      <div className="col-4 col-md-2 bg-white">
        <Sidebar />
      </div>
      <div className="col">
        {children}
      </div>
    </div>
  </div>
);

const LoginLayout = ({ children }) => (
  <div className="container-fluid bg-secondary min-vh-100 d-flex justify-content-center align-items-center">
    {children}
  </div>
);

function App() {
  const [toggle, setToggle] = useState(true);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/reclamations')
      .then(response => response.json())
      .then(data => {
        const fetchedReports = data['hydra:member'].map(item => ({
          id: item.id,
          type: item.type,
          location: item.description,
          status: item.status
        }));
        setReports(fetchedReports);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const Toggle = () => {
    setToggle(!toggle);
  };

  const addReport = (newReport) => {
    setReports([...reports, newReport]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginLayout><Login /></LoginLayout>} />
        <Route path="*" element={<MainLayout>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/" element={<Home Toggle={Toggle} reports={reports} setReports={setReports} />} />
            <Route path="/reclamation/:id" element={<Reclamation reports={reports} setReports={setReports} addReport={addReport} />} />
            <Route path="/reports" element={<ReportsPage reports={reports} setReports={setReports} />} />
          </Routes>
        </MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;

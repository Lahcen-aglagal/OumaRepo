import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from './Sidebar';
import Home from './Home';
import Users from './Users';
import Login from './Login';
import Profile from './Profile';
import Settings from './Settings';
import Agenda from './Agenda';
import Reclamation from './Reclamation';
import ReportsPage from './ReportsPage';
import Nav from './Navbar';

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
  const [reports, setReports] = useState([
    { id: 1, type: 'Trou dans la chaussée', location: 'Rue de la Liberté', status: 'Non traité' },
    { id: 2, type: 'Lampe de rue cassée', location: 'Avenue des Roses', status: 'Non traité' },
    { id: 3, type: 'Panneau de signalisation endommagé', location: 'Place du Marché', status: 'Non traité' },
    { id: 4, type: 'Dépôt sauvage', location: 'Rue de la Gare', status: 'Non traité' },
    { id: 5, type: 'Dépôt sauvage', location: 'Place du Marché', status: 'Non traité' },
    { id: 6, type: 'Nid-de-poule', location: 'Boulevard des Écoles', status: 'Non traité' },
    { id: 7, type: 'Panneau de signalisation endommagé', location: 'Rue de la Gare', status: 'Non traité' },
  ]);

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

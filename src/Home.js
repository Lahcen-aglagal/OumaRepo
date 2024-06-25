import React, { useState } from 'react';
import { Card, ProgressBar, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DashboardComponent from './DashboardComponent';
import './Home.css';

function Home({ reports, setReports }) {
  const [filterType, setFilterType] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const navigate = useNavigate();

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === 'filterType') {
      setFilterType(value);
    } else if (name === 'filterLocation') {
      setFilterLocation(value);
    } else if (name === 'filterStatus') {
      setFilterStatus(value);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const updatedReports = reports.map(report =>
      report.id === id ? { ...report, status: newStatus } : report
    );
    setReports(updatedReports);

    // POST request to update the status on the server
    const reportToUpdate = updatedReports.find(report => report.id === id);
    const payload = {
      id: reportToUpdate.id,
      status: reportToUpdate.status,
      // Add other required fields here
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/reclamations/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      console.log('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/reclamation/${id}`);
  };

  const filteredReports = reports.filter((report) => {
    return (filterType === '' || report.type === filterType) &&
           (filterLocation === '' || report.location === filterLocation) &&
           (filterStatus === '' || report.status === filterStatus);
  });

  const treatedReportsCount = filteredReports.filter(report => report.status === 'Traité').length;
  const totalReportsCount = filteredReports.length;
  const treatedPercentage = totalReportsCount === 0 ? 0 : (treatedReportsCount / totalReportsCount) * 100;

  return (
    <div className="home-page">
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-md-4">
            <Card className="dashboard-component treated-reports">
              <Card.Body>
                <Card.Title>Réclamations traitées</Card.Title>
                <h1>{treatedReportsCount}</h1>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="dashboard-component total-reports">
              <Card.Body>
                <Card.Title>Réclamations totales</Card.Title>
                <h1>{totalReportsCount}</h1>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="dashboard-component treated-percentage">
              <Card.Body>
                <Card.Title>Pourcentage de réclamations traitées</Card.Title>
                <ProgressBar now={treatedPercentage} label={`${treatedPercentage.toFixed(2)}%`} />
              </Card.Body>
            </Card>
          </div>
        </div>

        <DashboardComponent title="Filtres de recherche">
          <div className="mb-3">
            <label htmlFor="filterType" className="form-label">Type de réclamation :</label>
            <select className="form-select" id="filterType" name="filterType" value={filterType} onChange={handleFilterChange}>
              <option value="">Tous</option>
              <option value="Trou dans la chaussée">Trou dans la chaussée</option>
              <option value="Lampe de rue cassée">Lampe de rue cassée</option>
              <option value="Panneau de signalisation endommagé">Panneau de signalisation endommagé</option>
              <option value="Dépôt sauvage">Dépôt sauvage</option>
              <option value="Nid-de-poule">Nid-de-poule</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="filterLocation" className="form-label">Description :</label>
            <select className="form-select" id="filterLocation" name="filterLocation" value={filterLocation} onChange={handleFilterChange}>
              <option value="">Tous</option>
              <option value="Rue de la Liberté">Rue de la Liberté</option>
              <option value="Avenue des Roses">Avenue des Roses</option>
              <option value="Place du Marché">Place du Marché</option>
              <option value="Rue de la Gare">Rue de la Gare</option>
              <option value="Boulevard des Écoles">Boulevard des Écoles</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="filterStatus" className="form-label">État :</label>
            <select className="form-select" id="filterStatus" name="filterStatus" value={filterStatus} onChange={handleFilterChange}>
              <option value="">Tous</option>
              <option value="Non traité">Non traité</option>
              <option value="En cours">En cours</option>
              <option value="Traité">Traité</option>
            </select>
          </div>
        </DashboardComponent>

        <DashboardComponent title="Réclamations filtrées">
          <div className="row">
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>État</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map(report => (
                    <tr key={report.id}>
                      <td>{report.id}</td>
                      <td>{report.type}</td>
                      <td>{report.location}</td>
                      <td>
                        <DropdownButton id="dropdown-basic-button" title={report.status}>
                          <Dropdown.Item onClick={() => handleStatusChange(report.id, 'Non traité')}>Non traité</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleStatusChange(report.id, 'En cours')}>En cours</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleStatusChange(report.id, 'Traité')}>Traité</Dropdown.Item>
                        </DropdownButton>
                      </td>
                      <td>
                        <button className="btn btn-info" onClick={() => handleViewDetails(report.id)}>Détails</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </DashboardComponent>
      </div>
    </div>
  );
}

export default Home;

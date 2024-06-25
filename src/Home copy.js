import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardComponent from './DashboardComponent';
import { Card, ProgressBar } from 'react-bootstrap';
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

  const handleTreatReport = (id) => {
    const updatedReports = reports.map(report =>
      report.id === id ? { ...report, status: 'En cours' } : report
    );
    setReports(updatedReports);
    navigate(`/reclamation/${id}`, { state: { reports: updatedReports } });
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
                <ProgressBar now={treatedPercentage} label={`${treatedPercentage}%`} />
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
                      <td>{report.status}</td>
                      <td>
                        {report.status === 'Traité' && (
                          <button className="btn btn-info" onClick={() => handleViewDetails(report.id)}>Détails</button>
                        )}
                        {report.status === 'Non traité' && (
                          <button className="btn btn-success" onClick={() => handleTreatReport(report.id)}>Traiter</button>
                        )}
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

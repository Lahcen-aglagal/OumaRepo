import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Container } from 'react-bootstrap';
import DashboardComponent from './DashboardComponent';
import './ReportsPage.css';

function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = () => {
    fetch('http://127.0.0.1:8000/api/reclamations')
      .then(response => response.json())
      .then(data => {
        const formattedReports = data['hydra:member'].map(report => ({
          id: report.id,
          type: report.type,
          location: report.description,
          status: report.status,
        }));
        setReports(formattedReports);
      })
      .catch(error => console.error('Error fetching reports:', error));
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === 'filterType') {
      setFilterType(value);
    } else if (name === 'filterLocation') {
      setFilterLocation(value);
    }
  };

  const filteredReports = reports.filter(report => {
    return (filterType === '' || report.type === filterType) &&
           (filterLocation === '' || report.location === filterLocation);
  });

  return (
    <div className="reports-page">
      <Container>
        <h1 className="my-4">Rapports</h1>

        {/* Dashboard Component for Filters */}
        <DashboardComponent title="Filtres de recherche">
          <Row className="mb-3">
            <Col>
              <Form.Label htmlFor="filterType" className="form-label">Type de réclamation :</Form.Label>
              <Form.Select className="form-select" id="filterType" name="filterType" value={filterType} onChange={handleFilterChange}>
                <option value="">Tous</option>
                <option value="Trou dans la chaussée">Trou dans la chaussée</option>
                <option value="Lampe de rue cassée">Lampe de rue cassée</option>
                <option value="Panneau de signalisation endommagé">Panneau de signalisation endommagé</option>
                <option value="Dépôt sauvage">Dépôt sauvage</option>
                <option value="Nid-de-poule">Nid-de-poule</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label htmlFor="filterLocation" className="form-label">Emplacement :</Form.Label>
              <Form.Select className="form-select" id="filterLocation" name="filterLocation" value={filterLocation} onChange={handleFilterChange}>
                <option value="">Tous</option>
                <option value="Rue de la Liberté">Rue de la Liberté</option>
                <option value="Avenue des Roses">Avenue des Roses</option>
                <option value="Place du Marché">Place du Marché</option>
                <option value="Rue de la Gare">Rue de la Gare</option>
                <option value="Boulevard des Écoles">Boulevard des Écoles</option>
              </Form.Select>
            </Col>
          </Row>
        </DashboardComponent>

        {/* Dashboard Component for Report List */}
        <DashboardComponent title="Liste des rapports">
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredReports.map(report => (
              <Col key={report.id}>
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>{report.type}</Card.Title>
                    <Card.Text>Emplacement: {report.location}</Card.Text>
                    <Card.Text>Statut: {report.status}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </DashboardComponent>
      </Container>
    </div>
  );
}

export default ReportsPage;

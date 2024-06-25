import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import './Reclamation.css';

function Reclamation({ reports, setReports, addReport }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [decision, setDecision] = useState('');
  const [comment, setComment] = useState('');
  const [reclamant, setReclamant] = useState(null);
  const [reclamation, setReclamation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchReclamant = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/reclamants/${id}`);
        const response2 = await fetch(`http://127.0.0.1:8000/api/reclamations/${id}`);

        if (!response.ok && !response2.ok) {
          throw new Error('Failed to fetch reclamant data');
        }
        const data = await response.json();
        const data2 = await response2.json();
        setReclamant(data);
        setReclamation(data2);
      } catch (error) {
        console.error('Error fetching reclamant:', error);
      }
    };

    fetchReclamant();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedReports = reports.map((report) => {
      if (report.id === parseInt(id)) {
        return { ...report, decision, comment };
      } else {
        return report;
      }
    });
    setReports(updatedReports);

    const newReport = {
      id: parseInt(id),
      type: reclamation.type,
      location: reclamant.location,
      status: 'Traité',
      decision,
      comment,
      nom: reclamant.nom,
      prenom: reclamant.prenom,
      genre: reclamant.genre,
      age: reclamant.age,
      email: reclamant.email,
      adresse: reclamant.adresse,
      ville: reclamant.ville,
      pays: reclamant.pays,
      photo: reclamant.photo,
      treatedBy: "Nom de l'utilisateur",
    };
    addReport(newReport);
    navigate('/reports');
  };

  const handleTraitement = async () => {
    setShowModal(true);
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/reclamations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'Traité' })
      });
      if (!response.ok) {
        throw new Error('Failed to update reclamation status');
      }
      const updatedReclamation = await response.json();
      setReclamation(updatedReclamation);
      handleSubmit(new Event('submit'));
    } catch (error) {
      console.error('Error updating reclamation status:', error);
    } finally {
      setShowModal(false);
    }
  };

  const handleClose = () => setShowModal(false);

  if (!reclamant && !reclamation) {
    return <div>Chargement...</div>;
  }

  const { nom, prenom, genre, age, email, adresse, ville, pays, photo } = reclamant;
  const { type, description, status } = reclamation;

  return (
    <div className="reclamation-page">
      <div className="reclamation-container">
        <div className="card">
          <div className="card-header text-center">
            <h2>Voir Réclamation</h2>
          </div>
          <div className="card-body text-center">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="type" className="form-label">Type:</label>
                <input type="text" id="type" className="form-control" value={type} disabled />
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">Status:</label>
                <input type="text" id="status" className="form-control" value={status} disabled />
              </div>
              <div className="mb-3">
                <label htmlFor="nom" className="form-label">Nom:</label>
                <input type="text" id="nom" className="form-control" value={nom} disabled />
              </div>
              <div className="mb-3">
                <label htmlFor="prenom" className="form-label">Prénom:</label>
                <input type="text" id="prenom" className="form-control" value={prenom} disabled />
              </div>
              <div className="mb-3">
                <label htmlFor="genre" className="form-label">Genre:</label>
                <input type="text" id="genre" className="form-control" value={genre} disabled />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">Âge:</label>
                <input type="text" id="age" className="form-control" value={age} disabled />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="text" id="email" className="form-control" value={email} disabled />
              </div>
              <div className="mb-3">
                <label htmlFor="adresse" className="form-label">Adresse:</label>
                <input type="text" id="adresse" className="form-control" value={adresse} disabled />
              </div>
              <div className="mb-3">
                <label htmlFor="ville" className="form-label">Ville:</label>
                <input type="text" id="ville" className="form-control" value={ville} disabled />
              </div>
              <div className="mb-3">
                <label htmlFor="pays" className="form-label">Pays:</label>
                <input type="text" id="pays" className="form-control" value={pays} disabled />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description:</label>
                <input type="text" id="description" className="form-control" value={description} disabled />
              </div>
              <button type="submit" className="btn btn-primary me-2">Soumettre</button>
              {status !== 'Traité' && (
                <button type="button" className="btn btn-success" onClick={handleTraitement}>Traiter la réclamation</button>
              )}
            </form>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Êtes-vous sûr de vouloir traiter cette réclamation ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Annuler</Button>
          <Button variant="primary" onClick={handleConfirm}>Confirmer</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Reclamation;

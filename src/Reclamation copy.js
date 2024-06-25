import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Reclamation.css';

function Reclamation({ reports, setReports, addReport }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [decision, setDecision] = useState('');
  const [comment, setComment] = useState('');
  const [reclamant, setReclamant] = useState(null); 
  const [reclamation, setReclamation] = useState(null);// State to hold reclamant data

  useEffect(() => {
    // Fetch reclamant data from API
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
        setReclamation(data2); // Update state with fetched reclamant data
      } catch (error) {
        console.error('Error fetching reclamant:', error);
        // Handle error if needed
      }
    };

    fetchReclamant();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedReports = reports.map((report) => {
      if (report.id === parseInt(id)) {
        return { ...report, decision, comment };
      } else {
        return report;
      }
    });
    setReports(updatedReports);

    // Add a new report
    const newReport = {
      id: parseInt(id),
      type: reclamant.type, // Assuming you have reclamant type in API response
      location: reclamant.location, // Assuming you have reclamant location in API response
      status: 'Traité',
      decision,
      comment,
      nom: reclamant.nom, // Assuming you have reclamant nom in API response
      prenom: reclamant.prenom, // Assuming you have reclamant prenom in API response
      genre: reclamant.genre, // Assuming you have reclamant genre in API response
      age: reclamant.age, // Assuming you have reclamant age in API response
      email: reclamant.email, // Assuming you have reclamant email in API response
      adresse: reclamant.adresse, // Assuming you have reclamant adresse in API response
      ville: reclamant.ville, // Assuming you have reclamant ville in API response
      pays: reclamant.pays, // Assuming you have reclamant pays in API response
      photo: reclamant.photo, // Assuming you have reclamant photo in API response
      treatedBy: "Nom de l'utilisateur", // Replace with real user name
    };
    addReport(newReport);
    navigate('/reports');
  };

  const handleTraitement = () => {
    const updatedReports = reports.map((report) =>
      report.id === parseInt(id) ? { ...report, status: 'Traité' } : report
    );
    setReports(updatedReports);
    handleSubmit(new Event('submit'));
  };

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
                <label htmlFor="type" className="form-label">
                  Type:
                </label>
                <input type="text" id="type" className="form-control" value={type} disabled />
              </div>
          
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status:
                </label>
                <input type="text" id="status" className="form-control" value={status} disabled />
              </div>
              <div className="mb-3">
                <label htmlFor="nom" className="form-label">
                  Nom:
                </label>
                <input type="text" id="nom" className="form-control" value={nom} disabled />
              </div>
              <div className="mb-3">
                <label htmlFor="prenom" className="form-label">
                  Prénom:
                </label>
                <input type="text" id="prenom" className="form-control" value={prenom} disabled />
              </div>
              <div className="mb-3">
                <label htmlFor="genre" className="form-label">
                  Genre:
                </label>
                <input type="text" id="genre" className="form-control" value={genre} disabled />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Âge:
                </label>
                <input type="text" id="age" className="form-control" value={age} disabled />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input type="text" id="email" className="form-control" value={email} disabled />
              </div>
              <div className="mb-3">
                <label htmlFor="adresse" className="form-label">
                  Adresse:
                </label>
                <input type="text" id="adresse" className="form-control" value={adresse} disabled />
              </div>
              <div className="mb-3">
                <label htmlFor="ville" className="form-label">
                  Ville:
                </label>
                <input type="text" id="ville" className="form-control" value={ville} disabled />
              </div>
              <div className="mb-3">
                <label htmlFor="pays" className="form-label">
                  Pays:
                </label>
                <input type="text" id="pays" className="form-control" value={pays} disabled />
              </div>
             
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description:
                </label>
                <input
                  type="text"
                  id="description"
                  className="form-control"
                  value={description}
                  disabled
                  
                />
              </div>
            
              <button type="submit" className="btn btn-primary me-2">
                Soumettre
              </button>
              {status !== 'Traité' && (
                <button type="button" className="btn btn-success" onClick={handleTraitement}>
                  Traiter la réclamation
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reclamation;

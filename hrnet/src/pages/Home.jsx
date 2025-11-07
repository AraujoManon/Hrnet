import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '@lapauze/react-green-modal';
import EmployeeForm from '../components/Form';
import { addEmployee, clearError } from '../store/employeeSlice';

function Home() {
  // Hook pour dispatcher des actions Redux
  const dispatch = useDispatch();
  
  // Récupère les erreurs depuis le store Redux
  const error = useSelector((state) => state.employees.error);

  // État local pour les données du formulaire
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: 'Sales'  // Valeur par défaut
  });

  // État pour contrôler l'ouverture/fermeture du modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Gère les changements dans les champs du formulaire
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    
    // Met à jour uniquement le champ modifié (spread operator)
    setFormData({
      ...formData,
      [name]: value
    });
  }

  // Gère la soumission du formulaire
  function handleSubmit(event) {
    event.preventDefault();  // Empêche le rechargement de la page
    
    try {
      // Envoie les données au store Redux
      dispatch(addEmployee(formData));
      
      // Affiche le modal de confirmation
      setIsModalOpen(true);
      
      // Réinitialise le formulaire
      setFormData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        startDate: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        department: 'Sales'
      });
      
    } catch (err) {
      console.error(err);
    }
  }

  // Ferme le modal et efface les erreurs
  function closeModal() {
    setIsModalOpen(false);
    dispatch(clearError());
  }

  return (
    <div>
      <div className="title">
        <h1>HRnet</h1>
      </div>

      <div className="container">
        {/* Lien vers la liste des employés */}
        <Link to="/employee-list">View Current Employees</Link>
        
        <h2>Create Employee</h2>

        {/* Affichage conditionnel des erreurs */}
        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        {/* Formulaire de création (composant enfant) */}
        <EmployeeForm 
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Modal de confirmation */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        message="Employee Created!" 
      />
    </div>
  );
}

export default Home;
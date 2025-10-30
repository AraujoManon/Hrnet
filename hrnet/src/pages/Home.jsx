import React, { useState } from 'react';
import Modal from '@lapauze/react-green-modal';
import EmployeeForm from '../components/Form';

function Home() {
  const [formData, setFormData] = useState({
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveError, setSaveError] = useState(null);

  function handleChange(event) {
    const nom = event.target.name;
    const valeur = event.target.value;
    
    setFormData({
      ...formData,
      [nom]: valeur
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    try {
      // 1. Charger les employés existants avec gestion d'erreur
      let ancienEmployes = [];
      const saved = localStorage.getItem('employees');
      
      if (saved) {
        try {
          ancienEmployes = JSON.parse(saved);
          
          // Vérifier que c'est bien un array
          if (!Array.isArray(ancienEmployes)) {
            console.warn('Existing data is not an array, starting fresh');
            ancienEmployes = [];
          }
        } catch (parseError) {
          console.error('Error parsing existing data:', parseError);
          // Si les données sont corrompues, on recommence à zéro
          ancienEmployes = [];
        }
      }
      
      // 2. Ajouter le nouvel employé
      ancienEmployes.push(formData);
      
      // 3. Sauvegarder dans localStorage
      localStorage.setItem('employees', JSON.stringify(ancienEmployes));
      
      // 4. Succès - ouvrir le modal
      setIsModalOpen(true);
      setSaveError(null);
      
      // 5. Réinitialiser le formulaire
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
      
    } catch (error) {
      console.error('Error saving employee:', error);
      
      // Vérifier si c'est une erreur de quota dépassé
      if (error.name === 'QuotaExceededError') {
        setSaveError('Storage quota exceeded. Cannot save more employees. Please contact IT support.');
      } else {
        setSaveError('Error saving employee. Please try again.');
      }
    }
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
      {/* Titre de la page */}
      <div className="title">
        <h1>HRnet</h1>
      </div>

      {/* Contenu principal */}
      <div className="container">
        {/* Lien vers la liste des employés */}
        <a href="/employee-list">View Current Employees</a>
        
        <h2>Create Employee</h2>

        {/* Message d'erreur si la sauvegarde a échoué */}
        {saveError && (
          <div style={{
            padding: '15px',
            marginBottom: '20px',
            backgroundColor: '#ffebee',
            color: '#c62828',
            borderRadius: '5px',
            border: '1px solid #ef5350'
          }}>
            <strong>Error:</strong> {saveError}
          </div>
        )}

        {/* Le formulaire */}
        <EmployeeForm 
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Le modal qui s'affiche après la sauvegarde réussie */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        message="Employee Created!" 
      />
    </div>
  );
}

export default Home;
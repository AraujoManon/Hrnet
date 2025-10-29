// On importe React et useState (pour gérer les données qui changent)
import React, { useState } from 'react';
import Modal from '../components/Modal';
import EmployeeForm from '../components/Form';

function Home() {
  // formData = les données du formulaire
  // setFormData = fonction pour modifier formData
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

  // isModalOpen = true ou false (modal ouvert ou fermé)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Quand on tape dans un champ du formulaire
  function handleChange(event) {
    const nom = event.target.name;
    const valeur = event.target.value;
    
    // On met à jour formData
    setFormData({
      ...formData,        // On garde tout ce qui existe déjà
      [nom]: valeur       // On change juste le champ modifié
    });
  }

  // Quand on clique sur "Save"
  function handleSubmit(event) {
    event.preventDefault(); // Empêche la page de se recharger
    
    // 1. On récupère les employés déjà sauvegardés
    const ancienEmployes = JSON.parse(localStorage.getItem('employees')) || [];
    
    // 2. On ajoute le nouvel employé
    ancienEmployes.push(formData);
    
    // 3. On sauvegarde tout dans le navigateur
    localStorage.setItem('employees', JSON.stringify(ancienEmployes));
    
    // 4. On ouvre le modal de confirmation
    setIsModalOpen(true);
    
    // 5. On vide le formulaire
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
  }

  // Quand on ferme le modal
  function closeModal() {
    setIsModalOpen(false);
  }

  // Ce qu'on affiche à l'écran
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

        {/* Le formulaire */}
        <EmployeeForm 
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Le modal qui s'affiche après la sauvegarde */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        message="Employee Created!" 
      />
    </div>
  );
}

export default Home;
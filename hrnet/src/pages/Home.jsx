import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '@lapauze/react-green-modal';
import EmployeeForm from '../components/Form';
import { addEmployee, clearError } from '../store/employeeSlice';

function Home() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.employees.error);

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

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    try {
      // Ajouter l'employé au store Redux
      dispatch(addEmployee(formData));
      
      // Ouvrir le modal
      setIsModalOpen(true);
      
      // Vider le formulaire
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
        <Link to="/employee-list">View Current Employees</Link>
        
        <h2>Create Employee</h2>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        <EmployeeForm 
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        message="Employee Created!" 
      />
    </div>
  );
}

export default Home;
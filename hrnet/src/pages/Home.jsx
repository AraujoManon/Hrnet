import React, { useState } from 'react';
import Modal from '../components/Modal';
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

  function handleChange(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    
    setFormData(function(previousData) {
      return {
        ...previousData,
        [fieldName]: fieldValue
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    const existingEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    existingEmployees.push(formData);
    localStorage.setItem('employees', JSON.stringify(existingEmployees));
    
    setIsModalOpen(true);
    
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

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <div className="title">
        <h1>HRnet</h1>
      </div>

      <div className="container">
        <a href="/employee-list">View Current Employees</a>
        
        <h2>Create Employee</h2>

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
import React from 'react';

// Liste des états américains (comme une base de données)
const states = [
  { name: "Alabama", abbreviation: "AL" },
  { name: "Alaska", abbreviation: "AK" },
  { name: "Arizona", abbreviation: "AZ" },
  { name: "Arkansas", abbreviation: "AR" },
  { name: "California", abbreviation: "CA" },
  { name: "Colorado", abbreviation: "CO" },
  { name: "Connecticut", abbreviation: "CT" },
  { name: "Delaware", abbreviation: "DE" },
  { name: "Florida", abbreviation: "FL" },
  { name: "Georgia", abbreviation: "GA" },
  { name: "Hawaii", abbreviation: "HI" },
  { name: "Idaho", abbreviation: "ID" },
  { name: "Illinois", abbreviation: "IL" },
  { name: "Indiana", abbreviation: "IN" },
  { name: "Iowa", abbreviation: "IA" },
  { name: "Kansas", abbreviation: "KS" },
  { name: "Kentucky", abbreviation: "KY" },
  { name: "Louisiana", abbreviation: "LA" },
  { name: "Maine", abbreviation: "ME" },
  { name: "Maryland", abbreviation: "MD" },
  { name: "Massachusetts", abbreviation: "MA" },
  { name: "Michigan", abbreviation: "MI" },
  { name: "Minnesota", abbreviation: "MN" },
  { name: "Mississippi", abbreviation: "MS" },
  { name: "Missouri", abbreviation: "MO" },
  { name: "Montana", abbreviation: "MT" },
  { name: "Nebraska", abbreviation: "NE" },
  { name: "Nevada", abbreviation: "NV" },
  { name: "New Hampshire", abbreviation: "NH" },
  { name: "New Jersey", abbreviation: "NJ" },
  { name: "New Mexico", abbreviation: "NM" },
  { name: "New York", abbreviation: "NY" },
  { name: "North Carolina", abbreviation: "NC" },
  { name: "North Dakota", abbreviation: "ND" },
  { name: "Ohio", abbreviation: "OH" },
  { name: "Oklahoma", abbreviation: "OK" },
  { name: "Oregon", abbreviation: "OR" },
  { name: "Pennsylvania", abbreviation: "PA" },
  { name: "Rhode Island", abbreviation: "RI" },
  { name: "South Carolina", abbreviation: "SC" },
  { name: "South Dakota", abbreviation: "SD" },
  { name: "Tennessee", abbreviation: "TN" },
  { name: "Texas", abbreviation: "TX" },
  { name: "Utah", abbreviation: "UT" },
  { name: "Vermont", abbreviation: "VT" },
  { name: "Virginia", abbreviation: "VA" },
  { name: "Washington", abbreviation: "WA" },
  { name: "West Virginia", abbreviation: "WV" },
  { name: "Wisconsin", abbreviation: "WI" },
  { name: "Wyoming", abbreviation: "WY" }
];

// Composant Form
// formData = les données du formulaire (vient de Home)
// onChange = fonction appelée quand on tape dans un champ
// onSubmit = fonction appelée quand on clique sur Save
const Form = ({ formData, onChange, onSubmit }) => {
  return (
    <form id="create-employee" onSubmit={onSubmit}>
      
      {/* Champ Prénom */}
      <div>
        <label htmlFor="first-name">First Name</label>
        <input 
          type="text" 
          id="first-name" 
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
          required
        />
      </div>

      {/* Champ Nom */}
      <div>
        <label htmlFor="last-name">Last Name</label>
        <input 
          type="text" 
          id="last-name" 
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
          required
        />
      </div>

      {/* Champ Date de naissance */}
      <div>
        <label htmlFor="date-of-birth">Date of Birth</label>
        <input 
          id="date-of-birth" 
          type="date" 
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={onChange}
          required
        />
      </div>

      {/* Champ Date de début */}
      <div>
        <label htmlFor="start-date">Start Date</label>
        <input 
          id="start-date" 
          type="date" 
          name="startDate"
          value={formData.startDate}
          onChange={onChange}
          required
        />
      </div>

      {/* Section Adresse (regroupée dans un fieldset) */}
      <fieldset className="address">
        <legend>Address</legend>

        {/* Champ Rue */}
        <div>
          <label htmlFor="street">Street</label>
          <input 
            id="street" 
            type="text" 
            name="street"
            value={formData.street}
            onChange={onChange}
            required
          />
        </div>

        {/* Champ Ville */}
        <div>
          <label htmlFor="city">City</label>
          <input 
            id="city" 
            type="text" 
            name="city"
            value={formData.city}
            onChange={onChange}
            required
          />
        </div>

        {/* Liste déroulante des États */}
        <div>
          <label htmlFor="state">State</label>
          <select 
            name="state" 
            id="state"
            value={formData.state}
            onChange={onChange}
            required
          >
            <option value="">Select a state</option>
            {/* On crée une option pour chaque état */}
            {states.map(function(state) {
              return (
                <option key={state.abbreviation} value={state.abbreviation}>
                  {state.name}
                </option>
              );
            })}
          </select>
        </div>

        {/* Champ Code postal */}
        <div>
          <label htmlFor="zip-code">Zip Code</label>
          <input 
            id="zip-code" 
            type="number" 
            name="zipCode"
            value={formData.zipCode}
            onChange={onChange}
            required
          />
        </div>
      </fieldset>

      {/* Liste déroulante des Départements */}
      <div>
        <label htmlFor="department">Department</label>
        <select 
          name="department" 
          id="department"
          value={formData.department}
          onChange={onChange}
          required
        >
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>
      </div>

      {/* Bouton pour sauvegarder */}
      <button type="submit">Save</button>
    </form>
  );
}

export default Form;
import { createSlice } from '@reduxjs/toolkit';

// Ce fichier gère la liste des employés dans l'application
const employeeSlice = createSlice({
  name: 'employees',
  
  // Au départ, on a une liste vide et pas d'erreur
  initialState: {
    list: [],
    error: null,
  },
  
  // Les actions qu'on peut faire
  reducers: {
    // Action 1 : Ajouter un employé
    addEmployee: (state, action) => {
      state.list.push(action.payload);
      state.error = null;
    },
    
    // Action 2 : Enregistrer une erreur
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    // Action 3 : Effacer l'erreur
    clearError: (state) => {
      state.error = null;
    },
  },
});

// On exporte les actions pour les utiliser dans les composants
export const { addEmployee, setError, clearError } = employeeSlice.actions;

// On exporte le reducer pour le store Redux
export default employeeSlice.reducer;
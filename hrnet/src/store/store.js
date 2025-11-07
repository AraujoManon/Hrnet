import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';

// Création du store Redux 
const store = configureStore({
  reducer: {
    employees: employeeReducer,  // installation du reducer
  },
});


export default store;
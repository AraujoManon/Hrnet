import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    list: [],
    error: null,
  },
  reducers: {
    addEmployee: (state, action) => {
      state.list.push(action.payload);
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { addEmployee, setError, clearError } = employeeSlice.actions;
export default employeeSlice.reducer;
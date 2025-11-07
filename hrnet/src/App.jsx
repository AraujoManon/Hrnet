import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './pages/Home';
import EmployeeList from './pages/EmployeeList';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    // Provider = donne accès au store Redux dans toute l'app
    <Provider store={store}>
      {/* Router = gère la navigation entre les pages */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee-list" element={<EmployeeList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
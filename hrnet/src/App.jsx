
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EmployeeList from './pages/Employeelist';

function App() {
 
  return (
    <Router>
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route path="/" element={<Home />} />
        
        {/* Route pour la liste des employés */}
        <Route path="/employee-list" element={<EmployeeList />} />
      </Routes>
    </Router>
  );
}
export default App;
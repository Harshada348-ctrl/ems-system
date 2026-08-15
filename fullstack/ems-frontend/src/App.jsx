import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import EmployeeComponent from './components/EmployeeComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';

function App() {
  return (
    <BrowserRouter>

      <HeaderComponent />

      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={<LoginComponent />}
        />

        {/* Create Account */}
        <Route
          path="/register"
          element={<RegisterComponent />}
        />

        {/* Employee List */}
        <Route
          path="/"
          element={<ListEmployeeComponent />}
        />

        <Route
          path="/employees"
          element={<ListEmployeeComponent />}
        />

        {/* Add Employee */}
        <Route
          path="/add-employee"
          element={<EmployeeComponent />}
        />

        {/* Edit Employee */}
        <Route
          path="/edit-employee/:id"
          element={<EmployeeComponent />}
        />

      </Routes>

      <FooterComponent />

    </BrowserRouter>
  );
}

export default App;
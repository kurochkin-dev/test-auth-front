import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';

function App() {
  return (
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<LoginPage/>} />
            <Route path="/register" element={<RegistrationPage/>} />
            <Route path="/products" element={<ProductsPage/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
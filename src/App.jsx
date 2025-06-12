import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Caja from './pages/Caja';
import Inventario from './pages/Inventario'; 
import Cocina from './pages/Cocina'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/caja" element={<Caja />} />
      <Route path="/inventario" element={<Inventario />} />
      <Route path="/cocina" element={<Cocina />} />
    </Routes>
  );
}

export default App;

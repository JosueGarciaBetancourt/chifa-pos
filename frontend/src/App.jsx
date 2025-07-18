import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Caja from './pages/Caja';
import Inventario from './pages/Inventario'; 
import Cocina from './pages/Cocina'; 
import Mozos from './pages/Mozos'; 
import Delivery from './pages/Delivery';
import Reportes from './pages/Reportes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/caja" element={<Caja />} />
      <Route path="/inventario" element={<Inventario />} />
      <Route path="/cocina" element={<Cocina />} />
      <Route path="/mozos" element={<Mozos />} />
      <Route path="/delivery" element={<Delivery />} />
      <Route path="/reportes" element={<Reportes />} />
    </Routes>
  );
}

export default App;

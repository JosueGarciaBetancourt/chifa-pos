import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Caja from './pages/Caja'; // Asegúrate de que exista

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/chifa-pos/src/pages/Caja" element={<Caja />} />
    </Routes>
  );
}

export default App;

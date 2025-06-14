import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package } from 'lucide-react';

const InventoryHeader = ({ title, totalItems }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/'); // Redirige al dashboard 
  };

  return (
    <div className="bg-purple-600 text-white p-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <ArrowLeft 
          className="w-6 h-6 cursor-pointer hover:bg-purple-700 rounded p-1 transition-colors" 
          onClick={handleBackClick}
        />
        <Package className="w-6 h-6" />
        <h1 className="text-xl font-semibold">{title || 'Inventario'}</h1>
      </div>
      {typeof totalItems !== 'undefined' && (
        <div className="text-right">
          <div className="text-sm opacity-90">Items Totales</div>
          <div className="text-2xl font-bold">{totalItems}</div>
        </div>
      )}
    </div>
  );
};

export default InventoryHeader;

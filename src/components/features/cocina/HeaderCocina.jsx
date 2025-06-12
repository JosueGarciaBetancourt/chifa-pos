import React from 'react';
import { ArrowLeft, ChefHat } from 'lucide-react';

const HeaderCocina = ({ totalPendientes, onBack }) => {
  return (
    <div className="bg-orange-500 text-white p-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <ArrowLeft 
          className="w-6 h-6 cursor-pointer hover:bg-orange-600 rounded p-1 transition-colors" 
          onClick={onBack}
        />
        <ChefHat className="w-6 h-6" />
        <h1 className="text-xl font-semibold">Panel de Cocina - Chifa Imperio</h1>
      </div>
      <div className="text-right">
        <div className="text-sm opacity-90">Pedidos Pendientes</div>
        <div className="text-2xl font-bold">{totalPendientes}</div>
      </div>
    </div>
  );
};

export default HeaderCocina;
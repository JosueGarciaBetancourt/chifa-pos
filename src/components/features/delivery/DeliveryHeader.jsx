import React from 'react';
import { ArrowLeft, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DeliveryHeader = ({ pendingOrdersCount, activeDeliveryPersonsCount }) => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="bg-green-500 text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ArrowLeft 
            className="w-6 h-6 cursor-pointer hover:bg-green-600 rounded p-1 transition-colors" 
            onClick={handleBackToDashboard}
          />
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-white" />
            <h1 className="text-xl font-semibold">Gestión de Delivery - Chifa Imperio</h1>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span>Pedidos Pendientes: {pendingOrdersCount}</span>
          <span>Repartidores Activos: {activeDeliveryPersonsCount}</span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryHeader;

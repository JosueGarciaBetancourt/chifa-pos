// src/components/features/delivery/DeliveryPersonCard.jsx
import React from 'react';
import { Phone, MapPin, User } from 'lucide-react';

const DeliveryPersonCard = ({ person }) => {
  const getStatusColor = (estado) => {
    switch (estado) {
      case 'disponible':
        return 'bg-green-500';
      case 'ocupado':
        return 'bg-red-500';
      case 'descanso':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (estado) => {
    switch (estado) {
      case 'disponible':
        return 'Disponible';
      case 'ocupado':
        return 'Ocupado';
      case 'descanso':
        return 'Descanso';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">
              {person.nombre} {person.apellido}
            </h4>
          </div>
        </div>
        <span 
          className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(person.estado)}`}
        >
          {getStatusText(person.estado)}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Phone className="w-3 h-3" />
          <span>Teléfono:</span>
          <span className="text-gray-900">{person.telefono}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-3 h-3" />
          <span>Ubicación:</span>
          <span className="text-gray-900">{person.ubicacion}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <span>Pedidos Hoy:</span>
          <span className="text-gray-900 font-medium">{person.pedidos_hoy}</span>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <button className="flex-1 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Llamar
        </button>
        <button className="flex-1 px-3 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
          Ubicar
        </button>
      </div>
    </div>
  );
};

export default DeliveryPersonCard;
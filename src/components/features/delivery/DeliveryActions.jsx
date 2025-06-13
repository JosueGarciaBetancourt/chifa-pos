// src/components/features/delivery/DeliveryActions.jsx
import React, { useState } from 'react';
import { ChevronDown, CheckCircle, Truck } from 'lucide-react';

const DeliveryActions = ({ 
  order, 
  deliveryPersons, 
  onAssignDeliveryPerson, 
  onMarkOnWay, 
  onMarkDelivered 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const availableDeliveryPersons = deliveryPersons.filter(person => 
    person.estado === 'disponible'
  );

  const handleAssign = (deliveryPersonId) => {
    onAssignDeliveryPerson(order.id, deliveryPersonId);
    setIsDropdownOpen(false);
  };

  // Estado: Pendiente - Mostrar selector de repartidor
  if (order.estado === 'pendiente') {
    return (
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <span>Seleccionar Repartidor</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <div className="p-2">
              <div className="text-sm font-medium text-gray-700 mb-2 px-2">
                Repartidores Disponibles
              </div>
              {availableDeliveryPersons.length > 0 ? (
                availableDeliveryPersons.map(person => (
                  <button
                    key={person.id}
                    onClick={() => handleAssign(person.id)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <div className="font-medium">
                      {person.nombre} {person.apellido}
                    </div>
                    <div className="text-sm text-gray-600">
                      {person.ubicacion} • {person.pedidos_hoy} pedidos hoy
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500">
                  No hay repartidores disponibles
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Estado: Asignado - Mostrar botón "Marcar en Camino"
  if (order.estado === 'asignado') {
    return (
      <div className="flex flex-col items-end gap-2">
        <div className="text-sm text-gray-600">
          Repartidor: {order.repartidor_asignado.nombre} {order.repartidor_asignado.apellido}
        </div>
        <button
          onClick={() => onMarkOnWay(order.id)}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <Truck className="w-4 h-4" />
          <span>Marcar En Camino</span>
        </button>
      </div>
    );
  }

  // Estado: En camino - Mostrar botón "Marcar Entregado"
  if (order.estado === 'en_camino') {
    return (
      <div className="flex flex-col items-end gap-2">
        <div className="text-sm text-gray-600">
          Repartidor: {order.repartidor_asignado.nombre} {order.repartidor_asignado.apellido}
        </div>
        <button
          onClick={() => onMarkDelivered(order.id)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Marcar Entregado</span>
        </button>
      </div>
    );
  }

  return null;
};

export default DeliveryActions;
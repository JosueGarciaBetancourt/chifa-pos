// src/components/features/delivery/DeliveryOrderCard.jsx
import React from 'react';
import { Phone, MapPin, Package } from 'lucide-react';
import DeliveryActions from './DeliveryActions';

const DeliveryOrderCard = ({ 
  order, 
  deliveryPersons, 
  onAssignDeliveryPerson, 
  onMarkOnWay, 
  onMarkDelivered 
}) => {
  const getStatusColor = (estado) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-red-500';
      case 'asignado':
        return 'bg-yellow-500';
      case 'en_camino':
        return 'bg-blue-500';
      case 'entregado':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (estado) => {
    switch (estado) {
      case 'pendiente':
        return 'Pendiente';
      case 'asignado':
        return 'Asignado';
      case 'en_camino':
        return 'En Camino';
      case 'entregado':
        return 'Entregado';
      default:
        return 'Desconocido';
    }
  };

  const formatTime = (fecha_hora) => {
    const date = new Date(fecha_hora);
    return date.toLocaleTimeString('es-PE', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <Package className="w-5 h-5 text-gray-600" />
          <div>
            <h3 className="font-semibold text-lg">Pedido #{order.codigo}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Creado: {formatTime(order.fecha_hora)}</span>
              <span>Tiempo estimado: {order.tiempo_estimado} min</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span 
            className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(order.estado)}`}
          >
            {getStatusText(order.estado)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-4">
        {/* Cliente */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">Cliente</span>
          </div>
          <div className="text-gray-900">
            <div className="font-medium">{order.cliente.nombre} {order.cliente.apellido}</div>
            <div className="text-sm text-gray-600">{order.cliente.telefono}</div>
          </div>
        </div>

        {/* Dirección */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">Dirección</span>
          </div>
          <div className="text-gray-900 text-sm">
            {order.direccion_entrega}
          </div>
        </div>
      </div>

      {/* Items del Pedido */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Ítems del Pedido</h4>
        <div className="space-y-1">
          {order.detalles_pedido.map(detalle => (
            <div key={detalle.id} className="flex justify-between text-sm">
              <span>• {detalle.producto.nombre}</span>
              <span>x{detalle.cantidad}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Total y Acciones */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="text-lg font-semibold">
          Total: S/ {order.total.toFixed(2)}
        </div>
        
        <DeliveryActions
          order={order}
          deliveryPersons={deliveryPersons}
          onAssignDeliveryPerson={onAssignDeliveryPerson}
          onMarkOnWay={onMarkOnWay}
          onMarkDelivered={onMarkDelivered}
        />
      </div>
    </div>
  );
};

export default DeliveryOrderCard;
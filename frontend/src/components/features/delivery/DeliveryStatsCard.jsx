// src/components/features/delivery/DeliveryStatsCard.jsx
import React from 'react';
import { TrendingUp, Clock, Star, DollarSign } from 'lucide-react';

const DeliveryStatsCard = ({ stats }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="font-semibold mb-4 text-gray-900">Estadísticas del Día</h3>
      
      <div className="space-y-4">
        {/* Total Entregas */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Total Entregas:</span>
          </div>
          <span className="font-semibold text-gray-900">{stats.total_entregas}</span>
        </div>

        {/* Tiempo Promedio */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Clock className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">Tiempo Promedio:</span>
          </div>
          <span className="font-semibold text-gray-900">{stats.tiempo_promedio}</span>
        </div>

        {/* Satisfacción */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-yellow-600" />
            </div>
            <span className="text-sm text-gray-600">Satisfacción:</span>
          </div>
          <span className="font-semibold text-gray-900">{stats.satisfaccion}</span>
        </div>

        {/* Ingresos Delivery */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-sm text-gray-600">Ingresos Delivery:</span>
          </div>
          <span className="font-semibold text-gray-900">S/ {stats.ingresos_delivery}</span>
        </div>
      </div>

      {/* Resumen adicional */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          Actualizado en tiempo real
        </div>
      </div>
    </div>
  );
};

export default DeliveryStatsCard;
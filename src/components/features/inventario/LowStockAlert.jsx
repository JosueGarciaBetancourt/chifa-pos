import React from 'react';
import { AlertTriangle } from 'lucide-react';

const LowStockAlert = ({ items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6 mb-8">
      <div className="flex items-center mb-4">
        <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
        <h2 className="text-lg font-semibold text-red-800">Productos con Stock Bajo</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-red-400">
            <h3 className="font-bold text-gray-800 mb-1">{item.nombre}</h3>
            <p className="text-red-600 text-sm">
              Stock: {item.stock_actual} {item.unidad} (Mín: {item.stock_minimo})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStockAlert;
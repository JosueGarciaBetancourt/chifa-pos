import React from 'react';

const SalesTypes = ({ salesTypes }) => {
  const getPercentage = (amount, total) => {
    return Math.round((amount / total) * 100);
  };

  const total = salesTypes.reduce((sum, type) => sum + type.amount, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Ventas por Tipo</h3>
        <p className="text-sm text-gray-500">Distribución de ventas por modalidad</p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {salesTypes.map((type, index) => {
            const percentage = getPercentage(type.amount, total);
            return (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{type.name}</p>
                    <p className="text-sm text-gray-500">{type.orders} pedidos</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{type.total}</p>
                    <p className="text-sm text-gray-500">{percentage}%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SalesTypes;
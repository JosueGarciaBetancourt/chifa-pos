import React from 'react';

const SalesDistribution = ({ title }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2">
        {/* Aquí iría un gráfico en la implementación real */}
        <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400">
          Gráfico de distribución de ventas
        </div>
      </div>
    </div>
  );
};

export default SalesDistribution;
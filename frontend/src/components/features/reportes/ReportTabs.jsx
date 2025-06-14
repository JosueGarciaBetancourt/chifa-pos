import React from 'react';

const ReportTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { key: 'sales-by-hour', label: 'Ventas por Hora' },
    { key: 'popular-products', label: 'Productos Populares' },
    { key: 'sales-types', label: 'Tipos de Venta' },
    { key: 'day-details', label: 'Detalle del Día' }
  ];

  return (
    <div className="mb-6">
      <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.key
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReportTabs;
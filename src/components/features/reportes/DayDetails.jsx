import React from 'react';

const DayDetails = ({ operationalSummary, financialAnalysis }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Detalle del Día</h3>
      </div>
      <div className="p-6">
        {/* Resumen Operativo */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Resumen Operativo</h4>
          <div className="space-y-3">
            {operationalSummary.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{item.label}:</span>
                <span className={`text-sm font-medium ${
                  item.isHighlight ? 'text-green-600' : 'text-gray-900'
                }`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Análisis Financiero */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Análisis Financiero</h4>
          <div className="space-y-3">
            {financialAnalysis.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{item.label}:</span>
                <span className={`text-sm font-medium ${
                  item.isProfit ? 'text-green-600' : 
                  item.isHighlight ? 'text-indigo-600' : 'text-gray-900'
                }`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayDetails;
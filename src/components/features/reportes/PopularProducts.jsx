import React from 'react';

const PopularProducts = ({ products }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Productos Más Vendidos</h3>
        <p className="text-sm text-gray-500">Top 5 productos del día</p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-indigo-600">#{index + 1}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.units} unidades vendidas</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{product.total}</p>
                <p className="text-sm text-gray-500">{product.average}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularProducts;
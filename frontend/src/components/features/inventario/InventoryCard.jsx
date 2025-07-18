import React from 'react';
import { Plus, Minus } from 'lucide-react';

const InventoryCard = ({ item, onItemClick, updateStock }) => {
  const isLowStock = item.stock_actual < item.stock_minimo;
  const totalValue = item.stock_actual * item.costo;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="cursor-pointer" onClick={() => onItemClick(item)}>
          <h3 className="text-lg font-bold text-gray-800 hover:text-purple-600 transition-colors">
            {item.nombre}
          </h3>
          <p className="text-sm text-gray-500">
            {item.tipo?.nombre ?? 'Sin tipo'}{/*  • {item.proveedor} */}
          </p>       
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          isLowStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {isLowStock ? 'Stock Bajo' : 'Stock OK'}
        </span>
      </div>

      {/* Stock Info */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className={`p-3 rounded-lg ${isLowStock ? 'bg-red-50' : 'bg-green-50'}`}>
          <p className="text-xs text-gray-500 font-medium">Stock Actual</p>
          <p className="text-xl font-bold">{item.stock_actual} {item.unidad}</p>
        </div>
        <div className="p-3 rounded-lg bg-blue-50">
          <p className="text-xs text-gray-500 font-medium">Stock Mínimo</p>
          <p className="text-xl font-bold">{item.stock_minimo} {item.unidad}</p>
        </div>
      </div>

      {/* Price Info */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 font-medium">Precio Unitario</p>
          <p className="text-sm font-semibold">S/ {item.costo.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium">Valor Total</p>
          <p className="text-sm font-semibold">S/ {totalValue.toFixed(2)}</p>
        </div>
      </div>

      {/* Stock Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => updateStock(item.id, -1)}
            className="w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={item.stock_actual === 0}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-lg font-bold px-3 min-w-[3rem] text-center">{item.stock_actual}</span>
          <button
            onClick={() => updateStock(item.id, 1)}
            className="w-8 h-8 rounded-full bg-green-100 text-green-600 hover:bg-green-200 flex items-center justify-center transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Valor Total:</p>
          <p className="font-bold text-purple-600">S/ {totalValue.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;
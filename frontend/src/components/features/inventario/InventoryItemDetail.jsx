import React from 'react';
import { ArrowLeft, Plus, Minus, Edit, FileText, TrendingUp } from 'lucide-react';

const InventoryItemDetail = ({ item, onBack, updateStock }) => {
  if (!item) return null;

  const isLowStock = item.stock_actual < item.stock_minimo;
  const totalValue = item.stock_actual * item.costo;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-purple-600 hover:text-purple-800 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver al inventario
      </button>

      {/* Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Basic Info */}
        <div className="lg:col-span-2">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{item.nombre}</h1>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">{item.tipo}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{item.proveedor}</span>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              isLowStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}>
              {isLowStock ? 'Stock Bajo' : 'Stock OK'}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Tipo</h3>
                <p className="text-lg text-gray-900">{item.tipo}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Proveedor</h3>
                <p className="text-lg text-gray-900">{item.proveedor}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Unidad de Medida</h3>
                <p className="text-lg text-gray-900">{item.unidad}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Precio Unitario</h3>
                <p className="text-lg font-semibold text-gray-900">S/ {item.costo.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stock Management Panel */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-6">Control de Stock</h3>
          
          {/* Current Stock */}
          <div className={`p-4 rounded-lg mb-4 ${isLowStock ? 'bg-red-100' : 'bg-green-100'}`}>
            <p className="text-sm font-medium text-gray-600 mb-1">Stock Actual</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{item.stock_actual} {item.unidad}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateStock(item.id, -1)}
                  className="w-8 h-8 rounded-full bg-white shadow-sm text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors disabled:opacity-50"
                  disabled={item.stock_actual === 0}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => updateStock(item.id, 1)}
                  className="w-8 h-8 rounded-full bg-white shadow-sm text-green-600 hover:bg-green-50 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Minimum Stock */}
          <div className="p-4 rounded-lg bg-blue-100 mb-4">
            <p className="text-sm font-medium text-gray-600 mb-1">Stock Mínimo</p>
            <span className="text-xl font-bold">{item.stock_minimo} {item.unidad}</span>
          </div>

          {/* Total Value */}
          <div className="p-4 rounded-lg bg-purple-100 mb-6">
            <p className="text-sm font-medium text-gray-600 mb-1">Valor Total</p>
            <span className="text-xl font-bold text-purple-700">S/ {totalValue.toFixed(2)}</span>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Registrar Entrada</span>
            </button>
            <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Registrar Salida</span>
            </button>
            <button className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
              <Edit className="w-4 h-4" />
              <span>Editar Producto</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stock Status Warning */}
      {isLowStock && (
        <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-red-800 font-semibold">Stock Bajo</span>
          </div>
          <p className="text-red-700 text-sm">
            El stock actual ({item.stock_actual} {item.unidad}) está por debajo del mínimo requerido ({item.stock_minimo} {item.unidad}). 
            Se recomienda realizar un pedido al proveedor.
          </p>
        </div>
      )}
    </div>
  );
};

export default InventoryItemDetail;
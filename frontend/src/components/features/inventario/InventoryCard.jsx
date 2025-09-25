// ===================================================================
// InventoryCard.jsx - Modificado para mostrar agrupación por insumo
import React, { useState } from 'react';
import { Plus, Minus, Calendar, User, TrendingUp, AlertTriangle, ChevronDown, ChevronRight, Package, Building } from 'lucide-react';

const InventoryCard = ({ item, onItemClick, updateStock }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Si item.proveedores existe, es un grupo; si no, es un item individual
  const isGroup = item.proveedores && Array.isArray(item.proveedores);

  if (isGroup) {
    return <GroupedCard item={item} onItemClick={onItemClick} updateStock={updateStock} />;
  } else {
    return <IndividualCard item={item} onItemClick={onItemClick} updateStock={updateStock} />;
  }
};

// Componente para card agrupada
const GroupedCard = ({ item: insumoGroup, onItemClick, updateStock }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Calcular totales del grupo
  const totalStock = insumoGroup.proveedores.reduce((sum, p) => sum + (Number(p.stock_actual) || 0), 0);
  const totalValue = insumoGroup.proveedores.reduce((sum, p) => sum + (Number(p.valor_stock_proveedor) || 0), 0);
  const stockMinimo = insumoGroup.proveedores[0]?.stock_minimo_general || 0;
  
  // Determinar estado general del grupo
  const getGroupStatus = () => {
    if (totalStock <= stockMinimo) return { label: 'Stock Bajo', color: 'bg-red-50 text-red-700 border-red-200' };
    if (totalStock <= stockMinimo * 1.5) return { label: 'Stock Medio', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' };
    return { label: 'Stock OK', color: 'bg-green-50 text-green-700 border-green-200' };
  };

  const groupStatus = getGroupStatus();

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
      {/* Header principal */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
              </button>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {insumoGroup.nombre}
                </h3>
                <p className="text-sm text-gray-500">
                  {insumoGroup.proveedores.length} proveedor{insumoGroup.proveedores.length !== 1 ? 'es' : ''} • {insumoGroup.tipo_nombre}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${groupStatus.color}`}>
              {groupStatus.label}
            </span>
            <span className="text-xs text-gray-500">
              {insumoGroup.unidad_medida}
            </span>
          </div>
        </div>

        {/* Resumen del grupo */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <p className="text-xs text-gray-600 font-medium mb-1">Stock Total</p>
            <p className="text-xl font-bold text-blue-700">
              {totalStock} <span className="text-sm font-normal">{insumoGroup.unidad_medida}</span>
            </p>
          </div>
          <div className="p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
            <p className="text-xs text-gray-600 font-medium mb-1">Stock Mínimo</p>
            <p className="text-xl font-bold text-gray-700">
              {stockMinimo} <span className="text-sm font-normal">{insumoGroup.unidad_medida}</span>
            </p>
          </div>
          <div className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <p className="text-xs text-gray-600 font-medium mb-1">Valor Total</p>
            <p className="text-lg font-bold text-purple-700">S/ {totalValue.toFixed(2)}</p>
          </div>
        </div>

        {/* Botón para expandir/colapsar */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2  cursor-pointer"
        >
          <span className="text-sm font-medium text-gray-600">
            {isExpanded ? 'Ocultar' : 'Ver'} proveedores ({insumoGroup.proveedores.length})
          </span>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </div>

      {/* Lista expandible de proveedores */}
      {isExpanded && (
        <div className="border-t border-gray-100">
          {insumoGroup.proveedores.map((proveedor, index) => (
            <ProveedorItem
              key={proveedor.insumo_proveedor_id}
              proveedor={proveedor}
              isLast={index === insumoGroup.proveedores.length - 1}
              onItemClick={onItemClick}
              updateStock={updateStock}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Componente para card individual (sin cambios del original)
const IndividualCard = ({ item, onItemClick, updateStock }) => {
  // Valores seguros con los nombres correctos de la BD
  const stockActual = Number(item.stock_actual) || 0;
  const stockMinimo = Number(item.stock_minimo_general) || 0;
  const costoUnitarioReal = Number(item.costo_unitario_real) || 0;
  const costoUnitarioPactado = Number(item.costo_unitario_pactado) || 0;
  const valorStockProveedor = Number(item.valor_stock_proveedor) || 0;
  const diferenciaCosto = Number(item.diferencia_costo) || 0;
  
  // Determinar color del estado
  const getStockStatusColor = (estado) => {
    switch (estado) {
      case 'Stock Crítico': return 'bg-red-50 text-red-700 border-red-200';
      case 'Stock Bajo': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Stock Medio': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-green-50 text-green-700 border-green-200';
    }
  };

  // Formatear fecha
  const formatFecha = (fecha) => {
    if (!fecha) return 'Sin compras';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-PE', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="cursor-pointer flex-1" onClick={() => onItemClick(item)}>
          <h3 className="text-lg font-bold text-gray-800 hover:text-purple-600 transition-colors leading-tight">
            {item.insumo_nombre || 'Sin nombre'}
          </h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {item.descripcion || 'Sin descripción'}
          </p>
          <p className="text-xs text-blue-600 font-medium mt-1">
            {item.proveedor_nombre || 'Sin proveedor'}
          </p>
        </div>
        <div className="ml-3 flex flex-col items-end space-y-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStockStatusColor(item.estado_stock)}`}>
            {item.estado_stock || 'Sin estado'}
          </span>
          <span className="px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
            {item.tipo_nombre || 'Sin tipo'}
          </span>
        </div>
      </div>

      {/* Stock Info */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <p className="text-xs text-gray-600 font-medium mb-1">Stock Actual</p>
          <p className="text-xl font-bold text-blue-700">
            {stockActual} <span className="text-sm font-normal">{item.unidad_medida || ''}</span>
          </p>
        </div>
        <div className="p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
          <p className="text-xs text-gray-600 font-medium mb-1">Stock Mínimo</p>
          <p className="text-xl font-bold text-gray-700">
            {stockMinimo} <span className="text-sm font-normal">{item.unidad_medida || ''}</span>
          </p>
        </div>
      </div>

      {/* Price Comparison */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-green-50 border border-green-100">
          <p className="text-xs text-gray-600 font-medium mb-1">Costo Real</p>
          <p className="text-lg font-bold text-green-700">
            S/ {costoUnitarioReal > 0 ? costoUnitarioReal.toFixed(2) : costoUnitarioPactado.toFixed(2)}
          </p>
          {diferenciaCosto !== 0 && (
            <p className={`text-xs ${diferenciaCosto > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {diferenciaCosto > 0 ? '↓' : '↑'} S/ {Math.abs(diferenciaCosto).toFixed(2)}
            </p>
          )}
        </div>
        <div className="p-3 rounded-lg bg-orange-50 border border-orange-100">
          <p className="text-xs text-gray-600 font-medium mb-1">Costo Pactado</p>
          <p className="text-lg font-bold text-orange-700">S/ {costoUnitarioPactado.toFixed(2)}</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div className="flex items-center space-x-1 text-gray-600">
          <Calendar className="w-3 h-3" />
          <span>{formatFecha(item.fecha_ultima_compra)}</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-600">
          <User className="w-3 h-3" />
          <span className="truncate">{item.ultimo_usuario_compra || 'N/A'}</span>
        </div>
      </div>

      {/* Stock Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => updateStock(item.insumo_proveedor_id, -1)}
            className="w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={stockActual === 0}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-lg font-bold px-3 min-w-[3rem] text-center">{stockActual}</span>
          <button
            onClick={() => updateStock(item.insumo_proveedor_id, 1)}
            className="w-8 h-8 rounded-full bg-green-100 text-green-600 hover:bg-green-200 flex items-center justify-center transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Valor Total:</p>
          <p className="font-bold text-purple-600">S/ {valorStockProveedor.toFixed(2)}</p>
          {item.total_compras_realizadas > 0 && (
            <p className="text-xs text-gray-500">{item.total_compras_realizadas} compras</p>
          )}
        </div>
      </div>

      {/* Rotation indicator */}
      {item.rotacion_stock > 0 && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Rotación:</span>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3 text-blue-500" />
              <span className="font-medium text-blue-600">{item.rotacion_stock}x</span>
            </div>
          </div>
        </div>
      )}

      {/* Days since last purchase warning */}
      {item.dias_desde_ultima_compra > 30 && (
        <div className="mt-2 p-2 bg-yellow-50 rounded-md border border-yellow-200">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <span className="text-xs text-yellow-700">
              {item.dias_desde_ultima_compra} días sin comprar
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente para cada proveedor dentro del grupo
const ProveedorItem = ({ proveedor, isLast, onItemClick, updateStock }) => {
  const stockActual = Number(proveedor.stock_actual) || 0;
  const costoReal = Number(proveedor.costo_unitario_real) || Number(proveedor.costo_unitario_pactado) || 0;
  const costoUnitarioPactado = Number(proveedor.costo_unitario_pactado) || 0;
  const diferenciaCosto = Number(proveedor.diferencia_costo) || 0;

  const getStockStatusColor = (estado) => {
    switch (estado) {
      case 'Stock Crítico': return 'text-red-600';
      case 'Stock Bajo': return 'text-orange-600';
      case 'Stock Medio': return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  const formatFecha = (fecha) => {
    if (!fecha) return 'Sin compras';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-PE', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`px-9 py-5 hover:bg-gray-50 transition-colors ${!isLast ? 'border-b border-gray-100' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 cursor-pointer" onClick={() => onItemClick(proveedor)}>
          <div className="flex items-start space-x-3">
            <Building className="w-4 h-4 text-gray-400 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-800 hover:text-purple-600 transition-colors">
                {proveedor.descripcion}
              </h4>
              <p className="text-sm text-gray-600">{proveedor.proveedor_nombre}</p>
            </div>
          </div>
        </div>
        
        <div className="text-right ml-4">
          <p className={`text-sm font-medium ${getStockStatusColor(proveedor.estado_stock)}`}>
            {stockActual} {proveedor.unidad_medida}
          </p>
          <p className="text-xs text-gray-500">{proveedor.estado_stock}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 text-xs">
        <div>
          <p className="text-gray-500 mb-1">Costo Real</p>
          <p className="font-semibold text-green-700">S/ {costoReal.toFixed(2)}</p>
          {diferenciaCosto !== 0 && (
            <p className={`text-xs ${diferenciaCosto > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {diferenciaCosto > 0 ? '↓' : '↑'} S/ {Math.abs(diferenciaCosto).toFixed(2)}
            </p>
          )}
        </div>
        
        <div>
          <p className="text-gray-500 mb-1">Costo Pactado</p>
          <p className="font-semibold text-orange-700">S/ {costoUnitarioPactado.toFixed(2)}</p>
        </div>
        
        <div>
          <p className="text-gray-500 mb-1">Valor Total</p>
          <p className="font-semibold text-purple-700">S/ {proveedor.valor_stock_proveedor.toFixed(2)}</p>
        </div>
        
        <div>
          <p className="text-gray-500 mb-1">Última Compra</p>
          <p className="font-medium">{formatFecha(proveedor.fecha_ultima_compra)}</p>
          {proveedor.ultimo_usuario_compra && (
            <p className="text-gray-500 truncate">{proveedor.ultimo_usuario_compra}</p>
          )}
        </div>
      </div>

      {/* Indicadores adicionales */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          {proveedor.rotacion_stock > 0 && (
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>Rotación: {proveedor.rotacion_stock}x</span>
            </div>
          )}
          
          {proveedor.total_compras_realizadas > 0 && (
            <span>{proveedor.total_compras_realizadas} compras</span>
          )}
        </div>
        
        {/* Controles de stock */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => updateStock(proveedor.insumo_proveedor_id, -1)}
            className="w-6 h-6 rounded-full bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center transition-colors disabled:opacity-50"
            disabled={stockActual === 0}
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-sm font-bold px-2 min-w-[2rem] text-center">{stockActual}</span>
          <button
            onClick={() => updateStock(proveedor.insumo_proveedor_id, 1)}
            className="w-6 h-6 rounded-full bg-green-100 text-green-600 hover:bg-green-200 flex items-center justify-center transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Alerta de días sin comprar */}
      {proveedor.dias_desde_ultima_compra > 30 && (
        <div className="mt-2 p-2 bg-yellow-50 rounded-md border border-yellow-200">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-3 h-3 text-yellow-600" />
            <span className="text-xs text-yellow-700">
              {proveedor.dias_desde_ultima_compra} días sin comprar
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryCard;

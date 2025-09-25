
// ===================================================================
// InventoryGrid.jsx - Modificado para agrupar datos antes de mostrar
import React from 'react';
import { Package } from 'lucide-react';
import InventoryCard from './InventoryCard';

const InventoryGrid = ({ inventoryData, onItemClick, updateStock }) => {
  // Agrupar datos por insumo_id
  const groupedData = inventoryData.reduce((groups, item) => {
    const key = item.insumo_id;
    
    if (!groups[key]) {
      groups[key] = {
        insumo_id: item.insumo_id,
        nombre: item.insumo_nombre,
        tipo_nombre: item.tipo_nombre,
        unidad_medida: item.unidad_medida,
        proveedores: []
      };
    }
    
    groups[key].proveedores.push(item);
    
    return groups;
  }, {});

  const groupedArray = Object.values(groupedData);

  if (groupedArray.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No se encontraron productos</p>
        <p className="text-gray-400 text-sm mt-2">Intenta cambiar los filtros de búsqueda</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {groupedArray.map((insumoGroup) => (
        <InventoryCard
          key={insumoGroup.insumo_id}
          item={insumoGroup}
          onItemClick={onItemClick}
          updateStock={updateStock}
        />
      ))}
    </div>
  );
};

export default InventoryGrid;
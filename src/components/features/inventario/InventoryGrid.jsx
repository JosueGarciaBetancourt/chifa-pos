import React from 'react';
import { Package } from 'lucide-react';
import InventoryCard from './InventoryCard';

const InventoryGrid = ({ inventoryData, onItemClick, updateStock }) => {
  if (inventoryData.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No se encontraron productos</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {inventoryData.map((item) => (
        <InventoryCard
          key={item.id}
          item={item}
          onItemClick={onItemClick}
          updateStock={updateStock}
        />
      ))}
    </div>
  );
};

export default InventoryGrid;
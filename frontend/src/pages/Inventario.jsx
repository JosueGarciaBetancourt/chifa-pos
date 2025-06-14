import React, { useState } from 'react';
import InventoryHeader from '../components/features/inventario/InventoryHeader';
import InventoryStats from '../components/features/inventario/InventoryStats';
import LowStockAlert from '../components/features/inventario/LowStockAlert';
import InventoryFilters from '../components/features/inventario/InventoryFilters';
import InventoryGrid from '../components/features/inventario/InventoryGrid';
import InventoryItemDetail from '../components/features/inventario/InventoryItemDetail';

const Inventario = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [view, setView] = useState('list');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const [inventoryData, setInventoryData] = useState([
    {
      id: 1,
      nombre: "Arroz",
      categoria: "Granos",
      stock_actual: 50,
      stock_minimo: 20,
      unidad: "kg",
      precio_unitario: 3.50,
      proveedor: "Distribuidora Lima",
      status: "Stock OK"
    },
    {
      id: 2,
      nombre: "Pollo",
      categoria: "Carnes",
      stock_actual: 15,
      stock_minimo: 25,
      unidad: "kg",
      precio_unitario: 8.50,
      proveedor: "Avícola San Fernando",
      status: "Stock Bajo"
    },
    {
      id: 3,
      nombre: "Carne de Res",
      categoria: "Carnes",
      stock_actual: 8,
      stock_minimo: 15,
      unidad: "kg",
      precio_unitario: 18.00,
      proveedor: "Carnes Premium",
      status: "Stock Bajo"
    },
    {
      id: 4,
      nombre: "Cebolla China",
      categoria: "Verduras",
      stock_actual: 3,
      stock_minimo: 5,
      unidad: "kg",
      precio_unitario: 4.00,
      proveedor: "Mercado Central",
      status: "Stock Bajo"
    },
    {
      id: 5,
      nombre: "Sillao",
      categoria: "Condimentos",
      stock_actual: 5,
      stock_minimo: 8,
      unidad: "L",
      precio_unitario: 7.50,
      proveedor: "Importadora Oriental",
      status: "Stock Bajo"
    },
    {
      id: 6,
      nombre: "Aceite de Sésamo",
      categoria: "Condimentos",
      stock_actual: 12,
      stock_minimo: 6,
      unidad: "L",
      precio_unitario: 15.00,
      proveedor: "Importadora Oriental",
      status: "Stock OK"
    },
    {
      id: 7,
      nombre: "Fideos de Arroz",
      categoria: "Granos",
      stock_actual: 25,
      stock_minimo: 10,
      unidad: "kg",
      precio_unitario: 5.50,
      proveedor: "Distribuidora Lima",
      status: "Stock OK"
    },
    {
      id: 8,
      nombre: "Brócoli",
      categoria: "Verduras",
      stock_actual: 7,
      stock_minimo: 5,
      unidad: "kg",
      precio_unitario: 6.00,
      proveedor: "Mercado Central",
      status: "Stock OK"
    }
  ]);

    const categories = ['Todos', 'Granos', 'Carnes', 'Condimentos', 'Verduras', 'Otros'];

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setView('detail');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedItem(null);
  };

  const updateStock = (id, change) => {
    setInventoryData(prev => prev.map(item => {
      if (item.id === id) {
        const newStock = Math.max(0, item.stock_actual + change);
        return {
          ...item,
          stock_actual: newStock,
          status: newStock < item.stock_minimo ? 'Stock Bajo' : 'Stock OK'
        };
      }
      return item;
    }));
  };

  const filteredData = inventoryData.filter(item => {
    const matchesCategory = selectedCategory === 'Todos' || item.categoria === selectedCategory;
    const matchesSearch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalProductos = inventoryData.length;
  const lowStockItems = inventoryData.filter(item => item.stock_actual < item.stock_minimo);
  const totalCategories = [...new Set(inventoryData.map(item => item.categoria))].length;
  const inventoryValue = inventoryData.reduce((total, item) => {
    return total + (item.stock_actual * item.precio_unitario);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <InventoryHeader title="Control de Inventario - Chifa Imperio" />
      
      <div className="p-4">
        {view === 'list' ? (
          <>
            <InventoryStats 
              totalProductos={totalProductos}
              lowStockCount={lowStockItems.length}
              totalCategories={totalCategories}
              inventoryValue={inventoryValue}
            />
            
            <LowStockAlert items={lowStockItems} />
            
            <InventoryFilters 
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            
            <InventoryGrid 
              inventoryData={filteredData}
              onItemClick={handleItemClick}
              updateStock={updateStock}
            />
          </>
        ) : (
          <InventoryItemDetail 
            item={selectedItem} 
            onBack={handleBackToList}
            updateStock={updateStock}
          />
        )}
      </div>
    </div>
  );
};

export default Inventario;
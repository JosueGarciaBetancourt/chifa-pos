import React, { useState, useEffect } from 'react';
import InventoryHeader from '../components/features/inventario/InventoryHeader';
import InventoryStats from '../components/features/inventario/InventoryStats';
import LowStockAlert from '../components/features/inventario/LowStockAlert';
import InventoryFilters from '../components/features/inventario/InventoryFilters';
import InventoryGrid from '../components/features/inventario/InventoryGrid';
import InventoryItemDetail from '../components/features/inventario/InventoryItemDetail';
import insumosUnifiedService from '../services/insumosUnifiedService';

const Inventario = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [view, setView] = useState('list');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [inventoryData, setInventoryData] = useState([]);

  const categories = ['Todos', 'Granos', 'Carnes', 'Condimentos', 'Verduras', 'Otros'];

  useEffect(() => {
    const fetchInsumos = async () => {
      try {
        const insumos = await insumosUnifiedService.getInsumos();

        const mapped = insumos.map(i => ({
          ...i,
          categoria: 'Otros',
          proveedor: 'Proveedor Genérico',
          precio_unitario: i.costo,
          unidad: i.unidad_medida,
          status: i.stock_actual < i.stock_minimo ? 'Stock Bajo' : 'Stock OK'
        }));

        setInventoryData(mapped);
      } catch (error) {
        console.error('Error al cargar insumos:', error);
      }
    };

    fetchInsumos();
  }, []);

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

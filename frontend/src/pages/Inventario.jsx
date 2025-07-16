import React, { useState, useEffect } from 'react';
import InventoryHeader from '../components/features/inventario/InventoryHeader';
import InventoryStats from '../components/features/inventario/InventoryStats';
import LowStockAlert from '../components/features/inventario/LowStockAlert';
import InventoryFilters from '../components/features/inventario/InventoryFilters';
import InventoryGrid from '../components/features/inventario/InventoryGrid';
import InventoryItemDetail from '../components/features/inventario/InventoryItemDetail';
import insumosUnifiedService from '../services/insumosUnifiedService';
import tiposInsumosUnifiedService from '../services/tiposInsumosUnifiedService';

const Inventario = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [view, setView] = useState('list');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [inventoryData, setInventoryData] = useState([]);
  const [categories, setCategories] = useState(['Todos']); // Inicializa con "Todos"

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1) Obtener tipos de insumos
        const tipos = await tiposInsumosUnifiedService.getTiposInsumos();
        console.log('Tipos de insumos:', tipos);

        const categoriasDB = tipos.map(tipo => tipo.nombre);
        setCategories(['Todos', ...categoriasDB]);

        // 2) Obtener insumos reales
        const insumos = await insumosUnifiedService.getInsumos();
        console.log('Insumos:', insumos);

        // 3) Mapea insumos usando la estructura con JOIN
        const mapped = insumos.map(i => ({
          id: i.id,
          nombre: i.nombre,
          categoria: i.categoria?.nombre || 'Sin categoría',
          categoria_descripcion: i.categoria?.descripcion || '',
          unidad: i.unidad,
          stock_actual: i.stock_actual,
          stock_minimo: i.stock_minimo,
          precio_unitario: i.costo,
          proveedor: 'Proveedor Genérico', // Si tienes proveedor real, cámbialo
          status: i.stock_actual < i.stock_minimo ? 'Stock Bajo' : 'Stock OK'
        }));

        setInventoryData(mapped);
      } catch (error) {
        console.error('Error al cargar inventario:', error);
      }
    };

    fetchData();
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
    setInventoryData(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newStock = Math.max(0, item.stock_actual + change);
          return {
            ...item,
            stock_actual: newStock,
            status: newStock < item.stock_minimo ? 'Stock Bajo' : 'Stock OK'
          };
        }
        return item;
      })
    );
  };

  const filteredData = inventoryData.filter(item => {
    const matchesCategory = selectedCategory === 'Todos' || item.categoria === selectedCategory;
    const matchesSearch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalProductos = inventoryData.length;
  const lowStockItems = inventoryData.filter(item => item.stock_actual < item.stock_minimo);
  const totalCategories = categories.length - 1; // No contar "Todos"
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

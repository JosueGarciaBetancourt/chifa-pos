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
  const [selectedTipo, setSelectedTipo] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [inventoryData, setInventoryData] = useState([]);
  const [tipos, setTipos] = useState(['Todos']); // Inicializa con "Todos"

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener tipos de insumos
        const tipos = await tiposInsumosUnifiedService.getTiposInsumos();
        if (!Array.isArray(tipos)) {
          console.warn('⚠️ tiposInsumos no es un array:', tipos);
          setTipos(['Todos']);
        } else {
          const tiposDB = tipos.map(tipo => tipo.nombre);
          setTipos(['Todos', ...tiposDB]);
        }

        // Obtener insumos
        const insumos = await insumosUnifiedService.getInsumos();
        if (!Array.isArray(insumos)) {
          console.warn('⚠️ insumos no es un array:', insumos);
          setInventoryData([]);
          return;
        }

        /* 
          id: row.id,
          nombre: row.nombre,
          unidad: row.unidad_medida,
          stock_actual: row.stock_actual,
          stock_minimo: row.stock_minimo,
          costo: row.costo,
          tipo: {
            id: row.tipo_id,
            nombre: row.tipo_nombre,
            descripcion: row.tipo_descripcion
          }
        */
        setInventoryData(insumos);
      } catch (error) {
        console.error('❌ Error inesperado al cargar inventario:', error);
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
    const matchesTipo = selectedTipo === 'Todos' || item.tipo?.nombre.toLowerCase().trim() === selectedTipo.toLowerCase().trim();
    const matchesSearch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTipo && matchesSearch;
  });

  const totalProductos = inventoryData.length;
  const lowStockItems = inventoryData.filter(item => item.stock_actual < item.stock_minimo);
  const totalTipos = tipos.length - 1; // No contar "Todos"
  const inventoryValue = inventoryData.reduce((total, item) => {
    return total + (item.stock_actual * item.costo);
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
              totalTipos={totalTipos}
              inventoryValue={inventoryValue}
            />

            <LowStockAlert items={lowStockItems} />

            <InventoryFilters
              tipos={tipos}
              selectedTipo={selectedTipo}
              setSelectedTipo={setSelectedTipo}
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

// 1. Inventario.jsx (componente principal)
import React, { useState, useEffect } from 'react';
import InventoryHeader from '../components/features/inventario/InventoryHeader';
import InventoryStats from '../components/features/inventario/InventoryStats';
import LowStockAlert from '../components/features/inventario/LowStockAlert';
import InventoryFilters from '../components/features/inventario/InventoryFilters';
import InventoryGrid from '../components/features/inventario/InventoryGrid';
import InventoryItemDetail from '../components/features/inventario/InventoryItemDetail';
import inventarioUnified from '../services/unified/inventarioUnified';
import tiposInsumosUnified from '../services/unified/tiposInsumosUnified';

const Inventario = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [view, setView] = useState('list');
  const [selectedTipo, setSelectedTipo] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [inventoryData, setInventoryData] = useState([]);
  const [tipos, setTipos] = useState(['Todos']);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener los tipos de insumos
        const tiposDB = await tiposInsumosUnified.getTiposInsumos();
        if (Array.isArray(tiposDB)) {
          const nombresTipos = tiposDB.map(tipo => tipo.nombre);
          setTipos(['Todos', ...nombresTipos]);
        } else {
          console.warn('⚠️ tiposInsumos no es un array:', tiposDB);
          setTipos(['Todos']);
        }

        const inventario = await inventarioUnified.getInventarioDetallado();
        setInventoryData(inventario);
      } catch (error) {
        console.error('❌ Error al cargar inventario:', error);
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

  const updateStock = (insumoProveedorId, change) => {
    setInventoryData(prev =>
      prev.map(item => {
        if (item.insumo_proveedor_id === insumoProveedorId) {
          const newStock = Math.max(0, (item.stock_actual || 0) + change);
          return {
            ...item,
            stock_actual: newStock,
            // Recalcular estado basado en stock mínimo general
            estado_stock: newStock <= (item.stock_minimo_general || 0) ? 'Stock Bajo' : 
                         newStock <= ((item.stock_minimo_general || 0) * 1.5) ? 'Stock Medio' : 'Stock OK',
          };
        }
        return item;
      })
    );
  };

  const filteredData = inventoryData.filter(item => {
    const matchesTipo =
      selectedTipo === 'Todos' ||
      (item.tipo_nombre || '').toLowerCase().trim() === selectedTipo.toLowerCase().trim();
    const matchesSearch = (item.insumo_nombre || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.descripcion || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTipo && matchesSearch;
  });

  const totalProductos = inventoryData.length;
  const lowStockItems = inventoryData.filter(item => 
    item.estado_stock === 'Stock Bajo' || item.estado_stock === 'Stock Crítico'
  );
  const totalTipos = tipos.length - 1; // excluir "Todos"
  const inventoryValue = inventoryData.reduce(
    (total, item) => total + (item.valor_stock_proveedor || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <InventoryHeader title="Control de Inventario - Chifa Imperio" />
      <div className="p-4">
        {view === 'list' ? (
          <>
            <InventoryStats
              totalProductos={totalProductos}
              // lowStockCount={lowStockItems.length}
              totalTipos={totalTipos}
              inventoryValue={inventoryValue}
            />

            {/* <LowStockAlert items={lowStockItems} /> */}

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


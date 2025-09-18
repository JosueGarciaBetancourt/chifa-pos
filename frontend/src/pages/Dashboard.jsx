import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, Clock, Users, Package, ShoppingCart, Utensils, Tablet, Truck, Box, BarChart } from 'lucide-react';
import productosUnifiedService from '../services/productosUnifiedService';

export default function Dashboard() {
  //console.log(window.electronAPI.productos);

  const navigate = useNavigate();

  const handleProbarApi = async () => {
    try {
      const productosData = await productosUnifiedService.getProductos();
      console.log('[✔️] Productos:', productosData);
      alert(`✅ ${productosData.length} productos recibidos`);
    } catch (error) {
      alert('❌ Error al obtener productos');
    }
  };
  
  return (
    <div className="min-h-screen bg-red-50">
      {/* Header */}
      <header className="bg-red-600 text-white p-6 text-2xl font-bold flex items-center">
        <span className="mr-2">🍜</span> CHIFA IMPERIO - Sistema POS
        <button
          onClick={handleProbarApi}
          className="ml-10 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm text-white font-semibold rounded-lg shadow-md cursor-pointer transition"
        >
          Probar API
        </button>
      </header>

      {/* Panel Principal */}
      <main className="p-6">
        <h2 className="text-lg text-red-800 font-semibold mb-4">Panel de Control Principal</h2>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow border-l-4 border-green-500">
            <p className="text-sm text-gray-500">Ventas Hoy</p>
            <p className="text-green-600 text-xl font-bold">S/ 1250.50</p>
          </div>
          <div className="bg-white p-4 rounded shadow border-l-4 border-orange-400">
            <p className="text-sm text-gray-500">Pedidos Pendientes</p>
            <p className="text-orange-500 text-xl font-bold">8</p>
          </div>
          <div className="bg-white p-4 rounded shadow border-l-4 border-blue-400">
            <p className="text-sm text-gray-500">Mesas Ocupadas</p>
            <p className="text-blue-500 text-xl font-bold">12/20</p>
          </div>
          <div className="bg-white p-4 rounded shadow border-l-4 border-red-500">
            <p className="text-sm text-gray-500">Inventario Bajo</p>
            <p className="text-red-600 text-xl font-bold">3 items</p>
          </div>
        </div>

        {/* Opciones del sistema */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-xl text-red-600 font-semibold flex items-center gap-2">
              <ShoppingCart size={20} /> Sistema de Caja
            </h3>
            <p className="text-sm text-gray-600 mb-3">Procesar ventas, generar tickets y enviar pedidos a cocina</p>
            <button
              onClick={() => navigate('/caja')}
              className="bg-red-600 text-white px-4 py-2 rounded w-full cursor-pointer"
            >
              Abrir Caja
            </button>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-xl text-orange-600 font-semibold flex items-center gap-2">
              <Utensils size={20} /> Panel de Cocina
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Ver pedidos pendientes y actualizar estados
            </p>
            <button
              onClick={() => navigate('/cocina')}
              className="bg-orange-500 text-white px-4 py-2 rounded w-full cursor-pointer"
            >
              Ver Cocina
            </button>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-xl text-blue-600 font-semibold flex items-center gap-2">
              <Tablet size={20} /> Tablet Mozos
            </h3>
            <p className="text-sm text-gray-600 mb-3">Tomar pedidos de mesa y gestionar mesas</p>
            <button 
              onClick={() => navigate('/mozos')}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full cursor-pointer"
            >
              Abrir Tablet
            </button>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-xl text-green-600 font-semibold flex items-center gap-2">
              <Truck size={20} /> Delivery
            </h3>
            <p className="text-sm text-gray-600 mb-3">Gestionar pedidos de delivery y repartidores</p>
            <button 
              onClick={() => navigate('/delivery')}
              className="bg-green-600 text-white px-4 py-2 rounded w-full cursor-pointer"
            >
              Ver Delivery
            </button>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-xl text-purple-600 font-semibold flex items-center gap-2">
              <Box size={20} /> Inventario
            </h3>
            <p className="text-sm text-gray-600 mb-3">Control de insumos y stock de productos</p>
            <button 
              onClick={() => navigate('/inventario')}
              className="bg-purple-600 text-white px-4 py-2 rounded w-full cursor-pointer"
            >
              Ver Inventario
            </button>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-xl text-indigo-600 font-semibold flex items-center gap-2">
              <BarChart size={20} /> Reportes
            </h3>
            <p className="text-sm text-gray-600 mb-3">Reportes de ventas, productos más vendidos</p>
            <button 
              onClick={() => navigate('/reportes')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded w-full cursor-pointer transition-colors"
            >
              Ver Reportes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const productos = [
  { nombre: 'Arroz Chaufa de Pollo', precio: 18 },
  { nombre: 'Arroz Chaufa Especial', precio: 22 },
];

export default function SistemaCajaChifa() {
  const [pedido, setPedido] = useState([]);
  const [cliente, setCliente] = useState('');
  const [tipoVenta, setTipoVenta] = useState('Para Llevar');
  const navigate = useNavigate();

  const agregarProducto = (producto) => {
    setPedido([...pedido, producto]);
  };

  const total = pedido.reduce((sum, item) => sum + item.precio, 0);

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-red-600 text-white p-4 text-xl font-bold flex justify-between items-center">
        <span>Sistema de Caja - Chifa Imperio</span>
        <button
          onClick={() => navigate('/')}
          className="bg-white text-red-600 px-4 py-2 rounded font-semibold shadow"
        >
          ← Volver al Dashboard
        </button>
      </header>

      <div className="flex flex-1">
        {/* Productos */}
        <div className="w-3/4 p-4">
          <div className="flex space-x-4 mb-4 border-b">
            {['Arroces', 'Tallarines', 'Pollos', 'Cerdos', 'Entradas', 'Sopas', 'Especiales'].map((cat) => (
              <button key={cat} className={`px-3 py-1 ${cat === 'Arroces' ? 'font-bold border-b-2 border-black' : 'text-gray-500'}`}>{cat}</button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {productos.map((prod) => (
              <div key={prod.nombre} className="border p-4 rounded shadow">
                <h2 className="font-semibold text-lg">{prod.nombre}</h2>
                <p className="text-green-600 font-bold">S/ {prod.precio.toFixed(2)}</p>
                <button
                  onClick={() => agregarProducto(prod)}
                  className="mt-2 bg-black text-white px-4 py-2 rounded flex items-center justify-center"
                >
                  + Agregar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Detalle Pedido */}
        <div className="w-1/4 p-4 bg-gray-50 border-l">
          <div className="mb-4">
            <h3 className="font-bold mb-2">Tipo de Venta</h3>
            <div className="grid grid-cols-3 gap-2">
              {['Delivery', 'Para Llevar', 'Mesa'].map((tipo) => (
                <button
                  key={tipo}
                  onClick={() => setTipoVenta(tipo)}
                  className={`p-2 rounded border ${tipoVenta === tipo ? 'bg-black text-white' : 'bg-white'}`}
                >
                  {tipo}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-bold">Información del Cliente</h3>
            <input
              type="text"
              placeholder="Nombre del cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <h3 className="font-bold">Pedido Actual</h3>
            {pedido.length === 0 ? (
              <p className="text-gray-500">No hay items en el pedido</p>
            ) : (
              <ul className="list-disc ml-5">
                {pedido.map((item, index) => (
                  <li key={index}>{item.nombre} - S/ {item.precio.toFixed(2)}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-4 bg-green-100 p-2 rounded">
            <p className="font-bold">Total: <span className="text-green-600">S/ {total.toFixed(2)}</span></p>
          </div>

          <button
            className="w-full bg-red-300 text-white p-3 rounded font-bold"
            disabled={pedido.length === 0}
          >
            🧾 Procesar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}
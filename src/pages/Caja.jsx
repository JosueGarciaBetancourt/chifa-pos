import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mesasConPedidos = {
  5: [
    { nombre: 'Tallarin Saltado de Pollo', precio: 18 },
    { nombre: 'Tallarin Saltado de Pollo', precio: 18 },
    { nombre: 'Tallarin Saltado de Pollo', precio: 18 },
  ],
};

const productos = [
  { nombre: 'Arroz Chaufa de Pollo', precio: 18 },
  { nombre: 'Arroz Chaufa Especial', precio: 22 },
];

export default function SistemaCajaChifa() {
  const [cliente, setCliente] = useState('');
  const [tipoVenta, setTipoVenta] = useState('Para Llevar');
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [pedidoLibre, setPedidoLibre] = useState([]);
  const navigate = useNavigate();

  const mesasDisponibles = [1, 2, 3, 4, 5, 6, 7];

  const pedido = tipoVenta === 'Mesa'
    ? mesaSeleccionada && mesasConPedidos[mesaSeleccionada]
      ? mesasConPedidos[mesaSeleccionada]
      : []
    : pedidoLibre;

  const agregarProducto = (producto) => {
    if (tipoVenta !== 'Mesa') {
      setPedidoLibre([...pedidoLibre, producto]);
    }
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

      <div className="flex flex-1 overflow-hidden">
        <div className="w-3/4 p-4 overflow-y-auto">
          {tipoVenta === 'Mesa' && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-center mb-2">Selecciona una mesa para ver su pedido</h2>
              <hr className="mb-4" />
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 justify-items-center">
                {mesasDisponibles.map((mesa) => (
                  <button
                    key={mesa}
                    className={`border-2 rounded-lg p-6 font-semibold w-24 h-24 flex items-center justify-center ${
                      mesaSeleccionada === mesa ? 'bg-green-100 border-green-500' : 'border-green-500'
                    }`}
                    onClick={() => setMesaSeleccionada(mesa)}
                  >
                    Mesa {mesa}
                  </button>
                ))}
              </div>
            </div>
          )}

          {tipoVenta === 'Mesa' && mesaSeleccionada && (
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Pedido - Mesa {mesaSeleccionada}</h2>
              <h3 className="font-bold mb-2">Pedido Actual</h3>
              {pedido.length === 0 ? (
                <p className="text-gray-500">No hay items en el pedido</p>
              ) : (
                <div>
                  {pedido.map((item, index) => (
                    <div key={index} className="flex justify-between mb-1">
                      <span>{item.nombre}</span>
                      <span className="text-red-600">S/ {item.precio.toFixed(2)}</span>
                    </div>
                  ))}
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>TOTAL</span>
                    <span className="text-red-600">S/ {total.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {(tipoVenta !== 'Mesa') && (
            <>
              <div className="flex space-x-4 mb-4 border-b">
                {['Arroces', 'Tallarines', 'Pollos', 'Cerdos', 'Entradas', 'Sopas', 'Especiales'].map((cat) => (
                  <button
                    key={cat}
                    className={`px-3 py-1 ${
                      cat === 'Arroces' ? 'font-bold border-b-2 border-black' : 'text-gray-500'
                    }`}
                  >
                    {cat}
                  </button>
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
            </>
          )}
        </div>

        {/* Detalle Pedido */}
        <div className="w-1/4 p-4 bg-gray-50 border-l overflow-y-auto">
          <div className="mb-4">
            <h3 className="font-bold mb-2">Tipo de Venta</h3>
            <div className="grid grid-cols-3 gap-2">
              {['Delivery', 'Para Llevar', 'Mesa'].map((tipo) => (
                <button
                  key={tipo}
                  onClick={() => setTipoVenta(tipo)}
                  className={`p-2 rounded border ${
                    tipoVenta === tipo ? 'bg-black text-white' : 'bg-white'
                  }`}
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
            {tipoVenta === 'Mesa' && (
              <select
                className="mt-2 w-full p-2 border rounded"
                value={mesaSeleccionada || ''}
                onChange={(e) => setMesaSeleccionada(Number(e.target.value))}
              >
                <option value="" disabled>Seleccionar mesa</option>
                {mesasDisponibles.map((mesa) => (
                  <option key={mesa} value={mesa}>Mesa {mesa}</option>
                ))}
              </select>
            )}
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
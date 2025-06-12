import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mesas = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  status: i >= 10 ? 'Ocupado' : 'Libre',
  capacidad: 2,
}));

const platos = [
  'Arroz Chaufa de Pollo',
  'Arroz Chaufa Especial',
  'Arroz Chaufa de Carne',
  'Arroz Chaufa de Cerdo',
  'Tallarin Saltado de Pollo',
];

export default function TabletMozo() {
  const navigate = useNavigate();
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [pedido, setPedido] = useState([]);

  const agregarPlato = (plato) => {
    setPedido([...pedido, plato]);
  };

  const aumentarCantidad = (plato) => {
    setPedido([...pedido, plato]);
  };

  const disminuirCantidad = (plato) => {
    const index = pedido.lastIndexOf(plato);
    if (index !== -1) {
      const nuevoPedido = [...pedido];
      nuevoPedido.splice(index, 1);
      setPedido(nuevoPedido);
    }
  };

  const calcularTotal = () => pedido.length * 18;

  const resumenPedido = pedido.reduce((acc, plato) => {
    acc[plato] = (acc[plato] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header común */}
      <div className="bg-red-700 text-white px-4 py-3 flex items-center justify-between">
        <button
        onClick={() => {
            mesaSeleccionada ? setMesaSeleccionada(null) : navigate('/');
        }}
        className="text-white text-xl font-bold"
        >
        ←
        </button>

        <h1 className="text-xl font-semibold">
          Tablet Mozo - {mesaSeleccionada ? 'Realizar Pedido' : 'Chifa Imperio'}
        </h1>
        <div className="w-6" /> {/* Placeholder para alinear el título */}
      </div>

      <div className="p-4 max-w-screen-lg mx-auto text-center">
        {!mesaSeleccionada ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Selecciona una mesa para realizar el pedido</h2>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {mesas.map((mesa) => (
                <button
                  key={mesa.id}
                  className={`border rounded-xl p-4 shadow-sm ${
                    mesa.status === 'Libre' ? 'border-green-500' : 'border-red-500'
                  }`}
                  style={{ borderColor: 'rgba(0,0,0,0.11)' }}
                  disabled={mesa.status !== 'Libre'}
                  onClick={() => setMesaSeleccionada(mesa.id)}
                >
                  <div className="text-lg font-semibold">Mesa {mesa.id}</div>
                  <div
                    className={`mt-2 rounded-full px-3 py-1 text-white text-sm ${
                      mesa.status === 'Libre' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {mesa.status}
                  </div>
                  <div className="mt-1 text-sm">👥 {mesa.capacidad}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Pedido - Mesa {mesaSeleccionada}</h2>
            <input
              type="text"
              placeholder="Buscar plato..."
              className="mb-4 px-4 py-2 border rounded w-full md:w-1/2"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {platos.map((plato, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl shadow-md border"
                  style={{ borderColor: 'rgba(0,0,0,0.11)' }}
                >
                  <h3 className="font-semibold mb-2">{plato}</h3>
                  <p className="text-red-600 font-bold mb-2">S/ 18.00</p>
                  <button
                    onClick={() => agregarPlato(plato)}
                    className="bg-black text-white px-4 py-1 rounded"
                  >
                    + Agregar
                  </button>
                </div>
              ))}
            </div>

            <div
              className="mt-8 p-4 rounded-xl text-left shadow-md border"
              style={{ borderColor: 'rgba(0,0,0,0.11)' }}
            >
              <h3 className="text-lg font-bold mb-2">Pedido Actual</h3>
              {Object.entries(resumenPedido).map(([plato, cantidad], i) => (
                <div key={i} className="flex justify-between items-center mb-2">
                  <span>{plato}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => disminuirCantidad(plato)}
                      className="bg-gray-300 px-2 rounded"
                    >
                      -
                    </button>
                    <span>{cantidad}</span>
                    <button
                      onClick={() => aumentarCantidad(plato)}
                      className="bg-gray-300 px-2 rounded"
                    >
                      +
                    </button>
                    <span className="ml-4">S/ {(cantidad * 18).toFixed(2)}</span>
                  </div>
                </div>
              ))}
              <div className="mt-2 font-bold flex justify-between">
                <span>TOTAL</span>
                <span>S/ {calcularTotal().toFixed(2)}</span>
              </div>
              <button className="mt-4 w-full bg-red-600 text-white py-2 rounded">
                Mandar a Cocina
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

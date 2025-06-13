import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mesas = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
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
  const [tipoPedido, setTipoPedido] = useState('mesa');
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [pedido, setPedido] = useState([]);
  const [modoCrearPedidoLlevar, setModoCrearPedidoLlevar] = useState(false);
  const [pedidosParaLlevar, setPedidosParaLlevar] = useState([]);
  const [pedidosPorMesa, setPedidosPorMesa] = useState({});
  const [estadoMesas, setEstadoMesas] = useState(() => {
    const estadosIniciales = {};
    mesas.forEach(m => estadosIniciales[m.id] = 'Libre');
    return estadosIniciales;
  });

  const agregarPlato = (plato) => setPedido([...pedido, plato]);

  const aumentarCantidad = (plato) => setPedido([...pedido, plato]);

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

  const mostrarFormularioPedido =
    (tipoPedido === 'mesa' && mesaSeleccionada) ||
    (tipoPedido === 'llevar' && modoCrearPedidoLlevar);

  const marcarComoServido = (plato) => {
    setPedidosPorMesa((prev) => {
      const mesa = prev[mesaSeleccionada] || { servidos: [], pendientes: [], adicionales: [] };
      return {
        ...prev,
        [mesaSeleccionada]: {
          ...mesa,
          pendientes: mesa.pendientes.filter((p) => p !== plato),
          servidos: [...mesa.servidos, plato],
        },
      };
    });
  };

  const agregarAdicional = (plato) => {
    setPedidosPorMesa((prev) => {
      const mesa = prev[mesaSeleccionada] || { servidos: [], pendientes: [], adicionales: [] };
      return {
        ...prev,
        [mesaSeleccionada]: {
          ...mesa,
          adicionales: [...mesa.adicionales, plato],
        },
      };
    });
  };

  const mandarAdicionalesACocina = () => {
    setPedidosPorMesa((prev) => {
      const mesa = prev[mesaSeleccionada];
      return {
        ...prev,
        [mesaSeleccionada]: {
          ...mesa,
          pendientes: [...mesa.pendientes, ...mesa.adicionales],
          adicionales: [],
        },
      };
    });
  };

  const mandarPedidoInicial = () => {
    if (tipoPedido === 'mesa') {
      setPedidosPorMesa((prev) => ({
        ...prev,
        [mesaSeleccionada]: {
          servidos: [],
          pendientes: pedido,
          adicionales: [],
        },
      }));
      setEstadoMesas(prev => ({ ...prev, [mesaSeleccionada]: 'Ocupado' }));
    } else {
      const nuevoId = pedidosParaLlevar.length + 1;
      setPedidosParaLlevar([...pedidosParaLlevar, { id: nuevoId, items: pedido }]);
    }
    setPedido([]);
    setModoCrearPedidoLlevar(false);
    setMesaSeleccionada(null);
  };

  const desocuparMesa = () => {
    setPedidosPorMesa((prev) => {
      const actualizado = { ...prev };
      delete actualizado[mesaSeleccionada];
      return actualizado;
    });
    setEstadoMesas(prev => ({ ...prev, [mesaSeleccionada]: 'Libre' }));
    setMesaSeleccionada(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-red-700 text-white px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => {
            if (tipoPedido === 'mesa') {
              mesaSeleccionada ? setMesaSeleccionada(null) : navigate('/');
            } else if (modoCrearPedidoLlevar) {
              setModoCrearPedidoLlevar(false);
              setPedido([]);
            } else {
              navigate('/');
            }
          }}
          className="text-white text-xl font-bold"
        >
          ←
        </button>
        <h1 className="text-xl font-semibold">
          Tablet Mozo - {mostrarFormularioPedido ? 'Realizar Pedido' : 'Chifa Imperio'}
        </h1>
        <div className="w-6" />
      </div>

      <div className="p-4 max-w-screen-lg mx-auto text-center">
        <div className="mb-4 flex justify-center gap-4">
          <button
            onClick={() => {
              setTipoPedido('mesa');
              setMesaSeleccionada(null);
              setModoCrearPedidoLlevar(false);
              setPedido([]);
            }}
            className={`px-4 py-2 rounded ${
              tipoPedido === 'mesa' ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            Pedido para Mesa
          </button>
          <button
            onClick={() => {
              setTipoPedido('llevar');
              setMesaSeleccionada(null);
              setModoCrearPedidoLlevar(false);
              setPedido([]);
            }}
            className={`px-4 py-2 rounded ${
              tipoPedido === 'llevar' ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            Pedido para Llevar
          </button>
        </div>

        {!mostrarFormularioPedido ? (
          tipoPedido === 'mesa' ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Selecciona una mesa</h2>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {mesas.map((mesa) => (
                  <button
                    key={mesa.id}
                    className="border rounded-xl p-4 shadow-sm relative"
                    onClick={() => setMesaSeleccionada(mesa.id)}
                  >
                    <div className="text-lg font-semibold">Mesa {mesa.id}</div>
                    {pedidosPorMesa[mesa.id]?.pendientes?.length > 0 && (
                      <span className="absolute top-1 right-1 w-3 h-3 bg-yellow-400 rounded-full" />
                    )}
                    <div className={`mt-2 rounded-full px-3 py-1 text-white text-sm ${
                      estadoMesas[mesa.id] === 'Libre' ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {estadoMesas[mesa.id]}
                    </div>
                    <div className="mt-1 text-sm">👥 {mesa.capacidad}</div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">Pedidos para Llevar Pendientes</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {pedidosParaLlevar.map((pedido) => (
                  <div key={pedido.id} className="p-4 border rounded shadow">
                    <h3 className="font-semibold">Pedido #{pedido.id}</h3>
                    <ul className="text-sm mt-2">
                      {pedido.items.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  setModoCrearPedidoLlevar(true);
                  setPedido([]);
                }}
                className="mt-6 bg-red-700 text-white px-4 py-2 rounded"
              >
                + Nuevo Pedido Para Llevar
              </button>
            </>
          )
        ) : (
          <>
            {tipoPedido === 'mesa' && mesaSeleccionada && (
              <button
                onClick={desocuparMesa}
                className="mb-4 bg-gray-600 text-white px-4 py-2 rounded"
              >
                Desocupar Mesa
              </button>
            )}

            <h2 className="text-xl font-semibold mb-4">
              Pedido {tipoPedido === 'mesa' ? `- Mesa ${mesaSeleccionada}` : '- Para Llevar'}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {platos.map((plato, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl shadow-md border"
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

            <div className="p-4 rounded-xl shadow-md border text-left">
              <h3 className="text-lg font-bold mb-2">Pedido Actual</h3>
              {Object.entries(resumenPedido).map(([plato, cantidad], i) => (
                <div key={i} className="flex justify-between items-center mb-2">
                  <span>{plato}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => disminuirCantidad(plato)} className="bg-gray-300 px-2 rounded">-</button>
                    <span>{cantidad}</span>
                    <button onClick={() => aumentarCantidad(plato)} className="bg-gray-300 px-2 rounded">+</button>
                    <span className="ml-4">S/ {(cantidad * 18).toFixed(2)}</span>
                  </div>
                </div>
              ))}
              <div className="mt-2 font-bold flex justify-between">
                <span>TOTAL</span>
                <span>S/ {calcularTotal().toFixed(2)}</span>
              </div>
              <button
                className="mt-4 w-full bg-red-600 text-white py-2 rounded"
                onClick={mandarPedidoInicial}
              >
                Mandar a Cocina
              </button>
            </div>

            {tipoPedido === 'mesa' && pedidosPorMesa[mesaSeleccionada] && (
              <div className="mt-6 text-left">
                {['pendientes', 'servidos'].map((estado) => (
                  <div key={estado}>
                    <h3 className="mt-4 text-lg font-bold">
                      {estado === 'pendientes' ? 'Pendientes de Servir' : 'Servidos'}
                    </h3>
                    {(pedidosPorMesa[mesaSeleccionada]?.[estado] || []).map((plato, idx) => (
                      <div key={idx} className="flex justify-between items-center my-2">
                        <span>{plato}</span>
                        {estado === 'pendientes' && (
                          <button
                            onClick={() => marcarComoServido(plato)}
                            className="text-sm bg-green-600 text-white px-3 py-1 rounded"
                          >
                            Marcar como Servido
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ))}

                <h3 className="mt-6 text-lg font-bold">Agregar Plato Adicional</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {platos.map((plato, index) => (
                    <div key={index} className="p-3 border rounded shadow">
                      <span>{plato}</span>
                      <button
                        onClick={() => agregarAdicional(plato)}
                        className="block mt-2 bg-black text-white px-3 py-1 rounded"
                      >
                        + Agregar
                      </button>
                    </div>
                  ))}
                </div>
                {pedidosPorMesa[mesaSeleccionada]?.adicionales?.length > 0 && (
                  <button
                    onClick={mandarAdicionalesACocina}
                    className="mt-4 w-full bg-red-700 text-white py-2 rounded"
                  >
                    Mandar Adicionales a Cocina
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

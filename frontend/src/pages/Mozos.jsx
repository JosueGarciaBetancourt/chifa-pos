import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import productosUnifiedService from "../services/productosUnifiedService";

const mesas = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  capacidad: 2,
}));

export default function TabletMozo() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [tipoPedido, setTipoPedido] = useState("mesa");
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [pedido, setPedido] = useState([]);
  const [modoCrearPedidoLlevar, setModoCrearPedidoLlevar] = useState(false);
  const [pedidosParaLlevar, setPedidosParaLlevar] = useState([]);
  const [pedidosPorMesa, setPedidosPorMesa] = useState({});
  const [estadoMesas, setEstadoMesas] = useState(() => {
    const estadosIniciales = {};
    mesas.forEach((m) => (estadosIniciales[m.id] = "Libre"));
    return estadosIniciales;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const productosData = await productosUnifiedService.getProductos();

        if (!productosData || productosData.length === 0) {
          setProductos([
            { id: 1, nombre: "Arroz Chaufa", precio: 12.5 },
            { id: 2, nombre: "Tallarin Saltado", precio: 13.0 },
            { id: 3, nombre: "Pollo Tipakay", precio: 14.5 },
          ]);
        } else {
          setProductos(productosData);
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setProductos([
          { id: 1, nombre: "Arroz Chaufa", precio: 12.5 },
          { id: 2, nombre: "Tallarin Saltado", precio: 13.0 },
          { id: 3, nombre: "Pollo Tipakay", precio: 14.5 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const socketRef = useSocket((eventoRecibido) => {
    console.log("📥 Evento recibido en mozo:", eventoRecibido);

    // Manejo de actualizaciones de estado
    if (
      eventoRecibido?.estado &&
      eventoRecibido?.id &&
      !eventoRecibido?.items &&
      eventoRecibido?.tipo
    ) {
      console.log("🔄 Procesando actualización de estado:", eventoRecibido);

      // Actualizar pedidos de mesa
      if (eventoRecibido.tipo === "mesa") {
        const mesaId = parseInt(eventoRecibido.cliente.match(/\d+/)?.[0]);
        if (!mesaId) return;

        setPedidosPorMesa((prev) => {
          const mesa = prev[mesaId];
          if (!mesa) return prev;

          const platosActualizados = mesa.platos.map((plato) => {
            if (plato.pedidoId === eventoRecibido.id) {
              return {
                ...plato,
                estado: eventoRecibido.estado,
                fechaActualizacion: new Date(),
              };
            }
            return plato;
          });

          const todosListos = platosActualizados.every(
            (plato) => plato.estado === "listo"
          );
          const algunoPreparando = platosActualizados.some(
            (plato) => plato.estado === "preparando"
          );

          let nuevoEstadoMesa = "Ocupado";
          if (todosListos && platosActualizados.length > 0) {
            nuevoEstadoMesa = "Listo";
          } else if (algunoPreparando) {
            nuevoEstadoMesa = "Preparando";
          }

          setEstadoMesas((prevEstados) => ({
            ...prevEstados,
            [mesaId]: nuevoEstadoMesa,
          }));

          if (eventoRecibido.estado === "listo") {
            showNotification(`🍽️ Mesa ${mesaId} - Pedido listo para servir!`);
          } else if (eventoRecibido.estado === "preparando") {
            showNotification(`👨‍🍳 Mesa ${mesaId} - Pedido en preparación`);
          }

          return {
            ...prev,
            [mesaId]: {
              ...mesa,
              platos: platosActualizados,
            },
          };
        });
      }

      // Actualizar pedidos para llevar - CORRECCIÓN PRINCIPAL
      if (eventoRecibido.tipo === "llevar") {
        setPedidosParaLlevar((prev) =>
          prev.map((pedido) => {
            if (pedido.id === eventoRecibido.id) {
              // Actualizamos todo el objeto del pedido, no solo el estado
              return {
                ...pedido,
                ...eventoRecibido,
                estado: eventoRecibido.estado,
                items: pedido.items, // Mantenemos los items originales
              };
            }
            return pedido;
          })
        );

        if (eventoRecibido.estado === "listo") {
          showNotification(
            `🥡 Pedido para llevar #${eventoRecibido.numero} está listo!`
          );
        }
      }

      return;
    }

    // Manejo de pedidos nuevos
    if (eventoRecibido?.items && eventoRecibido?.tipo === "mesa") {
      const mesaId = parseInt(eventoRecibido.cliente.match(/\d+/)?.[0]);
      if (!mesaId) return;

      setPedidosPorMesa((prev) => {
        const mesa = prev[mesaId] || { platos: [], adicionales: [] };

        const nuevosPlatos = eventoRecibido.items.map((item, index) => ({
          ...item,
          platoId: `${eventoRecibido.id}-${index}`,
          pedidoId: eventoRecibido.id,
          estado: eventoRecibido.estado || "pendiente",
          fechaCreacion: new Date(),
          fechaActualizacion: new Date(),
        }));

        return {
          ...prev,
          [mesaId]: {
            ...mesa,
            platos: [...mesa.platos, ...nuevosPlatos],
            adicionales: mesa.adicionales || [],
          },
        };
      });

      setEstadoMesas((prev) => ({
        ...prev,
        [mesaId]: "Ocupado",
      }));
    }
  });

  const showNotification = (mensaje) => {
    console.log("🔔", mensaje);
    if (window.Notification && Notification.permission === "granted") {
      new Notification("Chifa Imperio", {
        body: mensaje,
        icon: "/favicon.ico",
      });
    }
  };

  const marcarMesaComoServida = () => {
    if (mesaSeleccionada) {
      setEstadoMesas((prev) => ({
        ...prev,
        [mesaSeleccionada]: "Ocupado",
      }));

      setPedidosPorMesa((prev) => {
        const mesa = prev[mesaSeleccionada];
        if (mesa) {
          return {
            ...prev,
            [mesaSeleccionada]: {
              ...mesa,
              platos: mesa.platos.filter((plato) => plato.estado !== "listo"),
            },
          };
        }
        return prev;
      });

      showNotification(`✅ Mesa ${mesaSeleccionada} marcada como servida`);
    }
  };

  const marcarPlatoComoServido = (platoId) => {
    setPedidosPorMesa((prev) => {
      const mesa = prev[mesaSeleccionada];
      if (!mesa) return prev;

      const platosActualizados = mesa.platos.filter(
        (plato) => plato.platoId !== platoId
      );

      return {
        ...prev,
        [mesaSeleccionada]: {
          ...mesa,
          platos: platosActualizados,
        },
      };
    });

    showNotification(`✅ Plato servido en Mesa ${mesaSeleccionada}`);
  };

  const getEstadoPlatoColor = (estado) => {
    switch (estado) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "preparando":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "listo":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const marcarPedidoLlevarComoEntregado = (pedidoId) => {
    setPedidosParaLlevar((prev) =>
      prev.filter((pedido) => pedido.id !== pedidoId)
    );
    showNotification(`✅ Pedido para llevar #${pedidoId} entregado`);
  };

  const getEstadoPlatoTexto = (estado) => {
    switch (estado) {
      case "pendiente":
        return "⏳ Pendiente";
      case "preparando":
        return "👨‍🍳 Preparando";
      case "listo":
        return "✅ Listo";
      default:
        return "❓ Desconocido";
    }
  };

  const agregarPlato = (producto) => setPedido([...pedido, producto]);
  const aumentarCantidad = (producto) => setPedido([...pedido, producto]);

  const disminuirCantidad = (producto) => {
    const index = pedido.findIndex((p) => p.id === producto.id);
    if (index !== -1) {
      const nuevoPedido = [...pedido];
      nuevoPedido.splice(index, 1);
      setPedido(nuevoPedido);
    }
  };

  const calcularTotal = () =>
    pedido.reduce((acc, item) => acc + item.precio, 0);

  const resumenPedido = pedido.reduce((acc, producto) => {
    const key = producto.id;
    acc[key] = acc[key] || { producto, cantidad: 0 };
    acc[key].cantidad += 1;
    return acc;
  }, {});

  const agregarAdicional = (producto) => {
    setPedidosPorMesa((prev) => {
      const mesa = prev[mesaSeleccionada] || {
        platos: [],
        adicionales: [],
      };
      return {
        ...prev,
        [mesaSeleccionada]: {
          ...mesa,
          adicionales: [...mesa.adicionales, producto],
        },
      };
    });
  };

  const mandarAdicionalesACocina = () => {
    const mesa = pedidosPorMesa[mesaSeleccionada];
    if (mesa && mesa.adicionales.length > 0) {
      const pedidoAdicional = {
        id: Date.now(),
        numero: `#${Date.now() % 10000}`,
        cliente: `Mesa ${mesaSeleccionada}`,
        items: [...mesa.adicionales],
        estado: "pendiente",
        tipo: "mesa",
        hora: new Date().toLocaleTimeString(),
        total: mesa.adicionales.reduce((acc, item) => acc + item.precio, 0),
      };

      if (socketRef.current) {
        socketRef.current.emit("nuevo-pedido", pedidoAdicional);
        console.log("📤 Pedido adicional enviado a cocina:", pedidoAdicional);
      }

      const nuevosPlatos = mesa.adicionales.map((item, index) => ({
        ...item,
        platoId: `${pedidoAdicional.id}-${index}`,
        pedidoId: pedidoAdicional.id,
        estado: "pendiente",
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      }));

      setPedidosPorMesa((prev) => {
        const mesaActual = prev[mesaSeleccionada];
        return {
          ...prev,
          [mesaSeleccionada]: {
            ...mesaActual,
            platos: [...mesaActual.platos, ...nuevosPlatos],
            adicionales: [],
          },
        };
      });

      showNotification(
        `📤 Pedido adicional enviado - Mesa ${mesaSeleccionada}`
      );
    }
  };

  const mandarPedidoInicial = () => {
    const pedidoId = Date.now();

    const pedidoData = {
      id: pedidoId,
      numero: `#${pedidoId % 10000}`,
      cliente:
        tipoPedido === "mesa" ? `Mesa ${mesaSeleccionada}` : "Cliente Delivery",
      items: [...pedido],
      estado: "pendiente",
      tipo: tipoPedido,
      hora: new Date().toLocaleTimeString(),
      total: calcularTotal(),
    };

    if (socketRef.current) {
      socketRef.current.emit("nuevo-pedido", pedidoData);
      console.log("📤 Pedido enviado a cocina:", pedidoData);
    }

    if (tipoPedido === "mesa") {
      const nuevosPlatos = pedido.map((item, index) => ({
        ...item,
        platoId: `${pedidoId}-${index}`,
        pedidoId: pedidoId,
        estado: "pendiente",
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      }));

      setPedidosPorMesa((prev) => ({
        ...prev,
        [mesaSeleccionada]: {
          platos: nuevosPlatos,
          adicionales: [],
        },
      }));
      setEstadoMesas((prev) => ({ ...prev, [mesaSeleccionada]: "Ocupado" }));
    } else {
      // CORRECCIÓN: Usar el mismo ID que se envió a cocina
      setPedidosParaLlevar((prev) => [
        ...prev,
        {
          id: pedidoId, // Usamos el mismo ID que se envió a cocina
          numero: pedidoData.numero,
          items: pedido,
          estado: "pendiente",
          tipo: "llevar",
          hora: pedidoData.hora,
          total: pedidoData.total,
        },
      ]);
    }

    setPedido([]);
    setModoCrearPedidoLlevar(false);
    setMesaSeleccionada(null);

    showNotification(`📤 Pedido enviado a cocina: ${pedidoData.numero}`);
  };

  const desocuparMesa = () => {
    setPedidosPorMesa((prev) => {
      const actualizado = { ...prev };
      delete actualizado[mesaSeleccionada];
      return actualizado;
    });
    setEstadoMesas((prev) => ({ ...prev, [mesaSeleccionada]: "Libre" }));
    showNotification(`🏠 Mesa ${mesaSeleccionada} desocupada`);
    setMesaSeleccionada(null);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Libre":
        return "bg-green-500";
      case "Ocupado":
        return "bg-red-500";
      case "Preparando":
        return "bg-yellow-500";
      case "Listo":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const agruparPlatosPorEstado = (platos) => {
    return platos.reduce((acc, plato) => {
      const estado = plato.estado || "pendiente";
      if (!acc[estado]) acc[estado] = [];
      acc[estado].push(plato);
      return acc;
    }, {});
  };

  const mostrarFormularioPedido =
    tipoPedido === "llevar" ? modoCrearPedidoLlevar : mesaSeleccionada !== null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-red-700 text-white px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => {
            if (tipoPedido === "mesa") {
              mesaSeleccionada ? setMesaSeleccionada(null) : navigate("/");
            } else if (modoCrearPedidoLlevar) {
              setModoCrearPedidoLlevar(false);
              setPedido([]);
            } else {
              navigate("/");
            }
          }}
          className="text-white text-xl font-bold"
        >
          ←
        </button>
        <h1 className="text-xl font-semibold">
          Tablet Mozo -{" "}
          {mostrarFormularioPedido ? "Realizar Pedido" : "Chifa Imperio"}
        </h1>
        <div className="w-6" />
      </div>

      <div className="p-4 max-w-screen-lg mx-auto text-center">
        <div className="mb-4 flex justify-center gap-4">
          <button
            onClick={() => {
              setTipoPedido("mesa");
              setMesaSeleccionada(null);
              setModoCrearPedidoLlevar(false);
              setPedido([]);
            }}
            className={`px-4 py-2 rounded ${
              tipoPedido === "mesa" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Pedido para Mesa
          </button>
          <button
            onClick={() => {
              setTipoPedido("llevar");
              setMesaSeleccionada(null);
              setModoCrearPedidoLlevar(false);
              setPedido([]);
            }}
            className={`px-4 py-2 rounded ${
              tipoPedido === "llevar" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Pedido para Llevar
          </button>
        </div>

        {!mostrarFormularioPedido ? (
          tipoPedido === "mesa" ? (
            <>
              <h2 className="text-xl font-semibold mb-4">
                Selecciona una mesa
              </h2>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {mesas.map((mesa) => (
                  <button
                    key={mesa.id}
                    className="border rounded-xl p-4 shadow-sm relative"
                    onClick={() => setMesaSeleccionada(mesa.id)}
                  >
                    <div className="text-lg font-semibold">Mesa {mesa.id}</div>
                    {pedidosPorMesa[mesa.id]?.platos?.some(
                      (plato) => plato.estado === "preparando"
                    ) && (
                      <span className="absolute top-1 right-1 w-3 h-3 bg-yellow-400 rounded-full" />
                    )}
                    {estadoMesas[mesa.id] === "Listo" && (
                      <span className="absolute top-1 left-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                    )}
                    <div
                      className={`mt-2 rounded-full px-3 py-1 text-white text-sm ${getEstadoColor(
                        estadoMesas[mesa.id]
                      )}`}
                    >
                      {estadoMesas[mesa.id]}
                    </div>
                    <div className="mt-1 text-sm">👥 {mesa.capacidad}</div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">
                Pedidos para Llevar Pendientes
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {pedidosParaLlevar.map((pedido) => (
                  <div
                    key={pedido.id}
                    className={`p-4 border rounded shadow ${
                      pedido.estado === "listo"
                        ? "bg-green-100 border-green-400"
                        : pedido.estado === "preparando"
                        ? "bg-blue-100 border-blue-400"
                        : "bg-white"
                    }`}
                  >
                    <h3 className="font-semibold">
                      Pedido {pedido.numero}
                      <span
                        className={`ml-2 px-2 py-1 rounded text-xs ${getEstadoPlatoColor(
                          pedido.estado
                        )}`}
                      >
                        {getEstadoPlatoTexto(pedido.estado)}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600">{pedido.hora}</p>
                    <ul className="text-sm mt-2">
                      {pedido.items.map((item, i) => (
                        <li key={i}>• {item.nombre}</li>
                      ))}
                    </ul>
                    <p className="mt-2 font-semibold">
                      Total: S/ {pedido.total.toFixed(2)}
                    </p>
                    {pedido.estado === "listo" && (
                      <button
                        onClick={() =>
                          marcarPedidoLlevarComoEntregado(pedido.id)
                        }
                        className="mt-2 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                      >
                        Marcar como Entregado
                      </button>
                    )}
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
            <div className="mb-4 flex justify-center gap-4">
              {tipoPedido === "mesa" && mesaSeleccionada && (
                <>
                  <button
                    onClick={desocuparMesa}
                    className="bg-gray-600 text-white px-4 py-2 rounded"
                  >
                    Desocupar Mesa
                  </button>
                  {estadoMesas[mesaSeleccionada] === "Listo" && (
                    <button
                      onClick={marcarMesaComoServida}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Marcar como Servida
                    </button>
                  )}
                </>
              )}
            </div>

            <h2 className="text-xl font-semibold mb-4">
              Pedido{" "}
              {tipoPedido === "mesa"
                ? `- Mesa ${mesaSeleccionada}`
                : "- Para Llevar"}
            </h2>

            {tipoPedido === "mesa" &&
              mesaSeleccionada &&
              pedidosPorMesa[mesaSeleccionada] && (
                <div className="mb-4 p-4 bg-gray-100 rounded-lg text-left">
                  <h3 className="font-semibold mb-3 text-center">
                    Estado del Pedido:
                  </h3>

                  {(() => {
                    const mesa = pedidosPorMesa[mesaSeleccionada];
                    const platosAgrupados = agruparPlatosPorEstado(
                      mesa.platos || []
                    );

                    return Object.entries(platosAgrupados).map(
                      ([estado, platos]) => (
                        <div key={estado} className="mb-3">
                          <h4 className="font-medium text-sm mb-2 capitalize">
                            {getEstadoPlatoTexto(estado)} ({platos.length})
                          </h4>
                          <div className="space-y-1">
                            {platos.map((plato) => (
                              <div
                                key={plato.platoId}
                                className={`flex justify-between items-center p-2 rounded border text-sm ${getEstadoPlatoColor(
                                  plato.estado
                                )}`}
                              >
                                <span>{plato.nombre}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs">
                                    {getEstadoPlatoTexto(plato.estado)}
                                  </span>
                                  {plato.estado === "listo" && (
                                    <button
                                      onClick={() =>
                                        marcarPlatoComoServido(plato.platoId)
                                      }
                                      className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
                                    >
                                      Servir
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    );
                  })()}

                  {pedidosPorMesa[mesaSeleccionada].adicionales?.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <h4 className="font-medium text-sm mb-2">
                        Adicionales (
                        {pedidosPorMesa[mesaSeleccionada].adicionales.length})
                      </h4>
                      <div className="space-y-1">
                        {pedidosPorMesa[mesaSeleccionada].adicionales.map(
                          (adicional, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-2 rounded border bg-orange-50 text-orange-800 border-orange-300 text-sm"
                            >
                              <span>{adicional.nombre}</span>
                              <span className="text-xs">Para enviar</span>
                            </div>
                          )
                        )}
                      </div>
                      <button
                        onClick={mandarAdicionalesACocina}
                        className="mt-2 bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600"
                      >
                        Enviar Adicionales a Cocina
                      </button>
                    </div>
                  )}
                </div>
              )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {loading ? (
                <p className="col-span-full text-center">Cargando productos…</p>
              ) : (
                productos.map((producto) => (
                  <div
                    key={producto.id}
                    className="p-4 rounded-xl shadow-md border"
                  >
                    <h3 className="font-semibold mb-2">{producto.nombre}</h3>
                    <p className="text-red-600 font-bold mb-2">
                      S/ {producto.precio.toFixed(2)}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => agregarPlato(producto)}
                        className="bg-black text-white px-3 py-1 rounded text-sm"
                      >
                        + Agregar
                      </button>
                      {tipoPedido === "mesa" &&
                        mesaSeleccionada &&
                        pedidosPorMesa[mesaSeleccionada] && (
                          <button
                            onClick={() => agregarAdicional(producto)}
                            className="bg-orange-500 text-white px-3 py-1 rounded text-sm"
                          >
                            + Adicional
                          </button>
                        )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 rounded-xl shadow-md border text-left">
              <h3 className="text-lg font-bold mb-2">Pedido Actual</h3>
              {Object.values(resumenPedido).map(({ producto, cantidad }, i) => (
                <div key={i} className="flex justify-between items-center mb-2">
                  <span>{producto.nombre}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => disminuirCantidad(producto)}
                      className="bg-gray-300 px-2 rounded"
                    >
                      -
                    </button>
                    <span>{cantidad}</span>
                    <button
                      onClick={() => aumentarCantidad(producto)}
                      className="bg-gray-300 px-2 rounded"
                    >
                      +
                    </button>
                    <span className="ml-4">
                      S/ {(cantidad * producto.precio).toFixed(2)}
                    </span>
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
                disabled={pedido.length === 0}
              >
                Mandar a Cocina
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

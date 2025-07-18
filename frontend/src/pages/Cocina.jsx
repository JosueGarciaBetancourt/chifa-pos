import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import HeaderCocina from "../components/features/cocina/HeaderCocina";
import ResumenEstados from "../components/features/cocina/ResumenEstados";
import KanbanBoard from "../components/features/cocina/KanbanBoard";

const Cocina = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);

  // 🔥 MEJORADO: Manejo más robusto del socket
  const socketRef = useSocket((eventoRecibido) => {
    console.log("📥 Evento recibido en cocina:", eventoRecibido);

    // 🔥 CAMBIO: Verificar si es un pedido nuevo (con items) o actualización de estado
    if (eventoRecibido.estado && eventoRecibido.id && !eventoRecibido.items) {
      // Es una actualización de estado desde otra instancia de cocina
      console.log("🔄 Actualizando estado de pedido:", eventoRecibido);

      setPedidos((prev) =>
        prev.map((pedido) =>
          pedido.id === eventoRecibido.id
            ? {
                ...pedido,
                estado: eventoRecibido.estado,
                fechaActualizacion: new Date(),
              }
            : pedido
        )
      );
      return;
    }

    // Es un pedido nuevo (viene con items)
    if (eventoRecibido.items) {
      const nuevo = {
        ...eventoRecibido,
        id:
          typeof eventoRecibido.id === "string"
            ? parseInt(eventoRecibido.id, 10)
            : eventoRecibido.id,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
        tiempoEspera: calcularTiempoEspera(new Date()),
      };

      console.log("📥 Nuevo pedido procesado:", nuevo);

      setPedidos((prev) => {
        // Evitar duplicados
        const existe = prev.some((p) => p.id === nuevo.id);
        if (existe) {
          console.warn("⚠️ Pedido duplicado ignorado:", nuevo.id);
          return prev;
        }
        return [...prev, nuevo];
      });

      showNotification(`🍽️ Nuevo pedido recibido: ${eventoRecibido.numero}`);
    }
  });

  // 🔥 MEJORADO: Función para mover pedidos con mejor manejo de errores
  const moverPedido = (pedidoId, nuevoEstado) => {
    console.log(`🎯 Moviendo pedido ${pedidoId} a estado ${nuevoEstado}`);

    // Usar función callback para obtener el estado más actualizado
    setPedidos((pedidosActuales) => {
      // Asegurar que el ID sea numérico para búsqueda consistente
      const idNumerico =
        typeof pedidoId === "string" ? parseInt(pedidoId, 10) : pedidoId;

      if (isNaN(idNumerico)) {
        console.warn(`❌ ID de pedido inválido: ${pedidoId}`);
        return pedidosActuales;
      }

      const pedidoExistente = pedidosActuales.find((p) => p.id === idNumerico);

      if (!pedidoExistente) {
        console.warn(`❌ Pedido con ID ${idNumerico} no encontrado`);
        console.log(
          `📋 Pedidos disponibles:`,
          pedidosActuales.map((p) => `${p.id} - ${p.numero}`)
        );
        return pedidosActuales;
      }

      // Evitar mover si ya está en el estado deseado
      if (pedidoExistente.estado === nuevoEstado) {
        console.info(
          `ℹ️ Pedido ${pedidoExistente.numero} ya está en estado ${nuevoEstado}`
        );
        return pedidosActuales;
      }

      const actualizaciones = {
        fechaActualizacion: new Date(),
      };

      if (nuevoEstado === "preparando") {
        actualizaciones.fechaPreparacion = new Date();
      } else if (nuevoEstado === "listo") {
        actualizaciones.fechaListo = new Date();
      }

      // 🔥 MEJORADO: Crear el evento para enviar al mozo
      const eventoParaMozo = {
        id: idNumerico,
        estado: nuevoEstado,
        tipo: pedidoExistente.tipo, // mesa o llevar
        cliente: pedidoExistente.cliente,
        numero: pedidoExistente.numero,
        ...actualizaciones,
      };

      // 🔁 Emitimos el cambio al mozo con el evento correcto
      if (socketRef?.current) {
        socketRef.current.emit("estadoPedidoActualizado", eventoParaMozo);
        console.log("📤 Estado enviado al mozo:", eventoParaMozo);
      }

      showNotification(`✅ ${pedidoExistente.numero} → ${nuevoEstado}`);

      // Retornar el nuevo estado actualizado
      return pedidosActuales.map((pedido) =>
        pedido.id === idNumerico
          ? {
              ...pedido,
              estado: nuevoEstado,
              ...actualizaciones,
            }
          : pedido
      );
    });
  };

  // 🔥 NUEVO: Función para eliminar pedidos completados
  const eliminarPedido = (pedidoId) => {
    console.log(`🗑️ Eliminando pedido ${pedidoId}`);

    setPedidos((prev) => {
      const idNumerico =
        typeof pedidoId === "string" ? parseInt(pedidoId, 10) : pedidoId;

      const pedidoAEliminar = prev.find((p) => p.id === idNumerico);

      if (pedidoAEliminar) {
        showNotification(`🗑️ Pedido ${pedidoAEliminar.numero} eliminado`);
        return prev.filter((p) => p.id !== idNumerico);
      }

      return prev;
    });
  };

  // 🔥 NUEVO: Función para obtener estadísticas de tiempo
  const obtenerEstadisticasTiempo = () => {
    const ahora = new Date();
    const estadisticas = {
      promedioEspera: 0,
      pedidoMasAntiguo: null,
      totalPedidos: pedidos.length,
    };

    if (pedidos.length > 0) {
      const tiemposEspera = pedidos.map((pedido) =>
        Math.floor((ahora - pedido.fechaCreacion) / (1000 * 60))
      );

      estadisticas.promedioEspera = Math.round(
        tiemposEspera.reduce((a, b) => a + b, 0) / tiemposEspera.length
      );

      estadisticas.pedidoMasAntiguo = Math.max(...tiemposEspera);
    }

    return estadisticas;
  };

  // ⏱️ Calcula minutos desde la creación
  const calcularTiempoEspera = (fechaCreacion) => {
    const ahora = new Date();
    const diffMin = Math.floor((ahora - fechaCreacion) / (1000 * 60));
    return `${diffMin} min`;
  };

  // ⌛ Actualiza el tiempo de espera cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setPedidos((prev) =>
        prev.map((pedido) => ({
          ...pedido,
          tiempoEspera: calcularTiempoEspera(pedido.fechaCreacion),
        }))
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // 🔙 Regresa al inicio
  const handleBack = () => {
    navigate("/");
  };

  // 🔢 Cuenta pedidos por estado
  const contarPorEstado = (estado) =>
    pedidos.filter((p) => p.estado === estado).length;

  // 🔥 MEJORADO: Función de notificación más robusta
  const showNotification = (mensaje) => {
    console.log("🔔", mensaje);

    // Notificación del navegador si está disponible
    if (window.Notification && Notification.permission === "granted") {
      new Notification("Chifa Imperio - Cocina", {
        body: mensaje,
        icon: "/favicon.ico",
      });
    }
  };

  // 🔥 NUEVO: Función para solicitar permisos de notificación
  useEffect(() => {
    if (window.Notification && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // 🔥 NUEVO: Función para manejar atajos de teclado
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Ctrl/Cmd + R para refrescar pedidos
      if ((event.ctrlKey || event.metaKey) && event.key === "r") {
        event.preventDefault();
        console.log("🔄 Refrescando vista de cocina...");
        // Aquí podrías agregar lógica para refrescar pedidos
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  // 🔥 NUEVO: Datos para el dashboard
  const estadisticas = obtenerEstadisticasTiempo();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HeaderCocina
        totalPendientes={contarPorEstado("pendiente")}
        totalPreparando={contarPorEstado("preparando")}
        totalListos={contarPorEstado("listo")}
        estadisticas={estadisticas}
        onBack={handleBack}
      />

      <ResumenEstados pedidos={pedidos} />

      <div className="flex-1 overflow-y-auto">
        <KanbanBoard
          pedidos={pedidos}
          onMoverPedido={moverPedido}
          onEliminarPedido={eliminarPedido}
        />
      </div>

      {/* 🔥 NUEVO: Indicador de conexión del socket */}
      <div className="fixed bottom-4 right-4 z-50">
        <div
          className={`w-3 h-3 rounded-full ${
            socketRef?.current?.connected ? "bg-green-500" : "bg-red-500"
          }`}
          title={
            socketRef?.current?.connected
              ? "Conectado al servidor"
              : "Desconectado del servidor"
          }
        />
      </div>
    </div>
  );
};

export default Cocina;

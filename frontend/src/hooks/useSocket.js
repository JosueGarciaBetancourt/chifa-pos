// src/hooks/useSocket.js
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function useSocket(onEventoRecibido) {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_WEBSOCKET_URL);

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket conectado:", socket.id);
    });

    socket.on("disconnect", () => {
      console.warn("⚠️ Socket desconectado");
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Error de conexión socket:", err.message);
    });

    // Escuchar eventos solo si hay handler
    if (typeof onEventoRecibido === "function") {
      // 🔥 CORRECCIÓN: Escuchar nuevos pedidos (de Mozos a Cocina)
      socket.on("pedido-nuevo", (pedido) => {
        console.log("📥 Nuevo pedido recibido por socket:", pedido);
        onEventoRecibido(pedido);
      });

      // 🔥 CORRECCIÓN: Escuchar actualizaciones de estado (de Cocina a Mozos)
      socket.on("estadoPedidoActualizado", (pedidoActualizado) => {
        console.log("📥 Estado actualizado recibido:", pedidoActualizado);
        onEventoRecibido(pedidoActualizado);
      });
    }

    return () => {
      if (socket) {
        socket.off("pedido-nuevo");
        socket.off("estadoPedidoActualizado");
        socket.disconnect();
        console.log("🛑 Socket cerrado desde useSocket");
      }
    };
  }, [onEventoRecibido]);

  return socketRef;
}

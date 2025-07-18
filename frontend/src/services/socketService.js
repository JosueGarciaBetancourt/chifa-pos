// frontend/src/services/socketService.js
import { io } from "socket.io-client";

let socket;

// Inicializa el socket si aún no existe
export const initSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_WEBSOCKET_URL, {
      transports: ["websocket"],
      reconnection: true,
    });

    socket.on("connect", () => {
      console.log("✅ Socket conectado:", socket.id);
    });

    socket.on("disconnect", () => {
      console.warn("❌ Socket desconectado");
    });
  }

  return socket;
};

// Emitir un nuevo pedido
export const emitNuevoPedido = (pedido) => {
  if (!socket) initSocket();
  socket.emit("nuevo-pedido", pedido);
};

// Suscribirse a nuevos pedidos (ej. para Cocina)
export const onNuevoPedido = (callback) => {
  if (!socket) initSocket();
  socket.on("pedido-nuevo", callback);
};

// Desconectar socket (si quieres cerrar al salir)
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// Emitir actualización de estado del pedido (de Cocina a Mozos)
export const emitEstadoActualizado = (pedidoActualizado) => {
  if (!socket) initSocket();
  socket.emit("estadoPedidoActualizado", pedidoActualizado);
};

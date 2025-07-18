import React from "react";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard = ({ pedidos, onMoverPedido }) => {
  const estados = ["pendiente", "preparando", "listo"];

  const getPedidosPorEstado = (estado) => {
    return pedidos.filter((p) => p.estado === estado);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, nuevoEstado) => {
    e.preventDefault();
    const pedidoIdRaw = e.dataTransfer.getData("text/plain");

    if (!pedidoIdRaw) {
      console.warn("❌ No se pudo obtener el ID del pedido");
      return;
    }

    // Convertir a número para búsqueda consistente
    const pedidoId = parseInt(pedidoIdRaw, 10);

    if (isNaN(pedidoId)) {
      console.warn(`❌ ID de pedido inválido: ${pedidoIdRaw}`);
      return;
    }

    const pedido = pedidos.find((p) => p.id === pedidoId);

    if (pedido && pedido.estado !== nuevoEstado) {
      onMoverPedido(pedidoId, nuevoEstado);
    }
  };

  return (
    <div className="p-6 w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        {estados.map((estado) => (
          <div
            key={estado}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, estado)}
            className="h-full"
          >
            <KanbanColumn
              estado={estado}
              pedidos={getPedidosPorEstado(estado)}
              onMoverPedido={onMoverPedido}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;

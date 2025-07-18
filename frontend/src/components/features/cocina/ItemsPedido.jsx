import React from "react";

const ItemsPedido = ({ items }) => {
  return (
    <div className="mb-4">
      <div className="text-sm font-medium text-gray-700 mb-2">
        Items del Pedido:
      </div>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li
            key={index}
            className="text-sm text-gray-600 flex items-center gap-1"
          >
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            {item.nombre} {item.cantidad ? `x${item.cantidad}` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsPedido;

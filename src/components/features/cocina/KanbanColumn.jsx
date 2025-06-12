import React from 'react';
import PedidoCard from './PedidoCard';

const KanbanColumn = ({ estado, pedidos, onMoverPedido }) => {
  const getEstadoConfig = (estado) => {
    const configs = {
      pendiente: {
        titulo: 'Pendientes',
        color: 'border-red-200 bg-red-50',
        headerColor: 'bg-red-100',
        badge: 'bg-red-500',
        icon: '⏰'
      },
      preparando: {
        titulo: 'Preparando',
        color: 'border-yellow-200 bg-yellow-50',
        headerColor: 'bg-yellow-100',
        badge: 'bg-yellow-500',
        icon: '👨‍🍳'
      },
      listo: {
        titulo: 'Listos',
        color: 'border-green-200 bg-green-50',
        headerColor: 'bg-green-100',
        badge: 'bg-green-500',
        icon: '✅'
      }
    };
    return configs[estado];
  };

  const config = getEstadoConfig(estado);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('ring-2', 'ring-blue-400', 'ring-opacity-50');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('ring-2', 'ring-blue-400', 'ring-opacity-50');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('ring-2', 'ring-blue-400', 'ring-opacity-50');
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md h-full transition-all duration-200"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header de Columna */}
      <div className={`${config.headerColor} p-4 rounded-t-lg border-b`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{config.icon}</span>
            <h3 className="font-semibold text-gray-800">{config.titulo}</h3>
          </div>
          <span className={`${config.badge} text-white px-2 py-1 rounded-full text-sm font-medium`}>
            {pedidos.length}
          </span>
        </div>
      </div>

      {/* Lista de Pedidos */}
      <div className="p-4 space-y-4 min-h-96">
        {pedidos.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <div className="text-4xl mb-2">{config.icon}</div>
            <p>No hay pedidos {config.titulo.toLowerCase()}</p>
          </div>
        ) : (
          pedidos.map(pedido => (
            <PedidoCard 
              key={pedido.id} 
              pedido={pedido} 
              onMover={onMoverPedido}
              estado={estado}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
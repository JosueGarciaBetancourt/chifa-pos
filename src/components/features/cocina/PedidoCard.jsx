import React, { useState } from 'react';
import { Clock, Phone, MapPin, GripVertical } from 'lucide-react';
import EstadoBadge from './EstadoBadge';
import InfoCliente from './InfoCliente';
import ItemsPedido from './ItemsPedido';

const PedidoCard = ({ pedido, onMover, estado }) => {
  const [isDragging, setIsDragging] = useState(false);

  const getButtonConfig = (estado) => {
    const configs = {
      pendiente: {
        texto: 'Iniciar Preparación',
        color: 'bg-yellow-500 hover:bg-yellow-600',
        accion: () => onMover(pedido.id, 'preparando')
      },
      preparando: {
        texto: 'Marcar Listo',
        color: 'bg-green-500 hover:bg-green-600',
        accion: () => onMover(pedido.id, 'listo')
      },
      listo: {
        texto: 'Notificar Entrega',
        color: 'bg-blue-500 hover:bg-blue-600',
        accion: () => {
          alert(`Notificando entrega del pedido ${pedido.numero}`);
          // Aquí podrías implementar la lógica de notificación real
        }
      }
    };
    return configs[estado];
  };

  const buttonConfig = getButtonConfig(estado);

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', pedido.id);
    e.dataTransfer.effectAllowed = 'move';
    
    // Crear una imagen de arrastre personalizada
    const dragImage = e.target.cloneNode(true);
    dragImage.style.transform = 'rotate(5deg)';
    dragImage.style.opacity = '0.8';
    e.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className={`
        bg-gray-50 border border-gray-200 rounded-lg p-4 
        hover:shadow-md transition-all duration-200 cursor-move
        ${isDragging ? 'opacity-50 scale-105 rotate-2' : ''}
        hover:border-blue-300 hover:bg-blue-50
      `}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Indicador de Drag */}
      <div className="flex items-center justify-between mb-2">
        <GripVertical className="w-4 h-4 text-gray-400" />
        <div className="text-xs text-gray-500">
          Arrastra para mover
        </div>
      </div>

      {/* Header del Pedido */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {pedido.tipo === 'delivery' ? (
            <Phone className="w-4 h-4 text-gray-500" />
          ) : (
            <MapPin className="w-4 h-4 text-gray-500" />
          )}
          <span className="font-semibold text-gray-800">{pedido.numero}</span>
        </div>
        <EstadoBadge estado={estado} />
      </div>

      {/* Información del Cliente */}
      <InfoCliente pedido={pedido} />

      {/* Items del Pedido */}
      <ItemsPedido items={pedido.items} />

      {/* Total */}
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold text-gray-800">
          Total: S/ {pedido.total.toFixed(2)}
        </div>
      </div>

      {/* Botón de Acción */}
      <button
        onClick={buttonConfig.accion}
        className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${buttonConfig.color}`}
        disabled={isDragging}
      >
        {buttonConfig.texto}
      </button>
    </div>
  );
};

export default PedidoCard;
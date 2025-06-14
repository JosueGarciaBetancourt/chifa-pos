import React from 'react';
import { Clock } from 'lucide-react';

const InfoCliente = ({ pedido }) => {
  return (
    <div className="mb-3">
      <div className="font-medium text-gray-800">{pedido.cliente}</div>
      {pedido.telefono && (
        <div className="text-sm text-gray-600">{pedido.telefono}</div>
      )}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Clock className="w-4 h-4" />
        <span>Hora: {pedido.hora}</span>
        <span className="text-orange-600 font-medium">{pedido.tiempoEspera}</span>
      </div>
    </div>
  );
};

export default InfoCliente;
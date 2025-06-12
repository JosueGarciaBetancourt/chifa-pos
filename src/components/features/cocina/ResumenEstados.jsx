import React from 'react';

const ResumenEstados = ({ pedidos }) => {
  const contarPorEstado = (estado) => {
    return pedidos.filter(p => p.estado === estado).length;
  };

  const getEstadoConfig = (estado) => {
    const configs = {
      pendiente: {
        titulo: 'Pendientes',
        color: 'border-red-200 bg-red-50',
        textColor: 'text-red-700',
        icon: '⏰'
      },
      preparando: {
        titulo: 'Preparando',
        color: 'border-yellow-200 bg-yellow-50',
        textColor: 'text-yellow-700',
        icon: '👨‍🍳'
      },
      listo: {
        titulo: 'Listos',
        color: 'border-green-200 bg-green-50',
        textColor: 'text-green-700',
        icon: '✅'
      }
    };
    return configs[estado];
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
        {['pendiente', 'preparando', 'listo'].map(estado => {
          const config = getEstadoConfig(estado);
          const count = contarPorEstado(estado);
          
          return (
            <div key={estado} className={`${config.color} rounded-lg p-4 border-2 transition-all duration-200 hover:shadow-md`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{config.icon}</span>
                  <span className={`font-medium ${config.textColor}`}>{config.titulo}</span>
                </div>
                <div className={`text-3xl font-bold ${config.textColor}`}>
                  {count}
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-600">
                {count === 0 ? 'Sin pedidos' : `${count} pedido${count > 1 ? 's' : ''}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResumenEstados;
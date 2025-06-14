import React from 'react';

const EstadoBadge = ({ estado }) => {
  const getEstadoStyle = (estado) => {
    const styles = {
      pendiente: 'bg-red-100 text-red-800 border-red-200',
      preparando: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      listo: 'bg-green-100 text-green-800 border-green-200'
    };
    return styles[estado];
  };

  const getEstadoTexto = (estado) => {
    const textos = {
      pendiente: 'Pendiente',
      preparando: 'Preparando',
      listo: 'Listo'
    };
    return textos[estado];
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getEstadoStyle(estado)}`}>
      {getEstadoTexto(estado)}
    </span>
  );
};

export default EstadoBadge;
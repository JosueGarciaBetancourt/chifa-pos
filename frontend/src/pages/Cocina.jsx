import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderCocina from '../components/features/cocina/HeaderCocina';
import ResumenEstados from '../components/features/cocina/ResumenEstados';
import KanbanBoard from '../components/features/cocina/KanbanBoard';

const Cocina = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([
    {
      id: '001',
      numero: '#001',
      cliente: 'Juan Pérez',
      telefono: '987654321',
      hora: '14:30',
      tiempoEspera: '5 min',
      items: ['Arroz Chaufa de Pollo', 'Wantán Frito', 'Sopa Wantán'],
      total: 45.00,
      estado: 'pendiente',
      tipo: 'delivery',
      fechaCreacion: new Date(Date.now() - 5 * 60 * 1000), // 5 minutos atrás
      fechaActualizacion: new Date()
    },
    {
      id: '002',
      numero: '#002',
      cliente: 'María García',
      telefono: '',
      hora: '14:25',
      tiempoEspera: '10 min',
      items: ['Tallarín Saltado de Carne', 'Pollo Chi Jau Kay'],
      total: 45.00,
      estado: 'preparando',
      tipo: 'delivery',
      fechaCreacion: new Date(Date.now() - 10 * 60 * 1000), // 10 minutos atrás
      fechaActualizacion: new Date()
    },
    {
      id: '003',
      numero: '#003',
      cliente: 'Mesa 5 - Carlos López',
      telefono: '',
      hora: '14:20',
      tiempoEspera: '15 min',
      items: ['Cerdo Agridulce', 'Arroz Chaufa Especial', 'Kam Lu Wantán'],
      total: 74.00,
      estado: 'listo',
      tipo: 'mesa',
      fechaCreacion: new Date(Date.now() - 15 * 60 * 1000), // 15 minutos atrás
      fechaActualizacion: new Date()
    },
    {
      id: '004',
      numero: '#004',
      cliente: 'Ana Ruiz',
      telefono: '912345678',
      hora: '14:35',
      tiempoEspera: '2 min',
      items: ['Arroz Chaufa Especial', 'Pollo Chi Jau Kay'],
      total: 47.00,
      estado: 'pendiente',
      tipo: 'delivery',
      fechaCreacion: new Date(Date.now() - 2 * 60 * 1000), // 2 minutos atrás
      fechaActualizacion: new Date()
    }
  ]);

  // Función para mover pedidos entre estados
  const moverPedido = (pedidoId, nuevoEstado) => {
    setPedidos(prev => 
      prev.map(pedido => {
        if (pedido.id === pedidoId) {
          // Actualizar timestamps según el estado
          const actualizaciones = {
            fechaActualizacion: new Date()
          };

          switch (nuevoEstado) {
            case 'preparando':
              actualizaciones.fechaPreparacion = new Date();
              break;
            case 'listo':
              actualizaciones.fechaListo = new Date();
              break;
            default:
              break;
          }

          // Mostrar notificación del cambio
          showNotification(`Pedido ${pedido.numero} movido a ${nuevoEstado}`);

          return { 
            ...pedido, 
            estado: nuevoEstado,
            ...actualizaciones
          };
        }
        return pedido;
      })
    );

    // Aquí podrías agregar la lógica para actualizar la base de datos
    // updatePedidoEstado(pedidoId, nuevoEstado);
  };

  // Función para mostrar notificaciones (deshabilitada)
  const showNotification = (mensaje) => {
    // Solo mostrar en consola para debug
    console.log('🍜 Cocina:', mensaje);

  };

  // Función para contar pedidos por estado
  const contarPorEstado = (estado) => {
    return pedidos.filter(p => p.estado === estado).length;
  };

  // Actualizar tiempo de espera cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setPedidos(prev => prev.map(pedido => ({
        ...pedido,
        tiempoEspera: calcularTiempoEspera(pedido.fechaCreacion)
      })));
    }, 60000); // Actualizar cada minuto

    return () => clearInterval(interval);
  }, []);


  // Función auxiliar para calcular tiempo de espera
  const calcularTiempoEspera = (fechaCreacion) => {
    const ahora = new Date();
    const diferencia = Math.floor((ahora - fechaCreacion) / (1000 * 60));
    return `${diferencia} min`;
  };

  // Función para volver al dashboard
  const handleBack = () => {
    navigate('/');
  };

    return (
    <div className="flex flex-col min-h-screen bg-gray-100">
        <HeaderCocina 
        totalPendientes={contarPorEstado('pendiente')} 
        onBack={handleBack}
        />
        <ResumenEstados pedidos={pedidos} />
        <div className="flex-1 overflow-y-auto">
        <KanbanBoard pedidos={pedidos} onMoverPedido={moverPedido} />
        </div>
    </div>
    );
};

export default Cocina;
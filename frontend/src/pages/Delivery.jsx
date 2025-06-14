// src/pages/Delivery.jsx
import React, { useState, useMemo } from 'react';
import DeliveryHeader from '../components/features/delivery/DeliveryHeader';
import DeliveryOrderCard from '../components/features/delivery/DeliveryOrderCard';
import DeliveryStatsCard from '../components/features/delivery/DeliveryStatsCard';
import DeliveryPersonCard from '../components/features/delivery/DeliveryPersonCard';

const Delivery = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      codigo: 'DELO01',
      cliente_id: 1,
      usuario_id: 1,
      tipo: 'delivery',
      estado: 'pendiente',
      fecha_hora: '2025-06-13T14:30:00',
      direccion_entrega: 'Av. Larco 1234, Miraflores',
      total: 33.00,
      observaciones: '',
      tiempo_estimado: 35,
      cliente: {
        id: 1,
        nombre: 'Juan',
        apellido: 'Pérez',
        telefono: '987654321',
        direccion: 'Av. Larco 1234, Miraflores'
      },
      detalles_pedido: [
        {
          id: 1,
          producto: { nombre: 'Arroz Chaufa de Pollo' },
          cantidad: 1,
          precio_unitario: 18.00,
          subtotal: 18.00
        },
        {
          id: 2,
          producto: { nombre: 'Wantán Frito' },
          cantidad: 1,
          precio_unitario: 15.00,
          subtotal: 15.00
        }
      ],
      repartidor_asignado: null
    },
    {
      id: 2,
      codigo: 'DELO02',
      cliente_id: 2,
      usuario_id: 1,
      tipo: 'delivery',
      estado: 'asignado',
      fecha_hora: '2025-06-13T14:25:00',
      direccion_entrega: 'Jr. Lima 567, San Isidro',
      total: 45.00,
      observaciones: '',
      tiempo_estimado: 25,
      cliente: {
        id: 2,
        nombre: 'María',
        apellido: 'García',
        telefono: '912345678',
        direccion: 'Jr. Lima 567, San Isidro'
      },
      detalles_pedido: [
        {
          id: 3,
          producto: { nombre: 'Tallarín Saltado' },
          cantidad: 1,
          precio_unitario: 20.00,
          subtotal: 20.00
        },
        {
          id: 4,
          producto: { nombre: 'Pollo Chi Jau Kay' },
          cantidad: 1,
          precio_unitario: 25.00,
          subtotal: 25.00
        }
      ],
      repartidor_asignado: {
        id: 2,
        nombre: 'Carlos',
        apellido: 'Mendoza'
      }
    }
  ]);

  const [deliveryPersons] = useState([
    {
      id: 1,
      nombre: 'Luis',
      apellido: 'Torres',
      telefono: '987654123',
      ubicacion: 'Surco',
      pedidos_hoy: 6,
      estado: 'ocupado'
    },
    {
      id: 2,
      nombre: 'Ana',
      apellido: 'Rodríguez',
      telefono: '987321654',
      ubicacion: 'Miraflores',
      pedidos_hoy: 5,
      estado: 'disponible'
    },
    {
      id: 3,
      nombre: 'Pedro',
      apellido: 'Vásquez',
      telefono: '987456789',
      ubicacion: 'Centro',
      pedidos_hoy: 7,
      estado: 'descanso'
    }
  ]);

  const [stats] = useState({
    total_entregas: 26,
    tiempo_promedio: '28 min',
    satisfaccion: '4.7/5',
    ingresos_delivery: 980.25
  });

  // Calcular datos dinámicos para el header
  const pendingOrdersCount = useMemo(() => {
    return orders.filter(order => 
      order.estado === 'pendiente' || order.estado === 'asignado' || order.estado === 'en_camino'
    ).length;
  }, [orders]);

  const activeDeliveryPersonsCount = useMemo(() => {
    return deliveryPersons.filter(person => 
      person.estado === 'disponible' || person.estado === 'ocupado'
    ).length;
  }, [deliveryPersons]);

  const handleAssignDeliveryPerson = (orderId, deliveryPersonId) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              estado: 'asignado',
              repartidor_asignado: deliveryPersons.find(dp => dp.id === deliveryPersonId)
            }
          : order
      )
    );
  };

  const handleMarkOnWay = (orderId) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, estado: 'en_camino' }
          : order
      )
    );
  };

  const handleMarkDelivered = (orderId) => {
    setOrders(prevOrders => 
      prevOrders.filter(order => order.id !== orderId)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DeliveryHeader 
        pendingOrdersCount={pendingOrdersCount}
        activeDeliveryPersonsCount={activeDeliveryPersonsCount}
      />

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <h2 className="text-lg font-semibold mb-4">Pedidos de Delivery</h2>
          
          <div className="space-y-4">
            {orders.map(order => (
              <DeliveryOrderCard
                key={order.id}
                order={order}
                deliveryPersons={deliveryPersons}
                onAssignDeliveryPerson={handleAssignDeliveryPerson}
                onMarkOnWay={handleMarkOnWay}
                onMarkDelivered={handleMarkDelivered}
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 p-6">
          {/* Delivery Persons */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Repartidores</h3>
            <div className="space-y-3">
              {deliveryPersons.map(person => (
                <DeliveryPersonCard key={person.id} person={person} />
              ))}
            </div>
          </div>

          {/* Stats */}
          <DeliveryStatsCard stats={stats} />
        </div>
      </div>
    </div>
  );
};

export default Delivery;
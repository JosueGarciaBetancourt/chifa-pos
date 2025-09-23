import api from '../axiosInstance';

const reservasApi = {
  // Obtener todas las reservas
  getReservas: async () => {
    try {
      const response = await api.get('/api/reservas');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo reservas:', error);
      throw error;
    }
  },

  // Crear una reserva
  createReserva: async (reserva) => {
    try {
      const response = await api.post('/api/reservas', reserva);
      return response.data;
    } catch (error) {
      console.error('Error creando reserva:', error);
      throw error;
    }
  },

  // Obtener reservas activas
  getReservasActivas: async () => {
    try {
      const response = await api.get('/api/reservas/activas');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo reservas activas:', error);
      throw error;
    }
  },

  // Obtener reservas de un cliente por ID
  getReservasByCliente: async (clienteId) => {
    try {
      const response = await api.get(`/api/reservas/cliente/${clienteId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo reservas del cliente con id ${clienteId}:`, error);
      throw error;
    }
  },

  // Obtener una reserva por ID
  getReservaById: async (id) => {
    try {
      const response = await api.get(`/api/reservas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo reserva con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar una reserva
  deleteReserva: async (id) => {
    try {
      const response = await api.delete(`/api/reservas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando reserva con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar estado de una reserva
  updateEstadoDeReserva: async (id, nuevoEstado) => {
    try {
      const response = await api.patch(`/api/reservas/${id}/estado`, { estado: nuevoEstado });
      return response.data;
    } catch (error) {
      console.error(`Error actualizando estado de la reserva con id ${id}:`, error);
      throw error;
    }
  },
};

export default reservasApi;

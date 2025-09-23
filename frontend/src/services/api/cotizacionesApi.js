// frontend/api/cotizacionesApi.js
import api from '../axiosInstance';

const cotizacionesApi = {
  // Obtener todas las cotizaciones
  getCotizaciones: async () => {
    try {
      const response = await api.get('/api/cotizaciones');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo cotizaciones:', error);
      throw error;
    }
  },

  // Crear cotización
  createCotizacion: async (cotizacion) => {
    try {
      const response = await api.post('/api/cotizaciones', cotizacion);
      return response.data;
    } catch (error) {
      console.error('Error creando cotización:', error);
      throw error;
    }
  },

  // Obtener cotizaciones por cliente
  getCotizacionesByCliente: async (clienteId) => {
    try {
      const response = await api.get(`/api/cotizaciones/cliente/${clienteId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo cotizaciones del cliente con id ${clienteId}:`, error);
      throw error;
    }
  },

  // Obtener cotizaciones por usuario
  getCotizacionesByUsuario: async (usuarioId) => {
    try {
      const response = await api.get(`/api/cotizaciones/usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo cotizaciones del usuario con id ${usuarioId}:`, error);
      throw error;
    }
  },

  // Obtener detalles de cotización por id
  getDetallesCotizacionById: async (id) => {
    try {
      const response = await api.get(`/api/cotizaciones/detalle/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo detalles de la cotización con id ${id}:`, error);
      throw error;
    }
  },

  // Obtener cotización por id
  getCotizacionById: async (id) => {
    try {
      const response = await api.get(`/api/cotizaciones/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo cotización con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar cotización
  updateCotizacion: async (id, cotizacion) => {
    try {
      const response = await api.put(`/api/cotizaciones/${id}`, cotizacion);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando cotización con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar cotización
  deleteCotizacion: async (id) => {
    try {
      const response = await api.delete(`/api/cotizaciones/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando cotización con id ${id}:`, error);
      throw error;
    }
  }
};

export default cotizacionesApi;

// frontend/api/estadosMesasApi.js
import api from '../axiosInstance';

const estadosMesasApi = {
  // Obtener todos los estados de mesas
  getEstadosMesas: async () => {
    try {
      const response = await api.get('/api/estadosMesas');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo estados de mesas:', error);
      throw error;
    }
  },

  // Crear un estado de mesa
  createEstadoMesa: async (estadoMesa) => {
    try {
      const response = await api.post('/api/estadosMesas', estadoMesa);
      return response.data;
    } catch (error) {
      console.error('Error creando estado de mesa:', error);
      throw error;
    }
  },

  // Buscar estado de mesa por nombre
  searchEstadoMesaByName: async (name) => {
    try {
      const response = await api.get('/api/estadosMesas/searchEstadoMesaByName', {
        params: { name },
      });
      return response.data;
    } catch (error) {
      console.error(`Error buscando estado de mesa con nombre ${name}:`, error);
      throw error;
    }
  },

  // Obtener estado de mesa por id
  getEstadoMesaById: async (id) => {
    try {
      const response = await api.get(`/api/estadosMesas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo estado de mesa con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar estado de mesa
  updateEstadoMesa: async (id, estadoMesa) => {
    try {
      const response = await api.put(`/api/estadosMesas/${id}`, estadoMesa);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando estado de mesa con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar estado de mesa
  deleteEstadoMesa: async (id) => {
    try {
      const response = await api.delete(`/api/estadosMesas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando estado de mesa con id ${id}:`, error);
      throw error;
    }
  },
};

export default estadosMesasApi;

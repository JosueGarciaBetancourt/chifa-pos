// frontend/api/mesasApi.js
import api from '../axiosInstance';

const mesasApi = {
  // Obtener todas las mesas
  getMesas: async () => {
    try {
      const response = await api.get('/api/mesas');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo mesas:', error);
      throw error;
    }
  },

  // Crear mesa
  createMesa: async (mesa) => {
    try {
      const response = await api.post('/api/mesas', mesa);
      return response.data;
    } catch (error) {
      console.error('Error creando mesa:', error);
      throw error;
    }
  },

  // Obtener mesas por sede
  getMesasBySede: async (sedeId) => {
    try {
      const response = await api.get(`/api/mesas/sede/${sedeId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo mesas de la sede con id ${sedeId}:`, error);
      throw error;
    }
  },

  // Obtener mesa por número
  getMesaByNumero: async (numero) => {
    try {
      const response = await api.get(`/api/mesas/numero/${numero}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo mesa con número ${numero}:`, error);
      throw error;
    }
  },

  // Obtener mesas por estado
  getMesasByEstado: async (estadoId) => {
    try {
      const response = await api.get(`/api/mesas/estado/${estadoId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo mesas con estado ${estadoId}:`, error);
      throw error;
    }
  },

  // Obtener mesa por id
  getMesaById: async (id) => {
    try {
      const response = await api.get(`/api/mesas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo mesa con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar mesa
  updateMesa: async (id, mesa) => {
    try {
      const response = await api.put(`/api/mesas/${id}`, mesa);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando mesa con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar mesa
  deleteMesa: async (id) => {
    try {
      const response = await api.delete(`/api/mesas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando mesa con id ${id}:`, error);
      throw error;
    }
  },
};

export default mesasApi;

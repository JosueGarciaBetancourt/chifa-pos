// frontend/api/inventarioMovimientosApi.js
import api from '../axiosInstance';

const inventarioMovimientosApi = {
  // Obtener todos los movimientos de inventario
  getInventarioMovimientos: async () => {
    try {
      const response = await api.get('/api/inventarioMovimientos');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo movimientos de inventario:', error);
      throw error;
    }
  },

  // Crear un movimiento de inventario
  createInventarioMovimiento: async (movimiento) => {
    try {
      const response = await api.post('/api/inventarioMovimientos', movimiento);
      return response.data;
    } catch (error) {
      console.error('Error creando movimiento de inventario:', error);
      throw error;
    }
  },

  // Obtener movimientos por insumo
  getInventarioMovimientoByInsumo: async (insumoId) => {
    try {
      const response = await api.get(`/api/inventarioMovimientos/insumo/${insumoId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo movimientos de inventario para insumo con id ${insumoId}:`, error);
      throw error;
    }
  },

  // Obtener movimientos por usuario
  getInventarioMovimientoByUsuario: async (usuarioId) => {
    try {
      const response = await api.get(`/api/inventarioMovimientos/usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo movimientos de inventario para usuario con id ${usuarioId}:`, error);
      throw error;
    }
  },

  // Obtener un movimiento por ID
  getInventarioMovimientoById: async (id) => {
    try {
      const response = await api.get(`/api/inventarioMovimientos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo movimiento de inventario con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar un movimiento de inventario
  deleteInventarioMovimiento: async (id) => {
    try {
      const response = await api.delete(`/api/inventarioMovimientos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando movimiento de inventario con id ${id}:`, error);
      throw error;
    }
  },
};

export default inventarioMovimientosApi;

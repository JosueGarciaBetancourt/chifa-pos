import api from '../axiosInstance';

const insumosApi = {
  // Obtener todos los insumos
  getInsumos: async () => {
    try {
      const response = await api.get('/api/insumos');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo insumos:', error);
      throw error;
    }
  },

  // Crear un insumo
  createInsumo: async (insumo) => {
    try {
      const response = await api.post('/api/insumos', insumo);
      return response.data;
    } catch (error) {
      console.error('Error creando insumo:', error);
      throw error;
    }
  },

  // Obtener insumos activos
  getInsumosActive: async () => {
    try {
      const response = await api.get('/api/insumos/active');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo insumos activos:', error);
      throw error;
    }
  },

  // Obtener insumos inactivos
  getInsumosInactive: async () => {
    try {
      const response = await api.get('/api/insumos/inactive');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo insumos inactivos:', error);
      throw error;
    }
  },

  // Obtener un insumo por ID
  getInsumoById: async (id) => {
    try {
      const response = await api.get(`/api/insumos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo insumo con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar un insumo
  updateInsumo: async (id, insumo) => {
    try {
      const response = await api.put(`/api/insumos/${id}`, insumo);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando insumo con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar un insumo
  deleteInsumo: async (id) => {
    try {
      const response = await api.delete(`/api/insumos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando insumo con id ${id}:`, error);
      throw error;
    }
  },

  // Deshabilitar un insumo
  disableInsumo: async (id) => {
    try {
      const response = await api.delete(`/api/insumos/${id}/disable`);
      return response.data;
    } catch (error) {
      console.error(`Error deshabilitando insumo con id ${id}:`, error);
      throw error;
    }
  },

  // Habilitar un insumo
  enableInsumo: async (id) => {
    try {
      const response = await api.patch(`/api/insumos/${id}/enable`);
      return response.data;
    } catch (error) {
      console.error(`Error habilitando insumo con id ${id}:`, error);
      throw error;
    }
  },
};

export default insumosApi;

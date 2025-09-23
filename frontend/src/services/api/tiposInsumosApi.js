import api from '../axiosInstance';

const tiposInsumosApi = {
  // Obtener todos los tipos de insumos
  getTiposInsumos: async () => {
    try {
      const response = await api.get('/api/tiposInsumos');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo tipos de insumos:', error);
      throw error;
    }
  },

  // Obtener tipos de insumos activos
  getTiposInsumosActive: async () => {
    try {
      const response = await api.get('/api/tiposInsumos/active');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo tipos de insumos activos:', error);
      throw error;
    }
  },

  // Obtener tipos de insumos inactivos
  getTiposInsumosInactive: async () => {
    try {
      const response = await api.get('/api/tiposInsumos/inactive');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo tipos de insumos inactivos:', error);
      throw error;
    }
  },

  // Obtener un tipo de insumo por id
  getTipoInsumoById: async (id) => {
    try {
      const response = await api.get(`/api/tiposInsumos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo tipo de insumo con id ${id}:`, error);
      throw error;
    }
  },

  // Crear un nuevo tipo de insumo
  createTipoInsumo: async (tipoInsumo) => {
    try {
      const response = await api.post('/api/tiposInsumos', tipoInsumo);
      return response.data;
    } catch (error) {
      console.error('Error creando tipo de insumo:', error);
      throw error;
    }
  },

  // Actualizar tipo de insumo
  updateTipoInsumo: async (id, tipoInsumo) => {
    try {
      const response = await api.put(`/api/tiposInsumos/${id}`, tipoInsumo);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando tipo de insumo con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar tipo de insumo
  deleteTipoInsumo: async (id) => {
    try {
      const response = await api.delete(`/api/tiposInsumos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando tipo de insumo con id ${id}:`, error);
      throw error;
    }
  },

  // Deshabilitar tipo de insumo
  disableTipoInsumo: async (id) => {
    try {
      const response = await api.delete(`/api/tiposInsumos/${id}/disable`);
      return response.data;
    } catch (error) {
      console.error(`Error deshabilitando tipo de insumo con id ${id}:`, error);
      throw error;
    }
  },

  // Habilitar tipo de insumo
  enableTipoInsumo: async (id) => {
    try {
      const response = await api.patch(`/api/tiposInsumos/${id}/enable`);
      return response.data;
    } catch (error) {
      console.error(`Error habilitando tipo de insumo con id ${id}:`, error);
      throw error;
    }
  }
};

export default tiposInsumosApi;

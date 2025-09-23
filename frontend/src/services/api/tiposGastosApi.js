import api from '../axiosInstance';

const tiposGastosApi = {
  // Obtener todos los tipos de gasto
  getTiposGastos: async () => {
    try {
      const response = await api.get('/api/tipos-gastos');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo tipos de gasto:', error);
      throw error;
    }
  },

  // Crear un tipo de gasto
  createTipoGasto: async (tipoGasto) => {
    try {
      const response = await api.post('/api/tipos-gastos', tipoGasto);
      return response.data;
    } catch (error) {
      console.error('Error creando tipo de gasto:', error);
      throw error;
    }
  },

  // Obtener tipos de gasto activos
  getTiposGastosActive: async () => {
    try {
      const response = await api.get('/api/tipos-gastos/active');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo tipos de gasto activos:', error);
      throw error;
    }
  },

  // Obtener tipos de gasto inactivos
  getTiposGastosInactive: async () => {
    try {
      const response = await api.get('/api/tipos-gastos/inactive');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo tipos de gasto inactivos:', error);
      throw error;
    }
  },

  // Obtener un tipo de gasto por ID
  getTipoGastoById: async (id) => {
    try {
      const response = await api.get(`/api/tipos-gastos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo tipo de gasto con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar un tipo de gasto
  updateTipoGasto: async (id, tipoGasto) => {
    try {
      const response = await api.put(`/api/tipos-gastos/${id}`, tipoGasto);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando tipo de gasto con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar un tipo de gasto
  deleteTipoGasto: async (id) => {
    try {
      const response = await api.delete(`/api/tipos-gastos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando tipo de gasto con id ${id}:`, error);
      throw error;
    }
  },

  // Deshabilitar un tipo de gasto
  disableTipoGasto: async (id) => {
    try {
      const response = await api.delete(`/api/tipos-gastos/${id}/disable`);
      return response.data;
    } catch (error) {
      console.error(`Error deshabilitando tipo de gasto con id ${id}:`, error);
      throw error;
    }
  },

  // Habilitar un tipo de gasto
  enableTipoGasto: async (id) => {
    try {
      const response = await api.patch(`/api/tipos-gastos/${id}/enable`);
      return response.data;
    } catch (error) {
      console.error(`Error habilitando tipo de gasto con id ${id}:`, error);
      throw error;
    }
  },
};

export default tiposGastosApi;

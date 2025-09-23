import api from '../axiosInstance';

const cajasApi = {
  // Obtener todas las cajas
  getCajas: async () => {
    try {
      const response = await api.get('/api/cajas');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo cajas:', error);
      throw error;
    }
  },

  // Crear una caja
  createCaja: async (caja) => {
    try {
      const response = await api.post('/api/cajas', caja);
      return response.data;
    } catch (error) {
      console.error('Error creando caja:', error);
      throw error;
    }
  },

  // Obtener cajas activas
  getCajasActive: async () => {
    try {
      const response = await api.get('/api/cajas/active');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo cajas activas:', error);
      throw error;
    }
  },

  // Obtener cajas inactivas
  getCajasInactive: async () => {
    try {
      const response = await api.get('/api/cajas/inactive');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo cajas inactivas:', error);
      throw error;
    }
  },

  // Obtener una caja por ID
  getCajaById: async (id) => {
    try {
      const response = await api.get(`/api/cajas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo caja con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar una caja
  updateCaja: async (id, caja) => {
    try {
      const response = await api.put(`/api/cajas/${id}`, caja);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando caja con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar una caja
  deleteCaja: async (id) => {
    try {
      const response = await api.delete(`/api/cajas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando caja con id ${id}:`, error);
      throw error;
    }
  },

  // Deshabilitar una caja
  disableCaja: async (id) => {
    try {
      const response = await api.delete(`/api/cajas/${id}/disable`);
      return response.data;
    } catch (error) {
      console.error(`Error deshabilitando caja con id ${id}:`, error);
      throw error;
    }
  },

  // Habilitar una caja
  enableCaja: async (id) => {
    try {
      const response = await api.patch(`/api/cajas/${id}/enable`);
      return response.data;
    } catch (error) {
      console.error(`Error habilitando caja con id ${id}:`, error);
      throw error;
    }
  },
};

export default cajasApi;

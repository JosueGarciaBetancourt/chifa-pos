import api from '../axiosInstance';

const sedeLocalApi = {
  getSedeLocalAll: async () => {
    try {
      const { data } = await api.get('/api/sede-local');
      return data;
    } catch (error) {
      console.error('Error obteniendo todas las sedes locales:', error);
      throw error;
    }
  },

  getSedeLocalActive: async () => {
    try {
      const { data } = await api.get('/api/sede-local/active');
      return data;
    } catch (error) {
      console.error('Error obteniendo sedes locales activas:', error);
      throw error;
    }
  },

  getSedeLocalInactive: async () => {
    try {
      const { data } = await api.get('/api/sede-local/inactive');
      return data;
    } catch (error) {
      console.error('Error obteniendo sedes locales inactivas:', error);
      throw error;
    }
  },

  updateSedeLocal: async (id, payload) => {
    try {
      const { data } = await api.put(`/api/sede-local/${id}`, payload);
      return data;
    } catch (error) {
      console.error(`Error actualizando sede local con id ${id}:`, error);
      throw error;
    }
  },

  disableSedeLocal: async (id) => {
    try {
      const { data } = await api.delete(`/api/sede-local/${id}/disable`);
      return data;
    } catch (error) {
      console.error(`Error deshabilitando sede local con id ${id}:`, error);
      throw error;
    }
  },

  enableSedeLocal: async (id) => {
    try {
      const { data } = await api.patch(`/api/sede-local/${id}/enable`);
      return data;
    } catch (error) {
      console.error(`Error habilitando sede local con id ${id}:`, error);
      throw error;
    }
  }
};

export default sedeLocalApi;

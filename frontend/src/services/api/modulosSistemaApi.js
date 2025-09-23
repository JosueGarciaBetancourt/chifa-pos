import api from '../axiosInstance';

const modulosSistemaApi = {
  getModulosSistema: async () => {
    try {
      const { data } = await api.get('/api/modulos-sistema');
      return data;
    } catch (error) {
      console.error('Error obteniendo todos los módulos del sistema:', error);
      throw error;
    }
  },

  getModulosSistemaActive: async () => {
    try {
      const { data } = await api.get('/api/modulos-sistema/active');
      return data;
    } catch (error) {
      console.error('Error obteniendo módulos activos del sistema:', error);
      throw error;
    }
  },

  getModulosSistemaInactive: async () => {
    try {
      const { data } = await api.get('/api/modulos-sistema/inactive');
      return data;
    } catch (error) {
      console.error('Error obteniendo módulos inactivos del sistema:', error);
      throw error;
    }
  },

  getModuloSistemaById: async (id) => {
    try {
      const { data } = await api.get(`/api/modulos-sistema/${id}`);
      return data;
    } catch (error) {
      console.error(`Error obteniendo módulo del sistema con id ${id}:`, error);
      throw error;
    }
  },

  disableModuloSistema: async (id) => {
    try {
      const { data } = await api.delete(`/api/modulos-sistema/${id}/disable`);
      return data;
    } catch (error) {
      console.error(`Error deshabilitando módulo del sistema con id ${id}:`, error);
      throw error;
    }
  },

  enableModuloSistema: async (id) => {
    try {
      const { data } = await api.patch(`/api/modulos-sistema/${id}/enable`);
      return data;
    } catch (error) {
      console.error(`Error habilitando módulo del sistema con id ${id}:`, error);
      throw error;
    }
  }
};

export default modulosSistemaApi;

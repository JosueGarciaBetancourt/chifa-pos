import api from '../axiosInstance';

const empresaLocalApi = {
  getEmpresaLocalAll: async () => {
    try {
      const { data } = await api.get('/api/empresa-local');
      return data;
    } catch (error) {
      console.error('Error obteniendo todas las empresas locales:', error);
      throw error;
    }
  },

  getEmpresaLocalActive: async () => {
    try {
      const { data } = await api.get('/api/empresa-local/active');
      return data;
    } catch (error) {
      console.error('Error obteniendo empresas locales activas:', error);
      throw error;
    }
  },

  getEmpresaLocalInactive: async () => {
    try {
      const { data } = await api.get('/api/empresa-local/inactive');
      return data;
    } catch (error) {
      console.error('Error obteniendo empresas locales inactivas:', error);
      throw error;
    }
  },

  getEmpresaLocalPrincipal: async () => {
    try {
      const { data } = await api.get('/api/empresa-local/principal');
      return data;
    } catch (error) {
      console.error('Error obteniendo la empresa local principal:', error);
      throw error;
    }
  },

  updateEmpresaLocal: async (id, payload) => {
    try {
      const { data } = await api.patch(`/api/empresa-local/${id}`, payload);
      return data;
    } catch (error) {
      console.error(`Error actualizando empresa local con id ${id}:`, error);
      throw error;
    }
  },

  disableEmpresaLocal: async (id) => {
    try {
      const { data } = await api.delete(`/api/empresa-local/${id}/disable`);
      return data;
    } catch (error) {
      console.error(`Error deshabilitando empresa local con id ${id}:`, error);
      throw error;
    }
  },

  enableEmpresaLocal: async (id) => {
    try {
      const { data } = await api.patch(`/api/empresa-local/${id}/enable`);
      return data;
    } catch (error) {
      console.error(`Error habilitando empresa local con id ${id}:`, error);
      throw error;
    }
  }
};

export default empresaLocalApi;

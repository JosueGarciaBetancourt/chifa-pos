import api from '../axiosInstance';

const rolesApi = {
  getRoles: async () => {
    try {
      const { data } = await api.get('/api/roles');
      return data;
    } catch (error) {
      console.error('Error obteniendo todos los roles:', error);
      throw error;
    }
  },

  createRol: async (payload) => {
    try {
      const { data } = await api.post('/api/roles', payload);
      return data;
    } catch (error) {
      console.error('Error creando rol:', error);
      throw error;
    }
  },

  getRolesActive: async () => {
    try {
      const { data } = await api.get('/api/roles/active');
      return data;
    } catch (error) {
      console.error('Error obteniendo roles activos:', error);
      throw error;
    }
  },

  getRolesInactive: async () => {
    try {
      const { data } = await api.get('/api/roles/inactive');
      return data;
    } catch (error) {
      console.error('Error obteniendo roles inactivos:', error);
      throw error;
    }
  },

  getRolById: async (id) => {
    try {
      const { data } = await api.get(`/api/roles/${id}`);
      return data;
    } catch (error) {
      console.error(`Error obteniendo rol con id ${id}:`, error);
      throw error;
    }
  },

  updateRol: async (id, payload) => {
    try {
      const { data } = await api.put(`/api/roles/${id}`, payload);
      return data;
    } catch (error) {
      console.error(`Error actualizando rol con id ${id}:`, error);
      throw error;
    }
  },

  deleteRol: async (id) => {
    try {
      const { data } = await api.delete(`/api/roles/${id}`);
      return data;
    } catch (error) {
      console.error(`Error eliminando rol con id ${id}:`, error);
      throw error;
    }
  },

  disableRol: async (id) => {
    try {
      const { data } = await api.delete(`/api/roles/${id}/disable`);
      return data;
    } catch (error) {
      console.error(`Error deshabilitando rol con id ${id}:`, error);
      throw error;
    }
  },

  enableRol: async (id) => {
    try {
      const { data } = await api.patch(`/api/roles/${id}/enable`);
      return data;
    } catch (error) {
      console.error(`Error habilitando rol con id ${id}:`, error);
      throw error;
    }
  }
};

export default rolesApi;

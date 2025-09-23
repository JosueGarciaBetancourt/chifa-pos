import api from '../axiosInstance';

const permisosApi = {
  getPermisos: async () => {
    try {
      const { data } = await api.get('/api/permisos');
      return data;
    } catch (error) {
      console.error('Error obteniendo todos los permisos:', error);
      throw error;
    }
  },

  createPermiso: async (payload) => {
    try {
      const { data } = await api.post('/api/permisos', payload);
      return data;
    } catch (error) {
      console.error('Error creando permiso:', error);
      throw error;
    }
  },

  getPermisoById: async (id) => {
    try {
      const { data } = await api.get(`/api/permisos/${id}`);
      return data;
    } catch (error) {
      console.error(`Error obteniendo permiso con id ${id}:`, error);
      throw error;
    }
  },

  updatePermiso: async (id, payload) => {
    try {
      const { data } = await api.put(`/api/permisos/${id}`, payload);
      return data;
    } catch (error) {
      console.error(`Error actualizando permiso con id ${id}:`, error);
      throw error;
    }
  },

  deletePermiso: async (id) => {
    try {
      const { data } = await api.delete(`/api/permisos/${id}`);
      return data;
    } catch (error) {
      console.error(`Error eliminando permiso con id ${id}:`, error);
      throw error;
    }
  }
};

export default permisosApi;

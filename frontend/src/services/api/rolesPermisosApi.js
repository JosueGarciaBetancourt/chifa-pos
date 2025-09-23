import api from '../axiosInstance';

const rolesPermisosApi = {
  getPermisosByRolId: async (rolId) => {
    try {
      const { data } = await api.get(`/api/roles-permisos/${rolId}/permisos`);
      return data;
    } catch (error) {
      console.error(`Error obteniendo permisos del rol con id ${rolId}:`, error);
      throw error;
    }
  },

  asignarPermisosARol: async (rolId, payload) => {
    try {
      const { data } = await api.post(`/api/roles-permisos/${rolId}/asign-permisos`, payload);
      return data;
    } catch (error) {
      console.error(`Error asignando permisos al rol con id ${rolId}:`, error);
      throw error;
    }
  },

  updatePermisosARol: async (rolId, payload) => {
    try {
      const { data } = await api.put(`/api/roles-permisos/${rolId}/update-permisos`, payload);
      return data;
    } catch (error) {
      console.error(`Error actualizando permisos del rol con id ${rolId}:`, error);
      throw error;
    }
  },

  quitarPermisosARol: async (rolId, payload) => {
    try {
      const { data } = await api.post(`/api/roles-permisos/${rolId}/delete-permisos`, payload);
      return data;
    } catch (error) {
      console.error(`Error quitando permisos del rol con id ${rolId}:`, error);
      throw error;
    }
  }
};

export default rolesPermisosApi;

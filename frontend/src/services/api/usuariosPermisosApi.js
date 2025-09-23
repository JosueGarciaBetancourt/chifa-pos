// frontend/api/usuariosPermisosApi.js
import api from '../axiosInstance';

const usuariosPermisosApi = {
  getUsuariosPermisos: async () => {
    try {
      const { data } = await api.get('/api/usuariosPermisos');
      return data;
    } catch (error) {
      console.error('Error obteniendo todos los usuarios_permisos:', error);
      throw error;
    }
  },

  createUsuarioPermiso: async (payload) => {
    try {
      const { data } = await api.post('/api/usuariosPermisos', payload);
      return data;
    } catch (error) {
      console.error('Error creando usuario_permiso:', error);
      throw error;
    }
  },

  getUsuariosPermisosByUsuario: async (usuarioId) => {
    try {
      const { data } = await api.get(`/api/usuariosPermisos/usuario/${usuarioId}`);
      return data;
    } catch (error) {
      console.error(`Error obteniendo permisos del usuario con id ${usuarioId}:`, error);
      throw error;
    }
  },

  getUsuarioPermisoById: async (id) => {
    try {
      const { data } = await api.get(`/api/usuariosPermisos/${id}`);
      return data;
    } catch (error) {
      console.error(`Error obteniendo usuario_permiso con id ${id}:`, error);
      throw error;
    }
  },

  updateUsuarioPermiso: async (id, payload) => {
    try {
      const { data } = await api.put(`/api/usuariosPermisos/${id}`, payload);
      return data;
    } catch (error) {
      console.error(`Error actualizando usuario_permiso con id ${id}:`, error);
      throw error;
    }
  },

  deleteUsuarioPermiso: async (id) => {
    try {
      const { data } = await api.delete(`/api/usuariosPermisos/${id}`);
      return data;
    } catch (error) {
      console.error(`Error eliminando usuario_permiso con id ${id}:`, error);
      throw error;
    }
  }
};

export default usuariosPermisosApi;

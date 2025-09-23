import api from '../axiosInstance';

const usuariosApi = {
  getUsuarios: async () => {
    try {
      const { data } = await api.get('/api/usuarios');
      return data;
    } catch (error) {
      console.error('Error obteniendo todos los usuarios:', error);
      throw error;
    }
  },

  createUsuario: async (payload) => {
    try {
      const { data } = await api.post('/api/usuarios', payload);
      return data;
    } catch (error) {
      console.error('Error creando usuario:', error);
      throw error;
    }
  },

  getUsuariosActive: async () => {
    try {
      const { data } = await api.get('/api/usuarios/active');
      return data;
    } catch (error) {
      console.error('Error obteniendo usuarios activos:', error);
      throw error;
    }
  },

  getUsuariosInactive: async () => {
    try {
      const { data } = await api.get('/api/usuarios/inactive');
      return data;
    } catch (error) {
      console.error('Error obteniendo usuarios inactivos:', error);
      throw error;
    }
  },

  getUsuarioByDni: async (dni) => {
    try {
      const { data } = await api.get(`/api/usuarios/dni/${dni}`);
      return data;
    } catch (error) {
      console.error(`Error obteniendo usuario con DNI ${dni}:`, error);
      throw error;
    }
  },

  searchUsuariosByUsername: async (username) => {
    try {
      const { data } = await api.get('/api/usuarios/searchUsuariosByUsername', {
        params: { username }
      });
      return data;
    } catch (error) {
      console.error(`Error buscando usuarios por username ${username}:`, error);
      throw error;
    }
  },

  getUsuarioById: async (id) => {
    try {
      const { data } = await api.get(`/api/usuarios/${id}`);
      return data;
    } catch (error) {
      console.error(`Error obteniendo usuario con id ${id}:`, error);
      throw error;
    }
  },

  updateUsuario: async (id, payload) => {
    try {
      const { data } = await api.put(`/api/usuarios/${id}`, payload);
      return data;
    } catch (error) {
      console.error(`Error actualizando usuario con id ${id}:`, error);
      throw error;
    }
  },

  deleteUsuario: async (id) => {
    try {
      const { data } = await api.delete(`/api/usuarios/${id}`);
      return data;
    } catch (error) {
      console.error(`Error eliminando usuario con id ${id}:`, error);
      throw error;
    }
  },

  disableUsuario: async (id) => {
    try {
      const { data } = await api.delete(`/api/usuarios/${id}/disable`);
      return data;
    } catch (error) {
      console.error(`Error deshabilitando usuario con id ${id}:`, error);
      throw error;
    }
  },

  enableUsuario: async (id) => {
    try {
      const { data } = await api.patch(`/api/usuarios/${id}/enable`);
      return data;
    } catch (error) {
      console.error(`Error habilitando usuario con id ${id}:`, error);
      throw error;
    }
  }
};

export default usuariosApi;

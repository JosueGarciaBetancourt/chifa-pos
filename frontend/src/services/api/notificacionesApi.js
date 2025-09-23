import api from '../axiosInstance';

const notificacionesApi = {
  getNotificaciones: async () => {
    try {
      const response = await api.get('/api/notificaciones');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo notificaciones:', error);
      throw error;
    }
  },

  createNotificacion: async (notificacion) => {
    try {
      const response = await api.post('/api/notificaciones', notificacion);
      return response.data;
    } catch (error) {
      console.error('Error creando notificación:', error);
      throw error;
    }
  },

  getNotificacionesByUsuario: async (usuarioId) => {
    try {
      const response = await api.get(`/api/notificaciones/usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo notificaciones del usuario ${usuarioId}:`, error);
      throw error;
    }
  },

  marcarLeida: async (id) => {
    try {
      const response = await api.patch(`/api/notificaciones/${id}/leer`);
      return response.data;
    } catch (error) {
      console.error(`Error marcando notificación ${id} como leída:`, error);
      throw error;
    }
  },

  marcarTodasLeidas: async (usuarioId) => {
    try {
      const response = await api.patch(`/api/notificaciones/usuario/${usuarioId}/leer-todas`);
      return response.data;
    } catch (error) {
      console.error(`Error marcando todas las notificaciones del usuario ${usuarioId} como leídas:`, error);
      throw error;
    }
  },

  getNotificacionById: async (id) => {
    try {
      const response = await api.get(`/api/notificaciones/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo notificación con id ${id}:`, error);
      throw error;
    }
  },

  disableNotificacion: async (id) => {
    try {
      const response = await api.delete(`/api/notificaciones/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deshabilitando notificación con id ${id}:`, error);
      throw error;
    }
  },
};

export default notificacionesApi;

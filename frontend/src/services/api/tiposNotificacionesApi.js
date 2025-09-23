import api from '../axiosInstance';

const tiposNotificacionesApi = {
  // Obtener todos los tipos de notificación
  getTiposNotificaciones: async () => {
    try {
      const response = await api.get('/api/tipos-notificaciones');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo tipos de notificaciones:', error);
      throw error;
    }
  },

  // Obtener un tipo de notificación por ID
  getTipoNotificacionById: async (id) => {
    try {
      const response = await api.get(`/api/tipos-notificaciones/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo tipo de notificación con id ${id}:`, error);
      throw error;
    }
  },
};

export default tiposNotificacionesApi;

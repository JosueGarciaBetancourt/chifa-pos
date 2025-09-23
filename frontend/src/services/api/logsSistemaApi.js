import api from '../axiosInstance';

const logsSistemaApi = {
  getLogsSistema: async () => {
    try {
      const response = await api.get('/api/logs-sistema');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo logs del sistema:', error);
      throw error;
    }
  },

  createLog: async (log) => {
    try {
      const response = await api.post('/api/logs-sistema', log);
      return response.data;
    } catch (error) {
      console.error('Error creando log del sistema:', error);
      throw error;
    }
  },

  getLogsByUsuario: async (usuarioId) => {
    try {
      const response = await api.get(`/api/logs-sistema/usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo logs del usuario ${usuarioId}:`, error);
      throw error;
    }
  },

  deleteLog: async (id) => {
    try {
      const response = await api.delete(`/api/logs-sistema/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando log con id ${id}:`, error);
      throw error;
    }
  },
};

export default logsSistemaApi;
